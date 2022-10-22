import { Button } from "components/button";
import { Heading } from "components/text";
import { Textarea } from "components/textarea";
import { useState } from "react";

const CommentAddNew = () => {
  const [value, setValue] = useState("");
  const handleAddNewComment = () => {
    console.log("value: ", value);
  };
  return (
    <div className="mt-5">
      <Heading className="!text-base font-light mb-2">ĐÁNH GIÁ</Heading>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Mời bạn thảo luận, hãy bình luận có văn hóa để tránh bị khóa tài khoản"
      />
      <Button className="bg-blue33 !py-[6px] text-white" onClick={handleAddNewComment}>
        Gửi bình luận
      </Button>
    </div>
  );
};

export default CommentAddNew;
