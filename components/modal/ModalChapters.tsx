import { IComicHistory, ILinkChapter } from "@types";
import { IconClose } from "components/icons";
import { CustomLink } from "components/link";
import { LocalStorage } from "constants/localStorage";
import { PATH } from "constants/path";
import { parseJson } from "hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import classNames from "utils/classNames";

interface ModalChaptersProps {
  isShow: boolean;
  toggleModal: () => void;
  chapters: ILinkChapter[];
}

const ModalChapters = ({ isShow, toggleModal, chapters }: ModalChaptersProps) => {
  const { query } = useRouter();
  const { id, slug } = query;
  const [history, setHistory] = useState<IComicHistory[]>([]);
  const [chaptersState, setChaptersState] = useState<ILinkChapter[]>(chapters);
  const [searchChapter, setSearchChapter] = useState("");
  const currentChapterInHistory = history.find((comic) => comic.slug == slug);
  useEffect(() => {
    setHistory(parseJson(localStorage.getItem(LocalStorage.history) || "[]"));
  }, []);
  useEffect(() => {
    setSearchChapter("");
  }, [isShow]);
  useEffect(() => {
    if (!searchChapter) {
      setChaptersState(chapters);
      return;
    }
    const newChaptersState = chapters.filter((chapter) =>
      chapter.title.split(" ")[1].includes(searchChapter)
    );
    setChaptersState(newChaptersState);
  }, [chapters, searchChapter]);
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={toggleModal}
      contentLabel="Danh sách chương"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <form className="flex items-center justify-between px-5 py-[14px]">
        <input
          type="text"
          placeholder="Nhập số chap, ví dụ: 100"
          className="px-3 py-[6px] rounded border border-[#ccc] w-[82%] h-9 bg-white text-base outline-none"
          onChange={(e) => setSearchChapter(e.target.value)}
        />
        <button onClick={toggleModal}>
          <IconClose />
        </button>
      </form>
      <div className="border-b flex-wrap border-t border-[#e5e5e5] px-5 pt-3 pb-4 flex gap-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {chaptersState.map((chapter) => {
          const current = chapter.id === id ? "text-[#fd0405] border-[#fd0405]" : "border-graydd";
          const hasSeen =
            currentChapterInHistory?.chapters?.includes(chapter.id) && "text-[#c0c0c0]";
          return (
            <CustomLink
              key={chapter.id}
              href={`${PATH.comic}/${chapter.href}`}
              className={classNames(
                `px-[5px] py-1 w-[105px] border font-light block text-center h-8`,
                current,
                hasSeen
              )}
              onClick={toggleModal}
            >
              {chapter.title}
            </CustomLink>
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
