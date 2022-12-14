import { IComicInfo, ILinkChapter } from "@types";
import axios from "axios";
import { Button } from "components/button";
import { CommentAddNew, CommentList } from "components/comment";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { Heading } from "components/text";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicChartRanking } from "modules/comic";
import { GetStaticPaths, GetStaticPropsContext } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useGlobalStore from "store/global-store";
import classNames from "utils/classNames";

interface ComicDetailsPageProps {
  info: IComicInfo;
  chapters: ILinkChapter[];
}

const ComicDetailsPage = ({ info, chapters }: ComicDetailsPageProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const { history, follows, addFollow, removeFollow } = useGlobalStore();
  const hasFollowed = follows.some((comic) => comic === slug);
  const [countChapters, setCountChapters] = useState(20);
  const currentChapterInHistory = history.find((comic) => comic.slug == slug);
  const handleShowAllChapter = () => {
    setCountChapters(chapters.length);
  };
  const handleToggleFollow = () => {
    hasFollowed ? removeFollow(slug as string) : addFollow(slug as string);
  };
  return (
    <>
      <Meta
        title={`${info.title} [Tới Chap ${chapters[0].title}] Tiếng Việt`}
        description={`Đọc truyện tranh ${info.title} Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại NetComic`}
        image={info.posterUrl}
      />
      <LayoutHome>
        <section className="layout-container">
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
                      {info.categories.map((category) => (
                        <CustomLink
                          href={`${PATH.search}/${category.href}`}
                          key={category.href}
                          className="transition-all duration-200 px-[6px] py-[2px] text-blue29 hover:text-redf6 dark:text-blue1c dark:border-blue29 border-blue29 hover:border-redf6 border rounded-[3px] text-sm dark:hover:border-yellowffc dark:hover:text-yellowffc"
                        >
                          {category.display}
                        </CustomLink>
                      ))}
                    </div>
                  </li>
                  <li className="flex mb-2 text-base">
                    <div className="w-1/3">Lượt xem</div>
                    <div className="flex-1">{info.viewCount}</div>
                  </li>
                  <li>
                    <CustomLink
                      href={`${PATH.comic}/${info.slug}`}
                      className="mr-2 transition-all duration-200 text-[#0073f4] hover:text-[#044aa4]"
                    >
                      {info.title}
                    </CustomLink>
                    <span className="text-redf6">
                      Xếp hạng: {info.ratingValue}/5 - {info.ratingCount} Lượt đánh giá.
                    </span>
                  </li>
                  <li className="flex items-center mt-[10px] gap-x-2">
                    <button
                      className="px-[14px] py-[6px] bg-[#5cb85c] hover:opacity-80 transition-all duration-200 text-white rounded"
                      onClick={handleToggleFollow}
                    >
                      {hasFollowed ? "Đã theo dõi" : "Theo dõi"}
                    </button>
                    <span className="text-[15px]">
                      <b>{info.followCount}</b> Lượt theo dõi
                    </span>
                  </li>
                  <li className="flex flex-wrap items-center mt-[10px] gap-1">
                    <Button
                      to={`${PATH.comic}/${chapters[chapters.length - 1].href}`}
                      className="bg-[#ff6a3c] !py-[6px] text-white"
                    >
                      Đọc từ đầu
                    </Button>
                    <Button
                      to={`${PATH.comic}/${chapters[0].href}`}
                      className="bg-[#f0ad4e] !py-[6px] text-white"
                    >
                      Đọc mới nhất
                    </Button>
                    {currentChapterInHistory && (
                      <Button
                        to={currentChapterInHistory.chapterUrl}
                        className="bg-[#dc3545] !py-[6px] text-white"
                      >
                        Đọc tiếp
                      </Button>
                    )}
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
                  <ul className="border border-[#080808] dark:border-graydd pt-[6px] pr-[6px] pl-[10px] rounded mt-[10px] pb-4">
                    {chapters.slice(0, countChapters).map((chapter) => (
                      <li
                        className={classNames(
                          "py-[6px] flex border-b border-dotted border-[#bdbcbc5c]",
                          currentChapterInHistory?.chapters?.includes(chapter.id) &&
                            "text-[#c0c0c0]"
                        )}
                        key={chapter.id}
                      >
                        <Link href={`${PATH.comic}/${chapter.href}`}>
                          <a className="w-5/12 md:w-1/2">{chapter.title}</a>
                        </Link>
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
              <CommentAddNew poster={info.posterUrl} title={info.title} />
              <CommentList />
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.slug as string;
  try {
    const { info, chapters } = (await axios.get(`${server}/api/comic/${slug}`)).data.data;
    return {
      props: { info, chapters },
      revalidate: 300
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: true
    };
  }
};

export default ComicDetailsPage;
