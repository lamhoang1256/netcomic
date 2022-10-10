import { IconChevronLeft } from "components/icons";

interface SidebarCloseActionProps {
  onCloseSidebar: () => void;
}

const SidebarCloseAction = ({ onCloseSidebar }: SidebarCloseActionProps) => {
  return (
    <div
      aria-hidden="true"
      onClick={onCloseSidebar}
      className="flex items-center mb-5 cursor-pointer gap-x-2 lg:hidden"
    >
      <IconChevronLeft className="w-4 h-4" />
      <span className="text-base font-medium">Trở lại</span>
    </div>
  );
};

export default SidebarCloseAction;
