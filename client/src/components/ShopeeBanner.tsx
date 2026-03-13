import { ShoppingCart, ExternalLink } from 'lucide-react';

export default function ShopeeBanner() {
  return (
    <a
      href="https://shopee.vn/salontoc"
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl my-8"
    >
      <div
        className="relative flex items-center gap-6 px-8 py-6 md:px-10 md:py-8"
        style={{
          background: 'linear-gradient(135deg, #ee4d2d, #ff6633, #ee4d2d)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white/5" />

        {/* Icon */}
        <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <ShoppingCart className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <div className="relative z-10 flex-1 min-w-0">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-[3px] mb-1">
            Shop Chính Hãng
          </p>
          <h3 className="text-white text-xl md:text-2xl font-bold font-['Playfair_Display'] leading-tight">
            Mua sắm sản phẩm tóc trên Shopee
          </h3>
          <p className="text-white/70 text-sm mt-1 hidden md:block">
            Dầu gội, serum, thuốc nhuộm chính hãng — Giao hàng nhanh, giá tốt nhất
          </p>
        </div>

        {/* CTA */}
        <div className="relative z-10 shrink-0 hidden sm:flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#ee4d2d] font-bold text-sm group-hover:shadow-lg group-hover:shadow-black/20 transition-all duration-300">
          Mua ngay <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }}
      />
    </a>
  );
}
