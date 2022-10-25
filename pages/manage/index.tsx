import { CheckAdmin } from "components/auth";
import { LayoutDashboard } from "layouts";

const UserManage = () => {
  return (
    <CheckAdmin>
      <LayoutDashboard title="Quản lý NetComic" desc="Quản lí tất cả thông tin tại NetComic">
        Dashboard Manage
      </LayoutDashboard>
    </CheckAdmin>
  );
};

export default UserManage;
