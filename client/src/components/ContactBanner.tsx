import { Mail, MapPin, ArrowRight } from 'lucide-react';

export default function ContactBanner() {
  return (
    <section id="contact" className="px-6 py-12">
      <div
        className="max-w-7xl mx-auto rounded-3xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{
          background: 'linear-gradient(135deg, #5b7df7, #8b4fc7, #b54784)',
        }}
      >
        <div>
          <h3 className="text-white font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-4">
            Liên hệ hợp tác với SalonTóc
          </h3>
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contact@salontoc.vn
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              123 Nguyễn Huệ, Quận 1, TP.HCM
            </span>
          </div>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#b54784] font-bold text-base hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10 shrink-0"
        >
          Liên hệ ngay <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
