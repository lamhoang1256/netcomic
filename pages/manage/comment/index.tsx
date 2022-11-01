import { IComment } from "@types";
import { ActionDelete } from "components/action";
import { CheckAdmin } from "components/auth";
import { Image } from "components/image";
import { LabelStatus } from "components/label";
import { CustomLink } from "components/link";
import { Table } from "components/table";
import { userRole } from "constants/global";
import { PATH } from "constants/path";
import { Unsubscribe } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { LayoutDashboard } from "layouts";
import { db } from "libs/firebase";
import { ComicTitle } from "modules/comic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { formatCreatedAt } from "utils";

const CommentManage = () => {
  const { currentUser } = useGlobalStore();
  const [comments, setComments] = useState<IComment[]>([]);
  const handleDeleteComment = async (commentId: string, userId: string) => {
    if (currentUser?.role !== userRole.ADMIN) return;
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
      if (!result.isConfirmed) return;
      try {
        await deleteDoc(docRef);
        toast.success("Bình luận đã được xóa!");
      } catch (error: any) {
        toast.error(error?.message);
      }
    });
  };
  useEffect(() => {
    let unSubscribe: Unsubscribe = () => {};
    async function getComments() {
      try {
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
  }, []);
  return (
    <CheckAdmin>
      <LayoutDashboard title="Quản lý bình luận" desc="Quản lí danh sách bình luận về truyện">
        <Table>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Người dùng</th>
                <th>Tên truyện</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Nội dung</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={comment.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <div className="flex-shrink-0">
                        <Image
                          alt="avatar"
                          src={comment?.avatar}
                          className="object-cover w-[44px] border border-graydd h-[44px] rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="block whitespace-nowrap">{comment?.fullname}</span>
                        <span className="text-xs px-[6px] py-[1px] border border-red-400 text-red-400 rounded inline-block mt-[2px] mr-2">
                          Cấp {comment.level}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="flex gap-x-3">
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
                  </td>
                  <td className="text-[13px] text-gray8a">
                    {formatCreatedAt((comment?.createdAt?.seconds as number) * 1000)}
                  </td>
                  <td className="text-sm">
                    <LabelStatus type="success">{comment.status}</LabelStatus>
                  </td>
                  <td>{comment.content}</td>
                  <td>
                    {currentUser?.role === userRole.ADMIN && (
                      <ActionDelete
                        onClick={() => handleDeleteComment(comment.id, comment.userId)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </LayoutDashboard>
    </CheckAdmin>
  );
};

export default CommentManage;
