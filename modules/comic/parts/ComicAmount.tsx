import { IconChat, IconEye, IconHeart } from "components/icons";

interface ComicAmountProps {
  view: string;
  comment: string;
  follow: string;
}

const ComicAmount = ({ view, comment, follow }: ComicAmountProps) => {
  return (
    <div className="absolute bottom-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay flex items-center justify-between px-1 gap-x-[2px]">
      <div className="flex items-center gap-x-[2px]">
        <IconEye />
        <span>{view}</span>
      </div>
      <div className="flex items-center gap-x-[2px]">
        <IconChat />
        <span>{comment}</span>
      </div>
      <div className="flex items-center gap-x-[2px]">
        <IconHeart />
        <span>{follow}</span>
      </div>
    </div>
  );
};

export default ComicAmount;
