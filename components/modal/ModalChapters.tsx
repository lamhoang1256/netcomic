import { IComicHistory, ILinkChapter } from "@types";
import { IconClose } from "components/icons";
import { PATH } from "constants/path";
import Link from "next/link";
import Modal from "react-modal";
import classNames from "utils/classNames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseJson } from "hooks/useLocalStorage";
import { LocalStorage } from "constants/localStorage";

interface ModalChaptersProps {
  isShow: boolean;
  toggleModal: () => void;
  chapters: ILinkChapter[];
}

const ModalChapters = ({ isShow, toggleModal, chapters }: ModalChaptersProps) => {
  const { query } = useRouter();
  const { id, slug } = query;
  const [history, setHistory] = useState<IComicHistory[]>([]);
  const currentChapterInHistory = history.find((comic) => comic.slug == slug);
  useEffect(() => {
    setHistory(parseJson(localStorage.getItem(LocalStorage.history) || "[]"));
  }, []);
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={toggleModal}
      contentLabel="Example Modal"
      className="max-w-[600px] w-full outline-none min-w-[300px] bg-[#f9f9f9] top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md shadow-modal"
      overlayClassName="bg-black bg-opacity-40 fixed inset-0 z-[99] flex items-center justify-center cursor-pointer"
    >
      <form className="flex items-center justify-between px-5 py-[14px]">
        <input
          type="text"
          placeholder="Nhập số chap, ví dụ: 100"
          className="px-3 py-[6px] rounded border border-[#ccc] w-[82%] h-9 bg-white text-base outline-none"
        />
        <button onClick={toggleModal}>
          <IconClose />
        </button>
      </form>
      <div className="border-b flex-wrap border-t border-[#e5e5e5] px-5 pt-3 pb-4 flex gap-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {chapters.map((chapter) => {
          const current = chapter.id === id ? "text-[#fd0405] border-[#fd0405]" : "border-graydd";
          const hasSeen =
            currentChapterInHistory?.chapters?.includes(chapter.id) && "text-[#c0c0c0]";
          return (
            <Link href={`${PATH.comic}/${chapter.href}`} key={chapter.id}>
              <a
                className={classNames(
                  `px-[5px] py-1 w-[105px] border font-light block text-center h-8`,
                  current,
                  hasSeen
                )}
                onClick={toggleModal}
              >
                {chapter.title}
              </a>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-end px-5 py-[10px]">
        <button
          onClick={toggleModal}
          className="rounded px-3 py-[6px] bg-white border border-graydd"
        >
          Đóng
        </button>
      </div>
    </Modal>
  );
};

export default ModalChapters;
