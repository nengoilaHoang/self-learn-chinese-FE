import './GrammarCard.css';

const GrammarCard = ({ id, title }) => {
  const handleCardClick = () => {
    // Xử lý chuyển hướng dựa vào id của bài ngữ pháp
    console.log(`Đang chuyển hướng đến bài ngữ pháp có ID: ${id}`);
    // navigate(`/grammar/${id}`);
  };

  return (
    <div className="GrammarCard-container" onClick={handleCardClick}>
      {/* Kế thừa font Serif đỏ chuẩn Chinoiserie */}
      <h2 className="GrammarCard-title chinese-title">
        {title}
      </h2>

      {/* Hành động (Nút Xem thêm) */}
      <div className="GrammarCard-action">
        <span>Xem chi tiết</span>
        <span className="GrammarCard-arrow">→</span>
      </div>
    </div>
  );
};

export default GrammarCard;