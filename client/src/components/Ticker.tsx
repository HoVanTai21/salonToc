import { Percent, Sparkles, Star, Gift, Heart, Scissors } from 'lucide-react';

const items = [
  { icon: Percent, text: 'Giảm giá 10% thuốc nhuộm tóc', color: '#e74c3c' },
  { icon: Scissors, text: 'Cắt tóc nam nữ chuyên nghiệp', color: '#3498db' },
  { icon: Star, text: 'Top 1 salon đánh giá 5 sao', color: '#f1c40f' },
  { icon: Gift, text: 'Tặng gói chăm sóc tóc khi đặt lịch online', color: '#2ecc71' },
  { icon: Heart, text: 'Sản phẩm nhập khẩu chính hãng', color: '#e91e8e' },
  { icon: Sparkles, text: 'Giảm giá 10% thuốc nhuộm tóc', color: '#9b59b6' },
];

export default function Ticker() {
  const doubledItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        background: 'linear-gradient(90deg, #1a6b4a, #2d8f6f, #1a6b4a, #8b2e6b, #b54784, #8b2e6b, #1a6b4a)',
        backgroundSize: '200% 100%',
      }}
    >
      <div
        className="flex whitespace-nowrap py-3"
        style={{
          animation: 'ticker 25s linear infinite',
        }}
      >
        {doubledItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-8 text-white font-medium text-sm shrink-0"
            >
              <Icon className="w-4 h-4" style={{ color: item.color }} />
              <span className="tracking-wide">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
