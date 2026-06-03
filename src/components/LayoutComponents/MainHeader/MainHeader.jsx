import React from 'react';
import './MainHeader.css'; // Import file CSS tương ứng

const MainHeader = () => {
  return (
    <header className="MainHeader-container">
      {/* Đường highlight đỏ mờ phía trên */}
      <div className="MainHeader-topLine"></div>
      
      <div className="MainHeader-content">
        {/* Tiêu đề tiếng Trung - Kết hợp class của component và class tiện ích từ index.css */}
        <h1 className="MainHeader-title chinese-title">
          你好，学中文吧！！！
        </h1>
        
        {/* Họa tiết phân cách Á Đông */}
        <div className="MainHeader-divider">
          <span className="MainHeader-dividerLine"></span>
          <span className="MainHeader-dividerDiamond"></span>
          <span className="MainHeader-dividerLine"></span>
        </div>

        {/* Phụ đề tiếng Việt */}
        <p className="MainHeader-subtitle">
          Xin chào, học tiếng Trung thôi !!!
        </p>
      </div>
    </header>
  );
};

export default MainHeader;