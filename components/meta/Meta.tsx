import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const Meta = ({
  title = "Đọc truyện tranh online - Truyện gì cũng có - NetComic",
  description = "Bất cứ truyện bạn thích đều có và miễn phí tại NetComic, Web đọc truyện tranh online, không quảng cáo và cập nhật nhanh nhất",
  image = "https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png",
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default Meta;
