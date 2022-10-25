import { DashboardSidebar } from "modules/dashboard";
import { HTMLAttributes } from "react";
import Header from "./Header";

interface LayoutDashboardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="px-5">
          <div className="flex flex-col gap-6 mt-8 lg:flex-row">
            <DashboardSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutDashboard;
