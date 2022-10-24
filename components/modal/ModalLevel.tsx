import { IconClose } from "components/icons";
import Modal from "react-modal";

interface ModalLevelProps {
  isShow: boolean;
  toggleModal: () => void;
}

const ModalLevel = ({ isShow, toggleModal }: ModalLevelProps) => {
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={toggleModal}
      contentLabel="Bảng cấp độ"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="p-5">
        <div className="flex items-center justify-between pb-3 border-b border-graydd">
          <h4 className="text-base font-semibold">Bảng cấp độ</h4>
          <button onClick={toggleModal}>
            <IconClose className="!w-5 !h-5" />
          </button>
        </div>
        <div className="mt-3 text-[15px]">
          <p className="my-2">Cấp độ 1 : 0 - 9 chap</p>
          <p className="my-2">Cấp độ 2 : 10 - 99 chap</p>
          <p className="my-2">Cấp độ 3 : 100 - 999 chap</p>
          <p className="my-2">Cấp độ 4 : 1000 - 9999 chap</p>
          <p className="my-2">Cấp độ 5 : 10000 - 99999 chap</p>
          <p className="my-2">Cấp độ 6 : 100000 - 999999 chap</p>
          <p className="my-2">Cấp độ 7 : 1000000 - 9999999 chap</p>
          <p className="my-2">Cấp độ 8 : 10000000 - 99999999 chap</p>
          <p className="my-2">Cấp độ 9 : 100000000 - 999999999 chap</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLevel;
