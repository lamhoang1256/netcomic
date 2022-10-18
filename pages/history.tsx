import { IComicHistory } from "@types";
import { IconClose } from "components/icons";
import { LocalStorage } from "constants/localStorage";
import { PATH } from "constants/path";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { ComicGrid, ComicImage, ComicTitle } from "modules/comic";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState<IComicHistory[]>([]);
  const handleRemoveHistory = (slug: string) => {
    const newHistory = history.filter((comic) => comic.slug !== slug);
    localStorage.setItem(LocalStorage.history, JSON.stringify(newHistory));
    setHistory(newHistory);
  };
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
  }, []);
  return (
    <>
      <Head>
        <title>Lịch sử xem - NetComic</title>
        <meta name="description" content="Lịch sử xem - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template
          title="Lịch sử xem"
          desc='Truyện chưa đọc sẽ hiển thị ở đầu danh sách, nhấn vào "Đã đọc" nếu truyện đọc rồi.'
        >
          <ComicGrid className="mt-4">
            {history?.map((comic: IComicHistory) => (
              <div key={comic.slug}>
                <div className="relative overflow-hidden rounded aspect-[2.2/3]">
                  <Link href={`${PATH.comic}/${comic.slug}`}>
                    <a>
                      <ComicImage src={comic.posterUrl} alt={comic.slug} />
                    </a>
                  </Link>
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
                <div className="flex-1 mt-1">
                  <Link href={`${PATH.comic}/${comic.slug}`}>
                    <ComicTitle>{comic.title}</ComicTitle>
                  </Link>
                  <Link href={`${PATH.comic}/${comic.chapterUrl}`}>
                    <a className="text-[13px] text-[#c0c0c0] mt-[2px] transition-all duration-200 hover:text-blue29 block">
                      Đọc tiếp {comic.chapterName}
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </ComicGrid>
        </Template>
      </LayoutUser>
    </>
  );
};

export default HistoryPage;
