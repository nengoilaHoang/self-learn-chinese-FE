import './LessonCard.css';
import { useNavigate } from 'react-router-dom';

const LessonCard = ({ id, name }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/lesson/${id}`);
  };

  return (
    <div className="LessonCard-container" onClick={handleCardClick}>
      {/* Tiêu đề (Ví dụ: Bài 1: Xin chào) */}
      <h2 className="LessonCard-title chinese-title">
        {name}
      </h2>

      {/* Hành động */}
      <div className="LessonCard-action">
        <span>Vào học</span>
        <span className="LessonCard-arrow">→</span>
      </div>
    </div>
  );
};

export default LessonCard;