import { IComment } from "@types";
import { IconChat, IconLike, IconUnlike } from "components/icons";
import { Image } from "components/image";
import { checkTimeAgo } from "utils";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  console.log("comment: ", comment);
  return (
    <div className="flex mt-3 gap-x-3 comment" comment-filter={comment.chapterId}>
      <div className="flex-shrink">
        <Image
          alt="avatar"
          src={comment?.avatar}
          className="object-cover mt-2 rounded-full lg:w-12 w-9 h-9 lg:h-12"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-x-2">
          <span className="font-semibold lg:text-base">{comment?.fullname}</span>
          <span className="text-xs px-[6px] py-[2px] border border-red-400 text-red-400 rounded">
            Cấp {comment.level}
          </span>
          {comment.chapterName && (
            <span className="text-[#3f94d5] text-[13px]">Chapter {comment.chapterName}</span>
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
          <span className="text-xs italic text-[#999]">
            {checkTimeAgo((comment?.createdAt?.seconds as number) * 1000)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
