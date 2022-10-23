import { IComment } from "@types";
import { commentStatus } from "constants/global";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "libs/firebase/firebase-config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const router = useRouter();
  const [comments, setComments] = useState<IComment[]>([]);
  const { slug } = router.query;
  useEffect(() => {
    async function getComments() {
      try {
        if (!slug) return;
        const colRef = collection(db, "comments");
        const queryRef = query(
          colRef,
          where("status", "!=", commentStatus.BANNED),
          where("slug", "==", slug)
        );
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
  }, [slug]);
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
