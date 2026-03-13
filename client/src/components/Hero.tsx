import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    image: '/hero-1.png',
    tag: '✂️ CẮT TẠO KIỂU',
    title: 'Phong Cách',
    titleAccent: 'Dẫn Đầu Xu Hướng',
    description:
      'Salon hàng đầu với đội ngũ stylist chuyên nghiệp, mang đến cho bạn mái tóc hoàn hảo nhất.',
    cta: 'Đặt Lịch Ngay →',
  },
  {
    image: '/hero-2.png',
    tag: '🎨 NHUỘM TÓC',
    title: 'Màu Sắc',
    titleAccent: 'Tỏa Sáng Cá Tính',
    description:
      'Công nghệ nhuộm tóc tiên tiến, bảo vệ tóc tối đa, màu sắc bền đẹp lâu dài.',
    cta: 'Xem Bảng Màu →',
  },
  {
    image: '/hero-3.png',
    tag: '💇 CHĂM SÓC TÓC',
    title: 'Chất Lượng',
    titleAccent: 'Vượt Trội Mọi Lúc',
    description:
      'Sản phẩm cao cấp từ các thương hiệu uy tín thế giới, chăm sóc tóc từ gốc đến ngọn.',
    cta: 'Tìm Hiểu Thêm →',
  },
];

const stats = [
  { value: '500+', label: 'Khách Hàng' },
  { value: '15', label: 'Stylist' },
  { value: '5★', label: 'Đánh Giá' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f1a]/90 via-[#0c1117]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1117] via-transparent to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Tag */}
          <div
            key={`tag-${current}`}
            className="animate-fade-in inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#b54784]" />
            <span className="text-xs font-bold text-white uppercase tracking-[3px]">
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${current}`}
            className="animate-slide-in-left"
          >
            <span className="block font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white leading-tight">
              {slide.title}
            </span>
            <span
              className="block font-['Playfair_Display'] italic text-4xl md:text-6xl font-bold leading-tight mt-2"
              style={{
                background: 'linear-gradient(135deg, #5b7df7, #b54784)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {slide.titleAccent}
            </span>
          </h1>

          {/* Description */}
          <p
            key={`desc-${current}`}
            className="animate-fade-in-up mt-6 text-gray-300 text-lg max-w-lg leading-relaxed"
            style={{ animationDelay: '0.3s' }}
          >
            {slide.description}
          </p>

          {/* CTA */}
          <div
            key={`cta-${current}`}
            className="animate-fade-in-up mt-8"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="#"
              className="inline-block px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#b54784]/30"
              style={{
                background: 'linear-gradient(135deg, #5b7df7, #b54784)',
              }}
            >
              {slide.cta}
            </a>
          </div>
        </div>

        {/* Bottom Row: Dots + Stats */}
        <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? 'w-8 h-3 bg-gradient-to-r from-[#5b7df7] to-[#b54784]'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white font-['Playfair_Display']">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
