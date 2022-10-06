import axios from "axios";
import { Heading } from "components/text";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicChartRanking } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { IComicInfo, IOptionChapter } from "types";

interface ComicDetailsPageProps {
  info: IComicInfo;
  chapters: IOptionChapter[];
}

const ComicDetailsPage = ({ info, chapters }: ComicDetailsPageProps) => {
  const [countChapters, setCountChapters] = useState(20);
  const handleShowAllChapter = () => {
    setCountChapters(chapters.length);
  };
  return (
    <>
      <Head>
        <title>
          {info.title} [Tới Chap {chapters[0].title}] Tiếng Việt
        </title>
        <meta name="description" content="Trang chi tiết truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <section className="bg-[#f9f9f9] layout-container">
          <div className="flex flex-col gap-6 pt-5 lg:flex-row">
            <div className="lg:w-2/3">
              <div className="text-center">
                <h1 className="text-[21px] font-semibold uppercase">{info?.title}</h1>
                <span className="inline-block mt-1 italic opacity-70">{info.updatedAt}</span>
              </div>
              <div className="md:flex gap-x-[15px] mt-5">
                <div className="md:w-[30%] mx-auto aspect-[2/3] w-[180px]">
                  <picture>
                    <source srcSet={info.posterUrl} type="image/webp" />
                    <img alt={info.title} src={info.posterUrl} className="object-cover rounded" />
                  </picture>
                </div>
                <ul className="md:w-[70%]">
                  <li className="flex mb-2 text-base">
                    <div className="w-1/3">Tác giả</div>
                    <div className="flex-1">{info.author}</div>
                  </li>
                  <li className="flex mb-2 text-base">
                    <div className="w-1/3">Tình trạng</div>
                    <div className="flex-1">{info.status}</div>
                  </li>
                  <li className="flex mb-2 text-base">
                    <div className="w-1/3">Thể loại</div>
                    <div className="flex flex-wrap flex-1 gap-x-2 gap-y-1">
                      {info.categories.split(" - ").map((category) => (
                        <Link href="/" key={category}>
                          <a className="transition-all duration-200 px-[6px] py-[2px] text-blue29 hover:text-redf6 border-blue29 hover:border-redf6 border rounded-[3px] text-sm">
                            {category}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </li>
                  <li className="flex mb-2 text-base">
                    <div className="w-1/3">Lượt xem</div>
                    <div className="flex-1">{info.viewCount}</div>
                  </li>
                  <li>
                    <Link href={`${PATH.comic}/${info.posterUrl}`}>
                      <a className="mr-2 transition-all duration-200 text-[#0073f4] hover:text-[#044aa4]">
                        {info.title}
                      </a>
                    </Link>
                    <span className="text-redf6">
                      Xếp hạng: {info.ratingValue}/5 - {info.ratingCount} Lượt đánh giá.
                    </span>
                  </li>
                  <li className="flex items-center mt-[10px] gap-x-2">
                    <button className="px-[14px] py-[6px] bg-[#5cb85c] hover:opacity-80 transition-all duration-200 text-white rounded">
                      Theo dõi
                    </button>
                    <span className="text-[15px]">
                      <b className="text-black">{info.followCount}</b> Lượt theo dõi
                    </span>
                  </li>
                  <li className="flex flex-wrap items-center mt-[10px] gap-1">
                    <button className="px-[14px] py-[6px] bg-[#ff6a3c] hover:opacity-80 transition-all duration-200 text-white rounded">
                      Đọc từ đầu
                    </button>
                    <button className="px-[14px] py-[6px] bg-[#f0ad4e] hover:opacity-80 transition-all duration-200 text-white rounded">
                      Đọc mới nhất
                    </button>
                    <button className="px-[14px] py-[6px] bg-[#0079f7] hover:opacity-80 transition-all duration-200 text-white rounded">
                      Thích
                    </button>
                    <button className="px-[14px] py-[6px] bg-[#dc3545] hover:opacity-80 transition-all duration-200 text-white rounded">
                      Đọc tiếp
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <Heading className="!text-base font-light border-b-2 border-b-blue29">
                  NỘI DUNG
                </Heading>
                <p className="mt-[10px]">{info.description}</p>
              </div>
              <div className="mt-5">
                <Heading className="!text-base font-light border-b-2 border-b-blue29">
                  DANH SÁCH CHƯƠNG
                </Heading>
                <div className="mt-4">
                  <div className="flex text-base font-semibold">
                    <span className="w-5/12 md:w-1/2">Số chương</span>
                    <span className="w-4/12 text-center md:w-1/4">Cập nhật</span>
                    <span className="w-3/12 text-center md:w-1/4">Lượt xem</span>
                  </div>
                  <ul className="border border-[#080808] pt-[6px] pr-[6px] pl-[10px] rounded mt-[10px] pb-4">
                    {chapters.slice(0, countChapters).map((chapter) => (
                      <li
                        className="py-[6px] flex border-b border-dotted border-[#bdbcbc5c]"
                        key={chapter.id}
                      >
                        <span className="w-5/12 md:w-1/2">{chapter.title}</span>
                        <span className="w-4/12 md:w-1/4 text-center italic text-[#c0c0c0]">
                          {chapter.updatedAt}
                        </span>
                        <span className="w-3/12 md:w-1/4 text-center italic text-[#c0c0c0]">
                          {chapter.viewCount}
                        </span>
                      </li>
                    ))}
                    <button
                      onClick={handleShowAllChapter}
                      className="w-full h-10 transition-all duration-200 border text-[#0073f4] border-graydd hover:text-purpleae"
                    >
                      Xem thêm
                    </button>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-1/3 gap-y-4">
              <ComicChartRanking />
            </div>
          </div>
        </section>
      </LayoutHome>
    </>
  );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { slug } = query;
  const { data } = (await axios.get(`${server}/api/comic/${slug}`)).data;
  return {
    props: {
      info: data.info,
      chapters: data.chapters,
    },
  };
}

export default ComicDetailsPage;
