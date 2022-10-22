import { IComment } from "@types";
import { IconChat, IconLike, IconUnlike } from "components/icons";
import { Image } from "components/image";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex mt-3 gap-x-3 comment" comment-filter={comment.chapterId}>
      <div className="flex-shrink">
        <Image
          alt="avatar"
          src={comment?.avatar}
          className="object-cover w-12 h-12 mt-2 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-x-2">
          <span className="text-base font-semibold">{comment?.fullname}</span>
          <span className="text-xs px-[6px] py-[2px] border border-red-400 text-red-400 rounded">
            Cấp 3
          </span>
          {comment.chapterName && (
            <span className="text-[#3f94d5]">Chapter {comment.chapterName}</span>
          )}
        </div>
        <p className="my-[6px]">{comment?.content}</p>
        <div className="flex items-center gap-x-5">
          <button className="text-[#3f94d5] flex items-center gap-x-1">
            <IconChat className="w-4 h-4" fill="#3f94d5" />
            <span>Trả lời</span>
          </button>
          <button className="text-[#3f94d5] flex items-center gap-x-1">
            <IconLike fill="#3f94d5" />
            <span>{comment?.like}</span>
          </button>
          <button className="text-[#3f94d5] flex items-center gap-x-1">
            <IconUnlike fill="#3f94d5" />
            <span>{comment?.unlike}</span>
          </button>
          {/* <span className="text-xs italic text-[#999]">{comment?.createdAt}</span> */}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
