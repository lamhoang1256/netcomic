import { Heading } from "components/text";
import { ComicFollow } from "modules/comic";
import Link from "next/link";

const HomeFollow = () => {
  return (
    <div className="border border-[#ddd] p-[10px] pb-0">
      <div className="flex items-center justify-between">
        <Heading className="text-base">Truyện đang theo dõi</Heading>
        <Link href="/">
          <a className="text-[13px] italic font-medium">Xem tất cả</a>
        </Link>
      </div>
      <div className="mt-[10px]">
        <ComicFollow />
        <ComicFollow />
      </div>
    </div>
  );
};

export default HomeFollow;
