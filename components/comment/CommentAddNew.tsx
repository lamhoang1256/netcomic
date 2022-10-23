import { Button } from "components/button";
import { Heading } from "components/text";
import { Textarea } from "components/textarea";
import { commentStatus } from "constants/global";
import { defaultAvatar } from "constants/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "libs/firebase/firebase-config";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import { checkLevel } from "utils";

const CommentAddNew = ({ poster, title }: { poster: string; title: string }) => {
  const router = useRouter();
  const { id, slug } = router.query;
  const chapter = router.query.chapter as string;
  const { currentUser } = useGlobalStore();
  const { level } = checkLevel(currentUser?.score || 0);
  const [comment, setComment] = useState("");
  const handleAddNewComment = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }
    if (!comment) {
      toast.error("Vui lòng nhập nhận xét!");
      return;
    }
    try {
      const colRef = collection(db, "comments");
      await addDoc(colRef, {
        avatar: currentUser.photoURL || defaultAvatar,
        fullname: currentUser.fullname,
        content: comment,
        like: 0,
        unlike: 0,
        createdAt: serverTimestamp(),
        level,
        slug,
        status: commentStatus.APPROVED,
        chapterId: id ? id : "",
        chapterName: chapter ? `Chapter ${chapter.replace("chap-", "")}` : "",
        poster,
        title,
        userId: currentUser.uid,
      });
      toast.success("Thêm bình luận thành công!");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setComment("");
    }
  };

  return (
    <div className="mt-5">
      <Heading className="mb-2 text-lg">BÌNH LUẬN</Heading>
      <Textarea
        rows={3}
        value={comment}
        className="resize-none"
        onChange={(e) => setComment(e.target.value)}
        placeholder="Mời bạn thảo luận, hãy bình luận có văn hóa để tránh bị khóa tài khoản"
      />
      <Button className="bg-blue33 !py-[6px] text-white" onClick={handleAddNewComment}>
        Gửi bình luận
      </Button>
    </div>
  );
};

export default CommentAddNew;
