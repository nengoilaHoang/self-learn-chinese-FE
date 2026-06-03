import mockData from './mockdata.json';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Lấy chi tiết thông tin của 1 bài học dựa vào lessonId
 * @param {string} lessonId - ID của bài học (VD: "l1")
 */
export const getLessonById = async (lessonId) => {
  await delay();
  // Vì mock data lồng nhau, ta phải lặp qua từng course trước
  for (const course of mockData.courses) {
    // Tìm lesson bên trong mảng lessons của course hiện tại
    const targetLesson = course.lessons.find(l => l.id === lessonId);
    if (targetLesson) {
      // Nếu tìm thấy, trả về toàn bộ object lesson (gồm name, words, grammars)
      return targetLesson;
    }
  }
  // Nếu chạy hết vòng lặp mà không có sẽ văng lỗi
  throw new Error(`Không tìm thấy dữ liệu cho bài học có ID: ${lessonId}`);
};