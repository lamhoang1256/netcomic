/* eslint-disable react/jsx-no-useless-fragment */
import classNames from "utils/classNames";

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  children: React.ReactNode;
}

const Popover = ({ active, children, className }: PopoverProps) => {
  return (
    <>
      {active && (
        <div className={classNames("popover", className)}>
          <span className="popover-arrow" />
          <div className="popover-content">{children}</div>
        </div>
      )}
    </>
  );
};

export default Popover;
