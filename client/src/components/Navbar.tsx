import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Scissors, ShoppingBag } from 'lucide-react';
import OrderDrawer from './OrderDrawer';

const navLinks = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Bài Viết', href: '/bai-viet' },
  { label: 'Dịch Vụ', href: '/#services' },
  { label: 'Liên Hệ', href: '/#contact' },
];

const CART_COUNT = 3;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Handle hash scrolling when navigating to /#services or /#contact
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      if (location.pathname === '/') {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0c1117]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5b7df7] to-[#b54784] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-['Playfair_Display'] text-xl font-bold text-white tracking-wide">
                SalonTóc
              </span>
              <span className="block text-[10px] text-gray-400 uppercase tracking-[3px] -mt-1">
                Hair Salon
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-gray-300 uppercase tracking-wider hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5b7df7] to-[#b54784] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <button className="text-gray-300 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <ShoppingBag className="w-5 h-5" />
              {CART_COUNT > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-[#e74c3c] to-[#b54784] flex items-center justify-center text-[10px] font-bold text-white shadow-md group-hover:scale-110 transition-transform">
                  {CART_COUNT}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setDrawerOpen(true)} className="relative text-white">
              <ShoppingBag className="w-5 h-5" />
              {CART_COUNT > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-[#e74c3c] to-[#b54784] flex items-center justify-center text-[10px] font-bold text-white">
                  {CART_COUNT}
                </span>
              )}
            </button>
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#0c1117]/95 backdrop-blur-md px-6 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block text-sm font-semibold text-gray-300 uppercase tracking-wider hover:text-white transition-colors"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setDrawerOpen(true); }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-wider hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Đơn Hàng ({CART_COUNT})
            </button>
          </div>
        </div>
      </nav>

      <OrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
