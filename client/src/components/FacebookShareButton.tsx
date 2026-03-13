interface FacebookShareButtonProps {
  url?: string;
  title?: string;
}

export default function FacebookShareButton({ url, title }: FacebookShareButtonProps) {
  const shareUrl = url || window.location.href;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title || '')}`;
    window.open(fbUrl, '_blank', 'width=600,height=400,scrollbars=yes');
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-300 hover:opacity-80 border border-[#1877F2]/30 text-[#1877F2] bg-[#1877F2]/5 hover:bg-[#1877F2]/10"
      title="Chia sẻ lên Facebook"
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      Chia sẻ
    </button>
  );
}
