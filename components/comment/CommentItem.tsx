import { IconChat, IconLike, IconUnlike } from "components/icons";
import { Image } from "components/image";
import { defaultAvatar } from "constants/image";

const CommentItem = () => {
  return (
    <div className="flex mt-3 gap-x-3">
      <div>
        <Image
          alt="avatar"
          src={defaultAvatar}
          className="object-cover w-12 h-12 mt-2 rounded-full"
        />
      </div>
      <div>
        <div>
          <span className="text-base font-semibold">Nguyen Hoang Lam</span>
          <span className="ml-2 text-xs inline-block px-[6px] py-[2px] border border-red-400 text-red-400 rounded">
            Cấp 3
          </span>
        </div>
        <p className="my-[6px]">Hết chap rồi vẫn không thấy hay !!!</p>
        <div className="flex items-center gap-x-5">
          <button className="text-[#3f94d5] flex items-center gap-x-1">
            <IconChat className="w-4 h-4" fill="#3f94d5" />
            <span>Trả lời</span>
          </button>
          <button className="text-[#3f94d5] flex items-center gap-x-1">
            <IconLike fill="#3f94d5" />
            <span>1</span>
          </button>
          <button className="text-[#3f94d5] flex items-center gap-x-1">
            <IconUnlike fill="#3f94d5" />
            <span>1</span>
          </button>
          <span className="text-xs italic text-[#999]">20 phút trước</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
