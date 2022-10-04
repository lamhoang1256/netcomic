import { Heading } from "components/text";
import { ComicHistory } from "modules/comic";
import Link from "next/link";

const HomeHistory = () => {
  return (
    <div className="border border-[#ddd] p-[10px] pb-0">
      <div className="flex items-center justify-between">
        <Heading className="text-base">Lịch sử đọc truyện</Heading>
        <Link href="/">
          <a className="text-[13px] italic font-medium">Xem tất cả</a>
        </Link>
      </div>
      <div className="mt-[10px]">
        <ComicHistory />
        <ComicHistory />
      </div>
    </div>
  );
};

export default HomeHistory;
