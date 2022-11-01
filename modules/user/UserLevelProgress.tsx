import { IconQuestion } from "components/icons";
import { ModalLevel } from "components/modal";
import useModal from "hooks/useModal";
import useGlobalStore from "store/global-store";
import { checkLevel } from "utils";

const UserLevelProgress = () => {
  const { currentUser } = useGlobalStore();
  const { isShow, toggleModal } = useModal();
  const { level, percent } = checkLevel(currentUser?.score || 0);
  return (
    <>
      <div className="flex items-end gap-x-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs">
            <span>Cấp {level}</span>
            <span>Cấp {level + 1}</span>
          </div>
          <div className="progress">
            <div className="progress-level" style={{ width: `${percent}%` }}>
              {percent}%
            </div>
          </div>
        </div>
        <button type="button" onClick={toggleModal}>
          <IconQuestion />
        </button>
      </div>
      <ModalLevel isShow={isShow} toggleModal={toggleModal} />
    </>
  );
};

export default UserLevelProgress;
