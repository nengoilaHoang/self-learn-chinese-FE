import './CourseCard.css';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ id, Name, NumberOfLesson }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="CourseCard-container" onClick={handleCardClick}>
      <div>
        {/* Tiêu đề - Kế thừa class chinese-title từ index.css để có font Serif màu đỏ */}
        <h2 className="CourseCard-title chinese-title">
          {Name}
        </h2>
        
        {/* Nét gạch trang trí */}
        <div className="CourseCard-divider"></div>
        
        {/* Số bài học */}
        <p className="CourseCard-lessonCount">
          Số bài học: {NumberOfLesson}
        </p>
      </div>

      {/* Mũi tên điều hướng ở góc dưới */}
      <div className="CourseCard-action">
        <span>Bắt đầu</span>
        <span className="CourseCard-arrow">→</span>
      </div>
    </div>
  );
};

export default CourseCard;