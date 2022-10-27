import { IComicChapters, IComicHistory } from "@types";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import classNames from "utils/classNames";

interface ComicChaptersProps {
  chapters: IComicChapters[];
  comicInHistory?: IComicHistory;
}

const ComicChapters = ({ chapters, comicInHistory }: ComicChaptersProps) => {
  return (
    <>
      {chapters?.map((chapter) => {
        const hasSeen = comicInHistory?.chapters?.includes(chapter.id);
        return (
          <div className="flex items-center justify-between mt-[2px]" key={chapter.id}>
            <CustomLink
              href={`${PATH.comic}/${chapter.href}`}
              className={classNames(
                `text-[13px] transition-all duration-200 hover:text-blue29`,
                hasSeen && "!text-[#c0c0c0]"
              )}
            >
              {chapter.name}
            </CustomLink>
            <span className="text-[11px] text-[#c0c0c0] italic">{chapter.updatedAgo}</span>
          </div>
        );
      })}
    </>
  );
};

export default ComicChapters;
