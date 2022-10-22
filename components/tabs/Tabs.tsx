import { HTMLAttributes, useState } from "react";
import classNames from "utils/classNames";
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: { name: string; content: React.ReactNode }[];
}

const Tabs = ({ tabs = [], ...props }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activateTab = (index: number) => {
    setActiveTabIndex(index);
  };
  return (
    <div {...props}>
      <div className="flex items-center border-b border-b-graydd">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={classNames(
              "py-2 px-4 border-b-2 duration-200 transition-all",
              index === activeTabIndex ? "text-blue33 border-b-blue33" : "border-b-transparent"
            )}
            onClick={() => activateTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div>{tabs[activeTabIndex].content}</div>
    </div>
  );
};

export default Tabs;
