import { IComment } from "@types";
import { ActionDelete } from "components/action";
import { CheckAdmin } from "components/auth";
import { Image } from "components/image";
import { LabelStatus } from "components/label";
import { CustomLink } from "components/link";
import { userRole } from "constants/global";
import { PATH } from "constants/path";
import { Unsubscribe } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { LayoutDashboard } from "layouts";
import { db } from "libs/firebase/firebase-config";
import { ComicTitle } from "modules/comic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { checkTimeAgo } from "utils";

const CommentManage = () => {
  const { currentUser } = useGlobalStore();
  const [comments, setComments] = useState<IComment[]>([]);
  const handleDeleteComment = async (commentId: string, userId: string) => {
    if (!currentUser) return;
    const docRef = doc(db, "comments", commentId);
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa bình luận này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
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
  };
  useEffect(() => {
    let unSubscribe: Unsubscribe = () => {};
    async function getComments() {
      try {
        if (!currentUser) return;
        const colRef = collection(db, "comments");
        unSubscribe = onSnapshot(colRef, (snapshot) => {
          const results: IComment[] = [];
          snapshot.forEach((doc: any) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setComments(results);
        });
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    getComments();
    return () => {
      unSubscribe();
    };
  }, [currentUser]);
  return (
    <CheckAdmin>
      <LayoutDashboard>
        <div>
          <div className="flex items-center py-3 text-center font-semibold bg-[#f7f7f8] border border-gray-200 gap-x-5 whitespace-nowrap text-[15px] rounded-tl rounded-tr">
            <div className="w-1/5">Người dùng</div>
            <div className="w-1/5">Tên truyện</div>
            <div className="w-[100px]">Thời gian</div>
            <div className="w-[120px]">Trạng thái</div>
            <div className="flex-1">Nội dung</div>
            <div className="w-28">Xóa</div>
          </div>
          {comments.map((comment) => (
            <div className="flex items-center mt-4 text-base gap-x-5" key={comment.id}>
              <div className="w-1/5">
                <div className="flex items-center gap-x-3">
                  <div className="flex-shrink">
                    <Image
                      alt="avatar"
                      src={comment?.avatar}
                      className="object-cover w-[44px] border border-graydd h-[44px] rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="block">{comment?.fullname}</span>
                    <span className="text-xs px-[6px] py-[1px] border border-red-400 text-red-400 rounded inline-block mt-[2px] mr-2">
                      Cấp {comment.level}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-1/5 gap-x-3">
                <CustomLink
                  href={`${PATH.comic}/${comment.slug}`}
                  className="flex-grow-0 w-12 h-12"
                >
                  <Image
                    alt={comment.slug}
                    src={comment.poster}
                    className="border border-[#eee] w-12 h-12 object-cover object-top rounded"
                  />
                </CustomLink>
                <div className="flex-1">
                  <ComicTitle
                    className="!text-sm line-clamp-none"
                    href={`${PATH.comic}/${comment.slug}`}
                  >
                    {comment.title}
                  </ComicTitle>
                  <span className="text-sm italic text-blue33">{comment.chapterName}</span>
                </div>
              </div>
              <div className="italic text-center text-[13px] text-gray8a w-[100px]">
                {new Date((comment?.createdAt?.seconds as number) * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </div>
              <div className="w-[120px] text-sm text-center">
                <LabelStatus type="success">{comment.status}</LabelStatus>
              </div>
              <div className="flex-1">{comment.content}</div>
              <div className="flex justify-center w-28">
                {currentUser?.role === userRole.ADMIN && (
                  <ActionDelete onClick={() => handleDeleteComment(comment.id, comment.userId)} />
                )}
              </div>
            </div>
          ))}
        </div>
      </LayoutDashboard>
    </CheckAdmin>
  );
};

export default CommentManage;
