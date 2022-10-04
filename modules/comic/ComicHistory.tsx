import Link from "next/link";

const ComicHistory = () => {
  return (
    <div className=" flex gap-x-[10px] items-center py-[10px] border-t border-[#dedede]">
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
          <span className="text-[13px] italic transition-all duration-100 hover:text-blue29 text-[#c0c0c0]">
            Đọc tiếp Chapter 11
          </span>
          <span className="text-[11px] text-[#c0c0c0] italic">Xóa</span>
        </div>
      </div>
    </div>
  );
};

export default ComicHistory;
