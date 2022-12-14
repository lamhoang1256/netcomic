import { IComicHistory } from "@types";
import { IconClose } from "components/icons";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { PATH } from "constants/path";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { ComicGrid, ComicImage, ComicTitle } from "modules/comic";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";

const HistoryPage = () => {
  const { history, setHistory } = useGlobalStore();
  const handleRemoveHistory = (slug: string) => {
    const newHistory = history.filter((comic) => comic.slug !== slug);
    setHistory(newHistory);
    toast.success("Đã xóa khỏi lịch sử xem!");
  };
  return (
    <>
      <Meta title="Lịch sử đọc truyện - NetComic" description="Lịch sử các bộ truyện bạn đã đọc" />
      <LayoutUser>
        <Template title="Lịch sử xem" desc="Danh sách các bộ truyện bạn đã đọc">
          <ComicGrid className="mt-4">
            {history?.map((comic: IComicHistory) => (
              <div key={comic.slug}>
                <div className="relative border border-graydd overflow-hidden rounded aspect-[2.2/3]">
                  <CustomLink href={`${PATH.comic}/${comic.slug}`}>
                    <ComicImage src={comic.posterUrl} alt={comic.slug} />
                  </CustomLink>
                  <div className="absolute bottom-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay flex items-center justify-between md:px-2 gap-x-[2px]">
                    <button
                      onClick={() => handleRemoveHistory(comic.slug)}
                      className="flex items-center mx-auto gap-x-[2px] font-semibold"
                    >
                      <IconClose className="w-[18px] h-[18px]" fill="#fff" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
                <ComicTitle className="mt-1" href={`${PATH.comic}/${comic.slug}`}>
                  {comic.title}
                </ComicTitle>
                <CustomLink
                  href={`${PATH.comic}/${comic.chapterUrl}`}
                  className="text-[13px] text-[#c0c0c0] mt-[2px] transition-all duration-200 hover:text-blue29 block"
                >
                  Đọc tiếp {comic.chapterName}
                </CustomLink>
              </div>
            ))}
          </ComicGrid>
        </Template>
      </LayoutUser>
    </>
  );
};

export default HistoryPage;
