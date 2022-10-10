import { UserSidebar } from "modules/user";
import Header from "./Header";
import { HTMLAttributes } from "react";

interface LayoutUserProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutUser = ({ children }: LayoutUserProps) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="layout-container">
          <div className="flex flex-col gap-6 mt-8 lg:flex-row">
            <UserSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutUser;
