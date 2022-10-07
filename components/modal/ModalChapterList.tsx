import { IconClose } from "components/icons";
import Link from "next/link";
import Modal from "react-modal";

interface ModalChapterListProps {
  isShow: boolean;
  toggleModal: () => void;
}

const ModalChapterList = ({ isShow, toggleModal }: ModalChapterListProps) => {
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={toggleModal}
      contentLabel="Example Modal"
      className="max-w-[600px] w-full min-w-[300px] bg-[#f9f9f9] top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md shadow-modal"
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
      <div className="border-b border-t border-[#e5e5e5] px-5 pt-3 pb-4 flex gap-2">
        <Link href="/">
          <a className="text-[#fd0405] border-[#fd0405] px-[5px] py-1 w-[105px] border font-light block text-center">
            Chapter 120
          </a>
        </Link>
        <Link href="/">
          <a className="text-[#c0c0c0] border-graydd px-[5px] py-1 w-[105px] border font-light block text-center">
            Chapter 120
          </a>
        </Link>
        <Link href="/">
          <a className="border-graydd px-[5px] py-1 w-[105px] border font-light block text-center">
            Chapter 120
          </a>
        </Link>
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

export default ModalChapterList;
