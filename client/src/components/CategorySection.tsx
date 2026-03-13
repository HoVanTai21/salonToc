import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, Eye } from 'lucide-react';

interface Article {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
}

interface CategorySectionProps {
  icon: string;
  title: string;
  articles: Article[];
  bgColor?: string;
}

function FeaturedCard({ article }: { article: Article }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-[#5b7df7] transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-white/70 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ article }: { article: Article }) {
  return (
    <div className="group cursor-pointer flex gap-4 items-start">
      <div className="shrink-0 w-24 h-20 md:w-28 md:h-22 rounded-xl overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <h4 className="text-sm font-bold text-[#1a1a2e] group-hover:text-[#5b7df7] transition-colors duration-300 leading-snug line-clamp-2">
          {article.title}
        </h4>
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {article.views.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CategorySection({ icon, title, articles, bgColor = 'bg-white' }: CategorySectionProps) {
  const [featured, ...rest] = articles;

  return (
    <section className={`py-14 px-6 ${bgColor}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#1a1a2e]">
              {title}
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#5b7df7] hover:text-[#b54784] transition-colors duration-300"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grid: 1 featured + 4 small */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Featured large */}
          <FeaturedCard article={featured} />

          {/* Right: 4 small cards stacked */}
          <div className="flex flex-col gap-5 justify-between">
            {rest.slice(0, 4).map((article) => (
              <SmallCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center lg:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#5b7df7] text-[#5b7df7] font-semibold text-sm hover:bg-[#5b7df7] hover:text-white transition-all duration-300"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
