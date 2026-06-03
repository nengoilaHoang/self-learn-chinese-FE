import { NavLink, Outlet } from 'react-router-dom';
import MainHeader from '../../components/LayoutComponents/MainHeader/MainHeader';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="MainLayout-container">
      {/* 1. Phần Header ở trên cùng */}
      <MainHeader />

      {/* 2. Thanh Bar dính (Sticky Navbar) */}
      <nav className="MainLayout-navbar">
        <div className="MainLayout-navInner">
          {/* Nút Home (chứa logo từ public/favicon.png) */}
          {/* Sử dụng NavLink để tự động bắt class "active" khi đang ở đúng trang */}
          <NavLink to="/" className="MainLayout-navLink" title="Trang chủ">
            <img 
              src="/favicon.png" 
              alt="Logo App Học Tiếng Trung" 
              className="MainLayout-logo" 
            />
          </NavLink>

          {/* Nút Ngữ Pháp */}
          <NavLink to="/grammar" className="MainLayout-navLink">
            Ngữ Pháp
          </NavLink>
        </div>
      </nav>

      {/* 3. Khu vực chứa nội dung của từng trang */}
      <main className="MainLayout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;