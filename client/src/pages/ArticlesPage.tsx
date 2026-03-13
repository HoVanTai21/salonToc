import { useState, useEffect, useRef } from 'react';
import { Clock, Eye, ShoppingBag, ShoppingCart } from 'lucide-react';
import FacebookShareButton from '../components/FacebookShareButton';
import ShopeeBanner from '../components/ShopeeBanner';
import MarqueeText from '../components/MarqueeText';

/* ─── DATA ─── */

const allArticles = [
  { id: 1, image: '/article-1.png', category: 'Xu Hướng', title: 'Top 10 Kiểu Tóc Trending 2025 Cho Phái Nữ', excerpt: 'Khám phá những kiểu tóc hot nhất năm 2025, từ bob ngắn cá tính đến tóc dài uốn layer tinh tế.', date: '12/03/2025', views: 1250 },
  { id: 2, image: '/article-2.png', category: 'Nhuộm Tóc', title: 'Kỹ Thuật Balayage: Bí Quyết Nhuộm Tóc Tự Nhiên', excerpt: 'Tìm hiểu về kỹ thuật nhuộm balayage đang làm mưa làm gió tại các salon hàng đầu.', date: '10/03/2025', views: 980 },
  { id: 3, image: '/article-3.png', category: 'Chăm Sóc', title: 'Bí Quyết Giữ Tóc Nhuộm Bền Màu Lâu Dài', excerpt: 'Những tips chăm sóc tóc nhuộm từ chuyên gia giúp màu tóc đẹp bền lâu.', date: '08/03/2025', views: 750 },
  { id: 4, image: '/cat-1.png', category: 'Sản Phẩm', title: 'Top 5 Dầu Gội Phục Hồi Tóc Hư Tổn Tốt Nhất 2025', excerpt: 'Những sản phẩm dầu gội chuyên biệt giúp tóc khỏe mạnh từ gốc đến ngọn.', date: '11/03/2025', views: 2100 },
  { id: 5, image: '/cat-2.png', category: 'Dịch Vụ', title: 'Trải Nghiệm Gội Đầu Dưỡng Sinh Nhật Bản Tại Salon', excerpt: 'Liệu trình gội đầu thư giãn kết hợp massage đỉnh cao từ Nhật Bản.', date: '12/03/2025', views: 3200 },
  { id: 6, image: '/cat-3.png', category: 'Xu Hướng', title: 'Xu Hướng Tóc Mùa Hè 2025: Tự Nhiên Lên Ngôi', excerpt: 'Những kiểu tóc mùa hè đẹp tự nhiên, dễ chăm sóc mà vẫn thời thượng.', date: '13/03/2025', views: 4500 },
  { id: 7, image: '/article-1.png', category: 'Nhuộm Tóc', title: 'Màu Nhuộm "Cinnamon Latte" Đang Gây Sốt TikTok', excerpt: 'Gam màu ấm áp lấy cảm hứng từ ly latte quế thơm nồng.', date: '12/03/2025', views: 3800 },
  { id: 8, image: '/article-2.png', category: 'Xu Hướng', title: 'Kiểu Tóc Bob Layer — Hack Tuổi Cực Đỉnh', excerpt: 'Kiểu bob layer giúp khuôn mặt thon gọn và trẻ trung hơn 5 tuổi.', date: '11/03/2025', views: 2500 },
  { id: 9, image: '/article-3.png', category: 'Sản Phẩm', title: 'Serum Dưỡng Tóc Moroccanoil — Có Đáng Mua?', excerpt: 'Review chi tiết serum dưỡng tóc bán chạy nhất salon.', date: '10/03/2025', views: 1850 },
  { id: 10, image: '/cat-1.png', category: 'Chăm Sóc', title: 'So Sánh 3 Loại Thuốc Nhuộm Không Ammonia', excerpt: 'Nhuộm tóc an toàn với thuốc nhuộm không chứa ammonia.', date: '09/03/2025', views: 1200 },
  { id: 11, image: '/cat-2.png', category: 'Dịch Vụ', title: 'Uốn Setting Hàn Quốc: Giá Bao Nhiêu? Phù Hợp Ai?', excerpt: 'Tất tần tật về kỹ thuật uốn setting đang hot nhất hiện nay.', date: '11/03/2025', views: 2900 },
  { id: 12, image: '/cat-3.png', category: 'Xu Hướng', title: 'Phong Cách "Clean Girl" — Đơn Giản Mà Đẳng Cấp', excerpt: 'Minimalism trong làm tóc: ít mà chất, đơn giản mà sang.', date: '09/03/2025', views: 1500 },
  { id: 13, image: '/article-1.png', category: 'Sản Phẩm', title: 'Bí Mật Dầu Xả Olaplex No.5 — Tại Sao Hot?', excerpt: 'Tại sao Olaplex No.5 được các stylist yêu thích nhất?', date: '08/03/2025', views: 980 },
  { id: 14, image: '/article-2.png', category: 'Dịch Vụ', title: 'Combo Cắt + Gội + Sấy Tạo Kiểu Chỉ 250K', excerpt: 'Gói dịch vụ tiết kiệm phù hợp cho mọi đối tượng.', date: '10/03/2025', views: 1600 },
  { id: 15, image: '/article-3.png', category: 'Chăm Sóc', title: 'Mặt Nạ Tóc Tự Làm Tại Nhà Siêu Hiệu Quả', excerpt: 'Công thức mặt nạ tóc từ nguyên liệu tự nhiên đơn giản.', date: '07/03/2025', views: 760 },
];

const allProducts = [
  { id: 1, image: '/cat-1.png', category: 'Dầu Gội', name: 'Dầu Gội Phục Hồi Olaplex No.4', description: 'Dầu gội chuyên biệt cho tóc hư tổn, giúp tái tạo liên kết tóc từ bên trong.', price: 890000, originalPrice: 1200000, date: '12/03/2025' },
  { id: 2, image: '/article-2.png', category: 'Thuốc Nhuộm', name: 'Thuốc Nhuộm L\'Oreal Excellence Crème', description: 'Nhuộm tóc không ammonia, bảng màu đa dạng, bảo vệ tóc tối ưu.', price: 450000, originalPrice: 550000, date: '11/03/2025' },
  { id: 3, image: '/cat-3.png', category: 'Serum', name: 'Serum Dưỡng Tóc Moroccanoil Treatment', description: 'Tinh dầu Argan nguyên chất, giúp tóc bóng mượt tức thì và chống xơ rối.', price: 920000, originalPrice: 1100000, date: '10/03/2025' },
  { id: 4, image: '/article-1.png', category: 'Dầu Xả', name: 'Dầu Xả Olaplex No.5 Bond Maintenance', description: 'Phục hồi, dưỡng ẩm và bảo vệ mái tóc sau nhuộm, uốn, duỗi.', price: 780000, originalPrice: 950000, date: '09/03/2025' },
  { id: 5, image: '/cat-2.png', category: 'Mặt Nạ Tóc', name: 'Mặt Nạ Tóc Kerastase Elixir Ultime', description: 'Mặt nạ chứa tinh dầu quý hiếm, giúp tóc mềm mượt và sáng bóng.', price: 1250000, originalPrice: 1500000, date: '08/03/2025' },
  { id: 6, image: '/article-3.png', category: 'Keo Tạo Kiểu', name: 'Keo Xịt Tóc Schwarzkopf Got2b', description: 'Keo xịt tóc giữ nếp siêu cứng, không bết dính, dễ gội sạch.', price: 280000, originalPrice: 350000, date: '12/03/2025' },
  { id: 7, image: '/cat-1.png', category: 'Dầu Gội', name: 'Dầu Gội Trị Gàu Head & Shoulders Supreme', description: 'Công nghệ dưỡng ẩm sâu kết hợp trị gàu, cho da đầu khỏe mạnh.', price: 320000, originalPrice: 400000, date: '11/03/2025' },
  { id: 8, image: '/cat-3.png', category: 'Serum', name: 'Tinh Dầu Dưỡng Tóc Chi Silk Infusion', description: 'Tinh dầu tơ tằm cao cấp, tái tạo độ bóng tự nhiên cho tóc khô xơ.', price: 650000, originalPrice: 800000, date: '10/03/2025' },
  { id: 9, image: '/article-1.png', category: 'Lược & Phụ Kiện', name: 'Lược Gỡ Rối Tangle Teezer Original', description: 'Lược gỡ rối không gây đau, phù hợp mọi loại tóc kể cả tóc rối nặng.', price: 350000, originalPrice: 420000, date: '09/03/2025' },
  { id: 10, image: '/cat-2.png', category: 'Thuốc Uốn', name: 'Thuốc Uốn Tóc Goldwell Topform', description: 'Thuốc uốn chuyên salon, giữ nếp lâu, không làm khô xơ tóc.', price: 560000, originalPrice: 700000, date: '08/03/2025' },
];

const marqueeItems = [
  '🔥 Flash Sale: Giảm 20% tất cả sản phẩm dưỡng tóc',
  '✨ Miễn phí tư vấn kiểu tóc phù hợp khuôn mặt',
  '🎁 Tặng serum dưỡng tóc cho đơn hàng từ 500K',
  '💇 Đặt lịch online — Giảm ngay 50K',
];

function formatVND(n: number) {
  return n.toLocaleString('vi-VN') + 'đ';
}

/* ─── ARTICLE CARD ─── */

function ArticleCard({ article }: { article: typeof allArticles[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal group cursor-pointer flex flex-col">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-[#5b7df7] to-[#b54784]">
          {article.category}
        </span>
      </div>
      <div className="mt-4 flex flex-col flex-1">
        <h3 className="font-['Playfair_Display'] text-base md:text-lg font-bold text-[#1a1a2e] group-hover:text-[#5b7df7] transition-colors duration-300 leading-snug line-clamp-2">
          {article.title}
        </h3>
        <div className="w-10 h-0.5 bg-gradient-to-r from-[#5b7df7] to-[#b54784] mt-2.5 mb-2.5 transition-all duration-300 group-hover:w-16" />
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 flex-1">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.date}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views.toLocaleString()}</span>
          </div>
          <FacebookShareButton url={`https://salontoc.vn/bai-viet/${article.id}`} title={article.title} />
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ─── */

function ProductCard({ product }: { product: typeof allProducts[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal group cursor-pointer flex flex-col">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-[#ee4d2d] to-[#f7733b]">
          {product.category}
        </span>
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold text-white rounded-md bg-[#e74c3c]">
            -{discount}%
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col flex-1">
        <h3 className="font-['Playfair_Display'] text-base md:text-lg font-bold text-[#1a1a2e] group-hover:text-[#5b7df7] transition-colors duration-300 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="w-10 h-0.5 bg-gradient-to-r from-[#ee4d2d] to-[#f7733b] mt-2.5 mb-2.5 transition-all duration-300 group-hover:w-16" />
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 flex-1">{product.description}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[#ee4d2d] font-bold text-sm">{formatVND(product.price)}</span>
          <span className="text-gray-400 text-xs line-through">{formatVND(product.originalPrice)}</span>
        </div>

        {/* Bottom: date + actions */}
        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock className="w-3 h-3" /> {product.date}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium border border-gray-200 text-gray-500 hover:border-[#5b7df7] hover:text-[#5b7df7] transition-all duration-300"
              title="Thêm vào giỏ"
            >
              <ShoppingBag className="w-3 h-3" />
            </button>
            <button
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold text-white transition-all duration-300 hover:opacity-80"
              style={{ background: 'linear-gradient(135deg, #ee4d2d, #f7733b)' }}
            >
              <ShoppingCart className="w-3 h-3" />
              Mua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TABS ─── */

type TabId = 'articles' | 'products';

const tabs: { id: TabId; label: string; emoji: string }[] = [
  { id: 'articles', label: 'Bài Viết', emoji: '📝' },
  { id: 'products', label: 'Sản Phẩm', emoji: '🛍️' },
];

/* ─── PAGE ─── */

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('articles');
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const [displayTab, setDisplayTab] = useState<TabId>('articles');
  const tabIndicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ articles: null, products: null });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Animate tab indicator position
  useEffect(() => {
    const activeBtn = tabRefs.current[activeTab];
    const indicator = tabIndicatorRef.current;
    if (activeBtn && indicator) {
      indicator.style.left = `${activeBtn.offsetLeft}px`;
      indicator.style.width = `${activeBtn.offsetWidth}px`;
    }
  }, [activeTab]);

  const handleTabSwitch = (newTab: TabId) => {
    if (newTab === activeTab || animating) return;
    setSlideDir(newTab === 'products' ? 'left' : 'right');
    setAnimating(true);
    setActiveTab(newTab);

    // After fade-out, swap content, then fade-in
    setTimeout(() => {
      setDisplayTab(newTab);
      setTimeout(() => setAnimating(false), 50);
    }, 250);
  };

  const articleRows: (typeof allArticles)[] = [];
  for (let i = 0; i < allArticles.length; i += 5) articleRows.push(allArticles.slice(i, i + 5));

  const productRows: (typeof allProducts)[] = [];
  for (let i = 0; i < allProducts.length; i += 5) productRows.push(allProducts.slice(i, i + 5));

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="pt-28 pb-12 px-6" style={{ background: 'linear-gradient(135deg, #0c1117 0%, #1a1a2e 50%, #2a1a3e 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[4px] text-[#b54784]">Blog & Cửa Hàng</span>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-white mt-2">
            {activeTab === 'articles' ? 'Tất Cả Bài Viết' : 'Sản Phẩm Cửa Hàng'}
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl text-sm md:text-base">
            {activeTab === 'articles'
              ? 'Tổng hợp kiến thức, xu hướng tóc và tips chăm sóc tóc chuyên nghiệp từ đội ngũ SalonTóc.'
              : 'Sản phẩm chăm sóc tóc chính hãng, được chọn lọc bởi đội ngũ stylist chuyên nghiệp.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-0 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              onClick={() => handleTabSwitch(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-[#1a1a2e]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className={`text-base transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'scale-100'}`}>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
          {/* Sliding indicator */}
          <span
            ref={tabIndicatorRef}
            className="absolute bottom-0 h-[3px] rounded-t-full bg-gradient-to-r from-[#5b7df7] to-[#b54784] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ left: 0, width: 0 }}
          />
        </div>
      </div>

      {/* Shopee Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <ShopeeBanner />
      </div>

      {/* Tab Content with animation */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 overflow-hidden">
        <div
          className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${slideDir === 'left' ? '-30px' : '30px'})`
              : 'translateX(0)',
          }}
        >
          {displayTab === 'articles' ? (
            /* ─── Articles Tab ─── */
            articleRows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
                  {row.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                {rowIdx < articleRows.length - 1 && (
                  <div className="mt-8">
                    <MarqueeText items={marqueeItems} variant={rowIdx % 2 === 0 ? 'accent' : 'dark'} speed={35} direction={rowIdx % 2 === 0 ? 'left' : 'right'} />
                  </div>
                )}
              </div>
            ))
          ) : (
            /* ─── Products Tab ─── */
            productRows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
                  {row.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {rowIdx < productRows.length - 1 && (
                  <div className="mt-8">
                    <MarqueeText
                      items={['🧴 Sản phẩm chính hãng 100%', '📦 Giao hàng nhanh 2h', '💳 COD — Chuyển khoản — Momo', '🎁 Mua 2 tặng 1 combo chăm sóc', '⭐ Đánh giá 5 sao từ khách hàng']}
                      variant={rowIdx % 2 === 0 ? 'primary' : 'accent'}
                      speed={30}
                      direction={rowIdx % 2 === 0 ? 'left' : 'right'}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
