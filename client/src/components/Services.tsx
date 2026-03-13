import { useEffect, useRef } from 'react';
import { Scissors, Palette, Sparkles, Wind, Crown, Heart } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Cắt Tạo Kiểu',
    description: 'Thiết kế kiểu tóc phù hợp với khuôn mặt và phong cách riêng của bạn.',
    price: 'Từ 150K',
  },
  {
    icon: Palette,
    title: 'Nhuộm Tóc',
    description: 'Công nghệ nhuộm Olaplex bảo vệ tóc, hơn 200 gam màu trendy.',
    price: 'Từ 500K',
  },
  {
    icon: Wind,
    title: 'Uốn & Duỗi',
    description: 'Uốn setting, uốn lạnh Nhật Bản, duỗi Keratin cao cấp.',
    price: 'Từ 600K',
  },
  {
    icon: Crown,
    title: 'Phục Hồi Tóc',
    description: 'Liệu trình phục hồi chuyên sâu cho tóc hư tổn, khô xơ.',
    price: 'Từ 400K',
  },
  {
    icon: Heart,
    title: 'Gội & Massage',
    description: 'Gội đầu dưỡng sinh kết hợp massage thư giãn toàn diện.',
    price: 'Từ 100K',
  },
  {
    icon: Sparkles,
    title: 'Tạo Kiểu Sự Kiện',
    description: 'Bới tóc cô dâu, makeup chuyên nghiệp cho mọi dịp đặc biệt.',
    price: 'Từ 800K',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[4px] text-[#5b7df7]">
            Dịch Vụ
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1a1a2e] mt-2">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Đa dạng dịch vụ chăm sóc tóc chuyên nghiệp với sản phẩm cao cấp nhập khẩu
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="service-card reveal group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-[#5b7df7]/10 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5b7df7]/5 to-[#b54784]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5b7df7]/10 to-[#b54784]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#5b7df7] group-hover:text-[#b54784] transition-colors duration-300" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a2e] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-block text-sm font-bold text-[#b54784]">
                    {service.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
