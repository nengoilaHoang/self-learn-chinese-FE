// Import file json mock data (điều chỉnh lại đường dẫn cho đúng với thư mục của bạn)
import mockData from './mockdata.json';

// Hàm giả lập độ trễ API (khoảng 300ms)
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Lấy danh sách tất cả các khóa học
 */
export const getAllCourses = async () => {
  await delay();
  // Trả về mảng courses nhưng loại bỏ thuộc tính 'lessons' bên trong để tối ưu
  // Chỉ lấy id, Name, NumberOfLesson để hiển thị trên CourseCard
  return mockData.courses.map(course => ({
    id: course.id,
    Name: course.Name,
    lesson: course.NumberOfLesson
  }));
};

/**
 * Lấy danh sách bài học của một khóa học dựa vào courseId
 * @param {string} courseId - ID của khóa học (VD: "c1")
 */
export const getLessonsByCourseId = async (courseId) => {
  await delay();
  const course = mockData.courses.find(c => c.id === courseId);
  if (!course) {
    throw new Error(`Không tìm thấy khóa học với ID: ${courseId}`);
  }
  // Chỉ trả về id và name của các lesson để render danh sách LessonCard
  return course.lessons.map(lesson => ({
    id: lesson.id,
    name: lesson.name
  }));
};