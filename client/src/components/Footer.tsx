import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

const mainLinks = [
  { label: 'Giới thiệu', href: '/' },
  { label: 'Bài viết', href: '/bai-viet' },
  { label: 'Chính sách bảo mật', href: '/' },
  { label: 'Điều khoản sử dụng', href: '/' },
];

const serviceLinks = [
  { label: 'Cắt tạo kiểu', href: '/#services' },
  { label: 'Nhuộm tóc', href: '/#services' },
  { label: 'Uốn & Duỗi', href: '/#services' },
  { label: 'Phục hồi tóc', href: '/#services' },
];

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5b7df7] to-[#b54784] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a2e]">
                SalonTóc
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              SalonTóc là trang web chia sẻ kiến thức, xu hướng tóc và kết nối khách hàng
              với dịch vụ salon chuyên nghiệp hàng đầu.
            </p>
            <div className="flex items-center gap-3">
              {['Facebook', 'TikTok', 'Instagram', 'Youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gradient-to-r hover:from-[#5b7df7] hover:to-[#b54784] hover:text-white transition-all duration-300 text-xs font-bold uppercase"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Main Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a2e] mb-4">
              Trang chính
            </h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-500 text-sm hover:text-[#5b7df7] transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-[#b54784]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a2e] mb-4">
              Dịch vụ
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-500 text-sm hover:text-[#5b7df7] transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-[#b54784]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a2e] mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>• contact@salontoc.vn</li>
              <li>• 0123 456 789</li>
              <li>• 123 Nguyễn Huệ, Quận 1, TP.HCM</li>
              <li>• Giờ mở cửa: 8:00 - 20:00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            © 2025 SalonTóc. All rights reserved.
          </span>
          <span className="text-xs text-gray-400">
            Made with ❤️ in Việt Nam
          </span>
        </div>
      </div>
    </footer>
  );
}
