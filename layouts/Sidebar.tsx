import { Button } from "components/button";
import { IconList } from "components/icons";
import useClickOutside from "hooks/useClickOutside";
import { useRef } from "react";
import classNames from "utils/classNames";
import SidebarCloseAction from "./SidebarCloseAction";

interface SidebarProps {
  children: React.ReactNode;
  labelOpenSidebar?: string;
  className?: string;
}

const Sidebar = ({ children, labelOpenSidebar, className }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleSidebar = () => {
    if (sidebarRef.current) sidebarRef.current.classList.toggle("!translate-x-0");
    if (overlayRef.current) overlayRef.current.classList.toggle("fixed");
  };
  const closeSidebar = () => {
    if (sidebarRef.current) sidebarRef.current.classList.remove("!translate-x-0");
    if (overlayRef.current) overlayRef.current.classList.remove("fixed");
  };
  useClickOutside(sidebarRef, () => closeSidebar());
  return (
    <>
      <Button
        onClick={() => toggleSidebar()}
        className="flex items-center lg:hidden gap-x-2 max-w-fit"
      >
        <IconList />
        <span>{labelOpenSidebar}</span>
      </Button>
      <aside className={classNames("layout-sidebar", className)} ref={sidebarRef}>
        <SidebarCloseAction onCloseSidebar={toggleSidebar} />
        <div>{children}</div>
      </aside>
      <div
        aria-hidden
        ref={overlayRef}
        onClick={closeSidebar}
        className="inset-0 -m-3 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] z-[200]"
      />
    </>
  );
};

Sidebar.defaultProps = {
  labelOpenSidebar: "Mở sidebar",
  className: "lg:w-48",
};

export default Sidebar;
