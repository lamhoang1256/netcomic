import { IComment } from "@types";
import { IconChat, IconLike, IconUnlike } from "components/icons";
import { Image } from "components/image";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { auth, db } from "libs/firebase";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { checkTimeAgo } from "utils";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { currentUser } = useGlobalStore();
  const handleClickStatus = async (status: string) => {
    try {
      if (!auth.currentUser) return;
      const colRef = doc(db, "comments", comment.id);
      await updateDoc(colRef, { [status]: increment(1) });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  async function handleDeleteComment(commentId: string, userId: string) {
    if (!currentUser) return;
    const docRef = doc(db, "comments", commentId);
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa bình luận này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!"
    }).then(async (result) => {
      if (result.isConfirmed && currentUser.uid === userId) {
        try {
          await deleteDoc(docRef);
          toast.success("Bình luận đã được xóa!");
        } catch (error: any) {
          toast.error(error?.message);
        }
      }
    });
  }
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
            <span className="text-[#3f94d5] text-[13px]">{comment.chapterName}</span>
          )}
        </div>
        <p className="my-[6px]">{comment?.content}</p>
        <div className="flex items-center gap-x-5">
          <button
            onClick={() => handleDeleteComment(comment?.id, comment?.userId)}
            className="text-[#3f94d5] flex items-center gap-x-1"
          >
            <IconChat className="w-4 h-4" fill="#3f94d5" />
            <span>Xóa</span>
          </button>
          <button
            className="text-[#3f94d5] flex items-center gap-x-1"
            onClick={() => handleClickStatus("like")}
          >
            <IconLike fill="#3f94d5" />
            <span>{comment.like}</span>
          </button>
          <button
            className="text-[#3f94d5] flex items-center gap-x-1"
            onClick={() => handleClickStatus("unlike")}
          >
            <IconUnlike fill="#3f94d5" />
            <span>{comment.unlike}</span>
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
