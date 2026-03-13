interface MarqueeTextProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  variant?: 'primary' | 'dark' | 'accent';
}

const variantStyles = {
  primary: {
    bg: 'linear-gradient(90deg, #f0f4ff, #fdf0f6, #f0f4ff)',
    text: '#1a1a2e',
    dot: '#b54784',
  },
  dark: {
    bg: 'linear-gradient(90deg, #1a1a2e, #2a2a4e, #1a1a2e)',
    text: '#e8e8e8',
    dot: '#5b7df7',
  },
  accent: {
    bg: 'linear-gradient(90deg, #5b7df7, #8b4fc7, #b54784)',
    text: '#ffffff',
    dot: '#ffd700',
  },
};

export default function MarqueeText({
  items,
  direction = 'left',
  speed = 30,
  variant = 'primary',
}: MarqueeTextProps) {
  const doubled = [...items, ...items];
  const style = variantStyles[variant];

  return (
    <div
      className="relative overflow-hidden w-full py-4"
      style={{ background: style.bg }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 text-sm font-semibold shrink-0 tracking-wide"
            style={{ color: style.text }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: style.dot }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
