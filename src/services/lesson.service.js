import { z } from 'zod';

const delay = (ms = 300) =>
  new Promise(resolve => setTimeout(resolve, ms));

const wordSchema = z
  .object({
    id: z.string().min(1),
    hanzi: z.string().min(1),
    pinyin: z.string().default(''),
    sinoVietnamese: z.string().default(''),
    vietnamese: z.string().min(1)
  })
  .passthrough();

const grammarSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    htmlContent: z.string().default('')
  })
  .passthrough();

/**
 * Hỗ trợ cả hai cấu trúc:
 *
 * Cấu trúc cũ:
 * {
 *   id: "l1",
 *   name: "Bài 1: Xin chào",
 *   words: [],
 *   grammars: []
 * }
 *
 * Cấu trúc mới:
 * {
 *   id: "l1",
 *   title: "Bài 1: Xin chào",
 *   order: 1,
 *   course: {
 *     id: "c1",
 *     name: "HSK 1"
 *   },
 *   words: [],
 *   grammars: []
 * }
 */
const lessonFileSchema = z
  .object({
    id: z.string().min(1),

    name: z.string().min(1).optional(),
    title: z.string().min(1).optional(),

    order: z.coerce.number().int().positive().optional(),
    slug: z.string().optional(),
    entryId: z.string().optional(),

    courseId: z.string().optional(),

    course: z
      .object({
        id: z.string().optional(),
        name: z.string().optional(),
        Name: z.string().optional(),
        slug: z.string().optional(),

        declaredLessonCount: z.coerce
          .number()
          .int()
          .positive()
          .optional(),

        NumberOfLesson: z.coerce
          .number()
          .int()
          .positive()
          .optional()
      })
      .passthrough()
      .optional(),

    words: z.array(wordSchema).default([]),
    grammars: z.array(grammarSchema).default([])
  })
  .passthrough()
  .refine(lesson => lesson.name || lesson.title, {
    message: 'Lesson phải có thuộc tính "name" hoặc "title".',
    path: ['name']
  });

/**
 * Vite yêu cầu glob phải là chuỗi literal.
 *
 * Kết quả có dạng:
 * {
 *   "/src/data/HSK1/01-xin-chao.json": {...},
 *   "/src/data/HSK2/01-du-lich.json": {...}
 * }
 */
const lessonModules = import.meta.glob('/src/data/HSK*/**/*.json', {
  eager: true,
  import: 'default'
});

/**
 * Lấy thông tin course từ đường dẫn file.
 *
 * /src/data/HSK1/01-xin-chao.json
 *                    ↓
 * {
 *   id: "c1",
 *   name: "HSK 1",
 *   folder: "HSK1",
 *   level: 1
 * }
 */
const getCourseFromPath = filePath => {
  const match = filePath.match(/\/HSK(\d+)\//i);

  if (!match) {
    throw new Error(
      `Không thể xác định khóa học từ đường dẫn: ${filePath}`
    );
  }

  const level = Number(match[1]);

  return {
    id: `c${level}`,
    name: `HSK ${level}`,
    slug: `hsk-${level}`,
    folder: `HSK${level}`,
    level
  };
};

const getOrderFromLesson = (lesson, filePath) => {
  if (lesson.order) {
    return lesson.order;
  }

  const lessonName = lesson.name ?? lesson.title;

  // Ví dụ: "Bài 5: Gia đình bạn có mấy người?"
  const nameMatch = lessonName.match(/^\s*Bài\s+(\d+)/i);

  if (nameMatch) {
    return Number(nameMatch[1]);
  }

  // Ví dụ filename: 05-gia-dinh.json
  const fileName = filePath.split('/').pop() ?? '';
  const fileMatch = fileName.match(/^(\d+)/);

  if (fileMatch) {
    return Number(fileMatch[1]);
  }

  return Number.MAX_SAFE_INTEGER;
};

const parseLessonFile = (filePath, rawData) => {
  const result = lessonFileSchema.safeParse(rawData);

  if (!result.success) {
    console.error(
      `Dữ liệu lesson không hợp lệ: ${filePath}`,
      result.error.format()
    );

    throw new Error(
      `Không thể đọc dữ liệu lesson tại: ${filePath}`
    );
  }

  const lesson = result.data;
  const pathCourse = getCourseFromPath(filePath);
  const name = lesson.name ?? lesson.title;

  const courseId =
    lesson.course?.id ??
    lesson.courseId ??
    pathCourse.id;

  const courseName =
    lesson.course?.name ??
    lesson.course?.Name ??
    pathCourse.name;

  const declaredLessonCount =
    lesson.course?.declaredLessonCount ??
    lesson.course?.NumberOfLesson;

  return {
    ...lesson,

    // Chuẩn hóa để component cũ vẫn dùng lesson.name.
    name,

    // Đồng thời vẫn cung cấp title cho code mới.
    title: lesson.title ?? name,

    order: getOrderFromLesson(lesson, filePath),

    course: {
      ...lesson.course,
      id: courseId,
      name: courseName,
      Name: courseName,
      slug: lesson.course?.slug ?? pathCourse.slug,
      folder: pathCourse.folder,
      level: pathCourse.level,
      declaredLessonCount
    },

    // Có ích khi cần debug file nguồn.
    sourcePath: filePath
  };
};

export const lessonCollection = Object.entries(lessonModules)
  .map(([filePath, rawData]) =>
    parseLessonFile(filePath, rawData)
  )
  .sort((lessonA, lessonB) => {
    const courseOrder =
      lessonA.course.level - lessonB.course.level;

    if (courseOrder !== 0) {
      return courseOrder;
    }

    return lessonA.order - lessonB.order;
  });

/**
 * Kiểm tra ID lesson có bị trùng giữa các file hay không.
 *
 * getLessonById chỉ hoạt động chính xác khi mỗi lesson có ID duy nhất.
 */
const lessonIdMap = new Map();

for (const lesson of lessonCollection) {
  const existingLesson = lessonIdMap.get(lesson.id);

  if (existingLesson) {
    throw new Error(
      [
        `Lesson ID bị trùng: "${lesson.id}".`,
        `File thứ nhất: ${existingLesson.sourcePath}`,
        `File thứ hai: ${lesson.sourcePath}`
      ].join('\n')
    );
  }

  lessonIdMap.set(lesson.id, lesson);
}

/**
 * Lấy chi tiết một bài học dựa vào lessonId.
 *
 * @param {string} lessonId
 * @returns {Promise<object>}
 */
export const getLessonById = async lessonId => {
  await delay();

  const normalizedLessonId = String(lessonId).trim();
  const lesson = lessonIdMap.get(normalizedLessonId);

  if (!lesson) {
    throw new Error(
      `Không tìm thấy dữ liệu cho bài học có ID: ${normalizedLessonId}`
    );
  }

  return lesson;
};