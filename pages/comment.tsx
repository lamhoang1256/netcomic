import { IComment } from "@types";
import { ProtectedRoute } from "components/auth";
import { Image } from "components/image";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { db } from "libs/firebase/firebase-config";
import { ComicTitle } from "modules/comic";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { checkTimeAgo } from "utils";

const CommentPage = () => {
  const { currentUser } = useGlobalStore();
  const [comments, setComments] = useState<IComment[]>([]);
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
  }
  useEffect(() => {
    async function getComments() {
      try {
        if (!currentUser) return;
        const colRef = collection(db, "comments");
        const queryRef = query(colRef, where("userId", "==", currentUser.uid));
        const unSubscribe = onSnapshot(queryRef, (snapshot) => {
          const results: IComment[] = [];
          snapshot.forEach((doc: any) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setComments(results);
        });
        return unSubscribe;
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    return () => {
      getComments();
    };
  }, [currentUser]);
  return (
    <ProtectedRoute>
      <Head>
        <title>Bình luận của tôi - NetComic</title>
        <meta name="description" content="Bình luận của tôi - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template title="Bình luận của tôi" desc="Danh sách bình luận của bạn">
          {comments?.length > 0 ? (
            <div className="mt-4">
              <div className="flex items-center py-3 text-center gap-x-1 font-semibold bg-[#f7f7f8] md:gap-x-3 whitespace-nowrap md:text-[15px] rounded-tl rounded-tr">
                <div className="w-1/2 md:w-2/5">Tên truyện</div>
                <div className="w-14 md:w-20">Thời gian</div>
                <div className="flex-1">Nội dung</div>
              </div>
              {comments.map((comment) => (
                <div className="flex mt-4 gap-x-1 md:gap-x-3" key={comment.id}>
                  <div className="flex w-1/2 md:w-2/5 gap-x-2 md:gap-x-3">
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
                  </div>
                  <div className="italic text-[13px] text-gray8a w-14 md:w-20">
                    {checkTimeAgo((comment.createdAt?.seconds as number) * 1000)}
                  </div>
                  <div className="flex-1">{comment.content}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3">Chưa có bình luận</div>
          )}
        </Template>
      </LayoutUser>
    </ProtectedRoute>
  );
};

export default CommentPage;
