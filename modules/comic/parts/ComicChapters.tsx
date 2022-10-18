import { IComicChapters } from "@types";
import ComicTitle from "./ComicTitle";

interface ComicChaptersProps {
  chapters: IComicChapters[];
}

const ComicChapters = ({ chapters }: ComicChaptersProps) => {
  return (
    <>
      {chapters?.map((chapter, index) => (
        <div className="flex items-center justify-between mt-[2px]" key={index}>
          <ComicTitle className="!text-[13px]" href={chapter.href}>
            {chapter.name}
          </ComicTitle>
          <span className="text-[11px] text-[#c0c0c0] italic">{chapter.updatedAgo}</span>
        </div>
      ))}
    </>
  );
};

export default ComicChapters;
