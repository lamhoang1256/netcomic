import { IComment } from "@types";
import { ProtectedRoute } from "components/auth";
import { Image } from "components/image";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { Table } from "components/table";
import { PATH } from "constants/path";
import { Unsubscribe } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { db } from "libs/firebase/firebase-config";
import { ComicTitle } from "modules/comic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { checkTimeAgo } from "utils";

const CommentPage = () => {
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
    let unSubscribe: Unsubscribe;
    async function getComments() {
      try {
        if (!currentUser) return;
        const colRef = collection(db, "comments");
        const queryRef = query(colRef, where("userId", "==", currentUser.uid));
        unSubscribe = onSnapshot(queryRef, (snapshot) => {
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
    <>
      <Meta
        title="Bình luận của tôi - NetComic"
        description="Danh sách bình luận của tôi tại NetComic"
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <ProtectedRoute>
        <LayoutUser>
          <Template title="Bình luận của tôi" desc="Danh sách bình luận của bạn">
            {comments?.length > 0 ? (
              <Table className="mt-4">
                <table>
                  <thead>
                    <tr>
                      <th>Tên truyện</th>
                      <th>Thời gian</th>
                      <th>Nội dung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((comment) => (
                      <tr key={comment.id}>
                        <td className="flex gap-x-3">
                          <CustomLink
                            href={`${PATH.comic}/${comment.slug}`}
                            className=" w-12 h-12 md:w-[60px] md:h-[60px] flex-grow-0"
                          >
                            <Image
                              alt={comment.slug}
                              src={comment.poster}
                              className="border border-[#eee] w-12 h-12 md:w-[60px] object-cover object-top md:h-[60px] rounded"
                            />
                          </CustomLink>
                          <div className="flex-1">
                            <ComicTitle
                              className="!text-sm line-clamp-none mb-1"
                              href={`${PATH.comic}/${comment.slug}`}
                            >
                              {comment.title}
                            </ComicTitle>
                            <button
                              className="inline-block text-rede5"
                              onClick={() => handleDeleteComment(comment.id, comment.userId)}
                            >
                              Xóa bình luận
                            </button>
                            <span className="inline-block ml-3 italic text-blue33">
                              {comment.chapterName}
                            </span>
                          </div>
                        </td>
                        <td className="italic text-[13px] text-gray8a w-14 md:w-[88px]">
                          {checkTimeAgo((comment.createdAt?.seconds as number) * 1000)}
                        </td>
                        <td className="flex-1">{comment.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Table>
            ) : (
              <div className="mt-3">Chưa có bình luận</div>
            )}
          </Template>
        </LayoutUser>
      </ProtectedRoute>
    </>
  );
};

export default CommentPage;
