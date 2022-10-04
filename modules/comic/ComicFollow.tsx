import Link from "next/link";

const ComicFollow = () => {
  return (
    <div className="flex gap-x-[10px] items-center py-[10px] border-t border-[#dedede]">
      <Link href="/">
        <a>
          <picture>
            <source
              srcSet="https://st.ntcdntempv3.com/data/comics/234/dai-tieu-thu-co-y-do-gi-xau-dau.jpg"
              type="image/webp"
            />
            <img
              alt=""
              src="https://st.ntcdntempv3.com/data/comics/234/dai-tieu-thu-co-y-do-gi-xau-dau.jpg"
              className="w-[70px] h-[60px] object-cover object-top"
            />
          </picture>
        </a>
      </Link>
      <div>
        <h3 className="transition-all duration-200 line-clamp-1 hover:text-blue29">
          Đại Tiểu Thư Có Ý Đồ Gì Xấu Đâu
        </h3>
        <div className="flex items-center justify-between my-1">
          <span className="text-[13px]">Chapter 11</span>
          <span className="text-[11px] text-[#c0c0c0] italic">1 giờ trước</span>
        </div>
        <span className="text-[13px] text-[#666] italic transition-all duration-200 hover:text-purpleae">
          Đọc tiếp Chapter 11
        </span>
      </div>
    </div>
  );
};

export default ComicFollow;
