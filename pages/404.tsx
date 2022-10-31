import { Button } from "components/button";
import { Icon404 } from "components/icons";
import { Meta } from "components/meta";
import { PATH } from "constants/path";

const PageNotFound = () => {
  return (
    <>
      <Meta
        title="Không tìm thấy trang - NetComic"
        description="Trang của bạn đang truy cập không tồn tại hoặc đã bị xóa"
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <div className="flex flex-col items-center justify-center min-h-screen text-center gap-y-3">
        <Icon404 />
        <span className="text-2xl font-semibold">404 - Không tìm thấy trang</span>
        <h1 className="text-xl">
          Bạn đang truy cập một trang không tồn tại hoặc <br /> đã bị xoá/thay thế trong hệ thống
          NetComic
        </h1>
        <Button to={PATH.home} className="!px-6 text-base !py-[10px] mt-1 text-white bg-blue33">
          Về trang chủ
        </Button>
      </div>
    </>
  );
};

export default PageNotFound;
