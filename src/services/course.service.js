import { lessonCollection } from './lesson.service';

const delay = (ms = 300) =>
  new Promise(resolve => setTimeout(resolve, ms));

const courseMap = new Map();

for (const lesson of lessonCollection) {
  const courseId = lesson.course.id;
  const existingCourse = courseMap.get(courseId);

  if (existingCourse) {
    existingCourse.lessons.push(lesson);

    // Nếu lesson đầu tiên không có declaredLessonCount nhưng
    // lesson hiện tại có thì cập nhật lại.
    if (
      !existingCourse.declaredLessonCount &&
      lesson.course.declaredLessonCount
    ) {
      existingCourse.declaredLessonCount =
        lesson.course.declaredLessonCount;
    }

    continue;
  }

  courseMap.set(courseId, {
    id: courseId,
    Name: lesson.course.name,
    slug: lesson.course.slug,
    folder: lesson.course.folder,
    level: lesson.course.level,
    declaredLessonCount:
      lesson.course.declaredLessonCount,
    lessons: [lesson]
  });
}

const courseCollection = Array.from(courseMap.values())
  .map(course => ({
    ...course,
    lessons: course.lessons.sort(
      (lessonA, lessonB) =>
        lessonA.order - lessonB.order
    )
  }))
  .sort((courseA, courseB) => {
    return courseA.level - courseB.level;
  });

/**
 * Lấy danh sách tất cả khóa học.
 *
 * Giữ nguyên format mà component hiện tại đang dùng:
 * {
 *   id: "c1",
 *   Name: "HSK 1",
 *   lesson: 15
 * }
 */
export const getAllCourses = async () => {
  await delay();

  return courseCollection.map(course => ({
    id: course.id,
    Name: course.Name,

    // Nếu JSON có declaredLessonCount thì ưu tiên giá trị đó.
    // Nếu không có thì dùng số file lesson thực tế.
    lesson:
      course.declaredLessonCount ??
      course.lessons.length
  }));
};

/**
 * Lấy danh sách bài học dựa vào courseId.
 *
 * @param {string} courseId
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export const getLessonsByCourseId = async courseId => {
  await delay();

  const normalizedCourseId = String(courseId).trim();

  const course = courseCollection.find(
    item => item.id === normalizedCourseId
  );

  if (!course) {
    throw new Error(
      `Không tìm thấy khóa học với ID: ${normalizedCourseId}`
    );
  }

  return course.lessons.map(lesson => ({
    id: lesson.id,
    name: lesson.name
  }));
};