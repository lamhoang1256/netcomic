import { IconTime } from "components/icons";

interface ComicSuggestProps {
  posterUrl: string;
  slug: string;
  title: string;
  chapter: string;
  updatedAgo: string;
}

const ComicSuggest = ({ posterUrl, slug, title, chapter, updatedAgo }: ComicSuggestProps) => {
  return (
    <div className="max-w-[187px] relative">
      <picture>
        <source srcSet={posterUrl} type="image/webp" />
        <img alt={slug} src={posterUrl} />
      </picture>
      <div className="absolute bottom-0 left-0 right-0 p-[5px] text-white bg-overlay">
        <h3 className="line-clamp-1 text-[15px]">{title}</h3>
        <div className="flex items-center justify-center gap-[10px] mt-1">
          <span className="text-xs">{chapter}</span>
          <span className="flex items-center gap-[2px] text-[11px] italic">
            <IconTime className="text-white" /> {updatedAgo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComicSuggest;
