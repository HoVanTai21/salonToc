import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import ArticleGrid from './components/ArticleGrid';
import MarqueeText from './components/MarqueeText';
import CategorySection from './components/CategorySection';
import Services from './components/Services';
import ContactBanner from './components/ContactBanner';
import Footer from './components/Footer';
import ArticlesPage from './pages/ArticlesPage';
import './App.css';

const marqueeMessages1 = [
  '🔥 Flash Sale: Giảm 20% tất cả sản phẩm dưỡng tóc',
  '✨ Miễn phí tư vấn kiểu tóc phù hợp khuôn mặt',
  '🎁 Tặng serum dưỡng tóc cho đơn hàng từ 500K',
  '💇 Đặt lịch online — Giảm ngay 50K',
  '🌟 Sản phẩm chính hãng nhập khẩu 100%',
];

const marqueeMessages2 = [
  '📦 Giao hàng nhanh trong 2h nội thành',
  '💳 Thanh toán tiện lợi: COD, Chuyển khoản, Momo',
  '🎯 Cam kết đúng màu — Nhuộm lại miễn phí',
  '⭐ Hơn 500 khách hàng tin tưởng mỗi tháng',
  '🧴 Top sản phẩm bán chạy: Olaplex, Moroccanoil, L\'Oréal',
];

const marqueeMessages3 = [
  '💡 Tips: Dùng dầu xả trước khi gội giúp tóc mềm mượt hơn',
  '🔬 Công nghệ phục hồi nano mới nhất 2025',
  '🏆 Salon uy tín — Đội ngũ 15 stylist chuyên nghiệp',
  '📱 Theo dõi TikTok @salontoc để cập nhật xu hướng',
  '💄 Combo cưới hỏi: Makeup + Bới tóc chỉ từ 1.5 triệu',
];

const categoryProducts = [
  {
    icon: '🧴',
    title: 'Sản Phẩm Tóc',
    articles: [
      { id: 101, image: '/cat-1.png', title: 'Top 5 Dầu Gội Phục Hồi Tóc Hư Tổn Tốt Nhất 2025', excerpt: 'Những sản phẩm dầu gội chuyên biệt giúp tóc khỏe mạnh từ gốc đến ngọn.', date: '11/03/2025', views: 2100 },
      { id: 102, image: '/article-1.png', title: 'Serum Dưỡng Tóc Moroccanoil — Có Đáng Mua?', excerpt: 'Review chi tiết serum dưỡng tóc bán chạy nhất salon.', date: '10/03/2025', views: 1850 },
      { id: 103, image: '/article-2.png', title: 'So Sánh 3 Loại Thuốc Nhuộm Không Ammonia', excerpt: 'Nhuộm tóc an toàn với thuốc nhuộm không chứa ammonia.', date: '09/03/2025', views: 1200 },
      { id: 104, image: '/article-3.png', title: 'Bí Mật Dầu Xả Olaplex No.5', excerpt: 'Tại sao Olaplex No.5 được các stylist yêu thích nhất?', date: '08/03/2025', views: 980 },
      { id: 105, image: '/cat-1.png', title: 'Mặt Nạ Tóc Tự Làm Tại Nhà Siêu Hiệu Quả', excerpt: 'Công thức mặt nạ tóc từ nguyên liệu tự nhiên.', date: '07/03/2025', views: 760 },
    ],
  },
  {
    icon: '💇',
    title: 'Dịch Vụ Hot',
    articles: [
      { id: 201, image: '/cat-2.png', title: 'Trải Nghiệm Gội Đầu Dưỡng Sinh Nhật Bản Tại Salon', excerpt: 'Liệu trình gội đầu thư giãn kết hợp massage đỉnh cao từ Nhật Bản.', date: '12/03/2025', views: 3200 },
      { id: 202, image: '/article-1.png', title: 'Uốn Setting Hàn Quốc: Giá Bao Nhiêu? Phù Hợp Ai?', excerpt: 'Tất tần tật về kỹ thuật uốn setting đang hot nhất hiện nay.', date: '11/03/2025', views: 2900 },
      { id: 203, image: '/article-2.png', title: 'Combo Cắt + Gội + Sấy Tạo Kiểu Chỉ 250K', excerpt: 'Gói dịch vụ tiết kiệm phù hợp cho mọi đối tượng.', date: '10/03/2025', views: 1600 },
      { id: 204, image: '/article-3.png', title: 'Duỗi Keratin — Bao Lâu Cần Làm Lại?', excerpt: 'Hướng dẫn chăm sóc tóc sau duỗi keratin chuyên nghiệp.', date: '09/03/2025', views: 1100 },
      { id: 205, image: '/cat-2.png', title: 'Dịch Vụ Nhuộm Tóc Highlight Ombre Mới Nhất', excerpt: 'Bắt kịp xu hướng nhuộm highlight ombre siêu hot 2025.', date: '08/03/2025', views: 870 },
    ],
  },
  {
    icon: '✨',
    title: 'Xu Hướng Mới',
    articles: [
      { id: 301, image: '/cat-3.png', title: 'Xu Hướng Tóc Mùa Hè 2025: Tự Nhiên Lên Ngôi', excerpt: 'Những kiểu tóc mùa hè đẹp tự nhiên, dễ chăm sóc mà vẫn thời thượng.', date: '13/03/2025', views: 4500 },
      { id: 302, image: '/article-1.png', title: 'Màu Nhuộm "Cinnamon Latte" Đang Gây Sốt TikTok', excerpt: 'Gam màu ấm áp lấy cảm hứng từ ly latte quế thơm nồng.', date: '12/03/2025', views: 3800 },
      { id: 303, image: '/article-2.png', title: 'Kiểu Tóc Bob Layer — Hack Tuổi Cực Đỉnh', excerpt: 'Kiểu bob layer giúp khuôn mặt thon gọn và trẻ trung hơn 5 tuổi.', date: '11/03/2025', views: 2500 },
      { id: 304, image: '/article-3.png', title: 'Tóc Búi Thấp Thanh Lịch Cho Dự Tiệc', excerpt: 'Hướng dẫn búi tóc thấp kiểu Pháp sang trọng tại nhà.', date: '10/03/2025', views: 1900 },
      { id: 305, image: '/cat-3.png', title: 'Phong Cách "Clean Girl" — Đơn Giản Mà Đẳng Cấp', excerpt: 'Minimalism trong làm tóc: ít mà chất, đơn giản mà sang.', date: '09/03/2025', views: 1500 },
    ],
  },
];

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-[#1a1a2e] hover:bg-gradient-to-r hover:from-[#5b7df7] hover:to-[#b54784] hover:text-white hover:border-transparent transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <ArticleGrid />
      <MarqueeText items={marqueeMessages1} variant="accent" speed={35} />
      <CategorySection icon={categoryProducts[0].icon} title={categoryProducts[0].title} articles={categoryProducts[0].articles} bgColor="bg-white" />
      <MarqueeText items={marqueeMessages2} variant="dark" speed={30} direction="right" />
      <CategorySection icon={categoryProducts[1].icon} title={categoryProducts[1].title} articles={categoryProducts[1].articles} bgColor="bg-[#f8f9fa]" />
      <MarqueeText items={marqueeMessages3} variant="primary" speed={40} />
      <CategorySection icon={categoryProducts[2].icon} title={categoryProducts[2].title} articles={categoryProducts[2].articles} bgColor="bg-white" />
      <Services />
      <ContactBanner />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bai-viet" element={<ArticlesPage />} />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
