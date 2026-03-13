import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import ShopeeBanner from './ShopeeBanner';
import FacebookShareButton from './FacebookShareButton';

const articles = [
  {
    id: 1,
    image: '/article-1.png',
    category: 'Xu Hướng',
    title: 'Top 10 Kiểu Tóc Trending 2025 Cho Phái Nữ',
    excerpt: 'Khám phá những kiểu tóc hot nhất năm 2025, từ bob ngắn cá tính đến tóc dài uốn layer tinh tế.',
    date: '12/03/2025',
    views: 1250,
  },
  {
    id: 2,
    image: '/article-2.png',
    category: 'Nhuộm Tóc',
    title: 'Kỹ Thuật Balayage: Bí Quyết Nhuộm Tóc Tự Nhiên',
    excerpt: 'Tìm hiểu về kỹ thuật nhuộm balayage đang làm mưa làm gió tại các salon hàng đầu thế giới.',
    date: '10/03/2025',
    views: 980,
  },
  {
    id: 3,
    image: '/article-3.png',
    category: 'Chăm Sóc',
    title: 'Bí Quyết Giữ Tóc Nhuộm Bền Màu Lâu Dài',
    excerpt: 'Những tips chăm sóc tóc nhuộm từ chuyên gia giúp màu tóc đẹp bền lâu suốt nhiều tuần.',
    date: '08/03/2025',
    views: 750,
  },
];

function ArticleCard({ article, delay }: { article: typeof articles[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay} group cursor-pointer`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-[#5b7df7] to-[#b54784]">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a2e] group-hover:text-[#5b7df7] transition-colors duration-300 leading-tight">
          {article.title}
        </h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-[#5b7df7] to-[#b54784] mt-3 mb-3 transition-all duration-300 group-hover:w-20" />
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()}
            </span>
          </div>
          <FacebookShareButton
            url={`https://salontoc.vn/bai-viet/${article.id}`}
            title={article.title}
          />
        </div>
      </div>
    </div>
  );
}

export default function ArticleGrid() {
  return (
    <section id="articles" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[4px] text-[#b54784]">
              Blog & Tin Tức
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1a1a2e] mt-2">
              Bài Viết Mới Nhất
            </h2>
          </div>
          <Link
            to="/bai-viet"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] font-semibold text-sm hover:bg-[#1a1a2e] hover:text-white transition-all duration-300"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Shopee Banner */}
        <ShopeeBanner />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i + 1} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/bai-viet"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] font-semibold text-sm"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
