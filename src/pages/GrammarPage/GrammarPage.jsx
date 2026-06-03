import GrammarCard from '../../components/GrammarPageComponents/GrammarCard/GrammarCard';
import './GrammarPage.css';

const GrammarPage = () => {
  // Mock Data: Các điểm ngữ pháp phổ biến trong tiếng Trung
  const grammarData = [
    { id: 'g1', title: 'Câu chữ 把 (Bǎ)' },
    { id: 'g2', title: 'Câu chữ 被 (Bèi)' },
    { id: 'g3', title: 'Phân biệt 的, 得, 地' },
    { id: 'g4', title: 'Bổ ngữ kết quả' },
    { id: 'g5', title: 'Bổ ngữ phương hướng' },
    { id: 'g6', title: 'Câu tồn hiện' },
    { id: 'g7', title: 'Lượng từ thường gặp' },
    { id: 'g8', title: 'Cấu trúc 虽然...但是...' },
  ];

  return (
    <div className="GrammarPage-container">
      {/* Lời chào / Tiêu đề trang */}
      <header className="GrammarPage-header">
        <h1 className="GrammarPage-title chinese-title">Điểm Ngữ Pháp</h1>
        <p className="GrammarPage-subtitle">Nắm chắc cấu trúc câu để giao tiếp tự nhiên và chuẩn xác.</p>
      </header>

      {/* Khu vực danh sách thẻ ngữ pháp (Dạng Lưới) */}
      <div className="GrammarPage-grid">
        {grammarData.map((grammar) => (
          <GrammarCard 
            key={grammar.id} 
            id={grammar.id}
            title={grammar.title} 
          />
        ))}
      </div>
    </div>
  );
};

export default GrammarPage;