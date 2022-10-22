import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classNames from "utils/classNames";

const CommentFilter = () => {
  const router = useRouter();
  const { id } = router.query;
  const [active, setActive] = useState("all");
  const handleFilterComment = (typeFilter: string) => {
    setActive(typeFilter);
    const comments = document.querySelectorAll<HTMLElement>(".comment");
    comments.forEach((comment) => {
      comment.style.display =
        comment.getAttribute("comment-filter") === typeFilter || typeFilter === "all"
          ? "flex"
          : "none";
    });
  };
  useEffect(() => {
    handleFilterComment("all");
  }, [id]);
  return (
    <div className="flex border-b gap-x-5 border-b-graydd">
      <FilterItem
        name="Tất cả"
        onClick={() => handleFilterComment("all")}
        active={active === "all"}
      ></FilterItem>
      <FilterItem
        name="Bình luận chap"
        onClick={() => handleFilterComment(id as string)}
        active={active === id}
      ></FilterItem>
    </div>
  );
};

interface FilterItemProps {
  name: string;
  onClick: () => void;
  active: boolean;
}

function FilterItem({ name, active, onClick }: FilterItemProps) {
  return (
    <div
      key={name}
      className={classNames(`py-3 cursor-pointer gap-x-2 text-base`, active && "text-blue33")}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default CommentFilter;
