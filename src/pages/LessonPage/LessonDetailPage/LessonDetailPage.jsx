import './LessonDetailPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonById } from '../../../services/lesson.service';

const LessonPage = () => {
  // Mock Data giả lập response từ Backend
  const [mockResponse, setMockResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lessonId } = useParams();
  const [word, setWord] = useState([]);
  const [grammar, setGrammar] = useState([]);
  useEffect(() => {
    const fetchLessonDetail = async () => {
      const response = await getLessonById(lessonId);
      setMockResponse(response);
      console.log('Response từ Backend:', response);
      setLoading(false);
      setWord(response.words);
      setGrammar(response.grammars);
    };
    fetchLessonDetail();
  }, [lessonId]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="LessonPage-container">
      {/* Header của bài học */}
      <header className="LessonPage-header">
        <h1 className="LessonPage-title chinese-title">{mockResponse.name}</h1>
        {/* <p className="LessonPage-subtitle">Làm quen với những câu giao tiếp cơ bản nhất</p> */}
      </header>

      {/* Phần 1: Từ vựng */}
      <section className="LessonPage-section">
        <h2 className="LessonPage-sectionTitle chinese-title">1. Từ vựng (生词)</h2>
        <div className="LessonPage-wordGrid">
          {word.map((item) => (
            <div key={item.id} className="LessonPage-wordCard">
              {/* Khu vực hiển thị chữ Hán và Pinyin */}
              <div className="LessonPage-hanziGroup">
                <span className="LessonPage-hanziText chinese-title">{item.hanzi}</span>
                <span className="LessonPage-pinyinText pinyin">{item.pinyin}</span>
              </div>
              
              {/* Khu vực hiển thị nghĩa */}
              <div className="LessonPage-meaningGroup">
                <span className="LessonPage-vietMeaning">{item.vietnamese}</span>
                <span className="LessonPage-sinoMeaning">Hán Việt: {item.sinoVietnamese}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phần 2: Ngữ pháp (Render HTML từ BE) */}
      <section className="LessonPage-section">
        <h2 className="LessonPage-sectionTitle chinese-title">2. Ngữ pháp (语法)</h2>
        <div className="LessonPage-grammarList">
          {grammar.map((item) => (
            <div key={item.id} className="LessonPage-grammarCard">
              {/* Render HTML string an toàn vào trong div */}
              <div 
                className="LessonPage-grammarHtml"
                dangerouslySetInnerHTML={{ __html: item.htmlContent }} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LessonPage;