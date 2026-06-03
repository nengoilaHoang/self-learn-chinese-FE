import LessonCard from '../../../components/LessonPageComponents/LessonCard/LessonCard';
import './LessonPage.css';
import { useEffect, useState } from 'react';
import {getLessonsByCourseId} from '../../../services/course.service';
import { useParams } from 'react-router-dom';

const LessonPage = () => {
  const [lessonData, setlessonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  console.log('Course ID từ URL:', courseId);
  useEffect(() => {
    const fetchLessons = async () => {
      const lessons = await getLessonsByCourseId(courseId);
      setlessonData(lessons);
      setLoading(false);
    };
    fetchLessons();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="LessonPage-container">
      <header className="LessonPage-header">
        <h1 className="LessonPage-title chinese-title">Danh sách bài học</h1>
        <p className="LessonPage-subtitle">Chọn một bài học để tiếp tục lộ trình của bạn.</p>
      </header>

      <div className="LessonPage-grid">
        {lessonData.map((lesson) => (
          <LessonCard 
            key={lesson.id} 
            id={lesson.id}
            name={lesson.name} 
          />
        ))}
      </div>
    </div>
  );
};

export default LessonPage;