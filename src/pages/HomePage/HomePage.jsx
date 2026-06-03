import CourseCard from '../../components/HomePageComponents/CourseCard/CourseCard'; // Nhớ import component CourseCard
import './HomePage.css';
import { useEffect, useState } from 'react';
import {getAllCourses} from '../../services/course.service';

const HomePage = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getAllCourses();
      setCoursesData(courses);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="HomePage-container">
      {/* Lời chào / Tiêu đề trang */}
      <header className="HomePage-header">
        <h1 className="HomePage-title chinese-title">Lộ trình học tập</h1>
        <p className="HomePage-subtitle">Chọn cấp độ để bắt đầu hành trình chinh phục Hán ngữ của bạn.</p>
      </header>

      {/* Khu vực danh sách khóa học (Dạng Lưới) */}
      <div className="HomePage-grid">
        {coursesData.map((course) => (
          <CourseCard 
            id={course.id} 
            Name={course.Name} 
            NumberOfLesson={course.lesson} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;