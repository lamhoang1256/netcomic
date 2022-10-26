import { IUser } from "@types";
import { ActionDelete, ActionEdit } from "components/action";
import { CheckAdmin } from "components/auth";
import { Image } from "components/image";
import { LabelStatus } from "components/label";
import { CustomLink } from "components/link";
import { Table } from "components/table";
import { userRole } from "constants/global";
import { PATH } from "constants/path";
import { Unsubscribe } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { LayoutDashboard } from "layouts";
import { db } from "libs/firebase/firebase-config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { checkLevel, formatCreatedAt } from "utils";

const UserManage = () => {
  const { currentUser } = useGlobalStore();
  const [users, setUsers] = useState<IUser[]>([]);
  const handleDeleteUser = async (userId: string) => {
    if (!currentUser) return;
    if (currentUser.role !== userRole.ADMIN) return;
    const docRef = doc(db, "users", userId);
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa user này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(docRef);
          toast.success("User đã được xóa!");
        } catch (error: any) {
          toast.error(error?.message);
        }
      }
    });
  };
  useEffect(() => {
    let unSubscribe: Unsubscribe = () => {};
    async function getUsers() {
      try {
        const colRef = collection(db, "users");
        unSubscribe = onSnapshot(colRef, (snapshot) => {
          const results: any[] = [];
          snapshot.forEach((doc: any) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setUsers(results);
        });
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    getUsers();
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <CheckAdmin>
      <LayoutDashboard
        title="Quản lý người dùng"
        desc="Quản lí tất cả người dùng đã đăng nhập NetComic"
      >
        <Table>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Trạng thái</th>
                <th>Quyền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <div className="flex-shrink">
                        <Image
                          alt="avatar"
                          src={user?.avatar}
                          className="object-cover w-[44px] border border-graydd h-[44px] rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="block">{user?.fullname || "User"}</span>
                        <span className="text-xs px-[6px] py-[1px] border border-red-400 text-red-400 rounded inline-block mt-[2px] mr-2">
                          Cấp {checkLevel(user?.score).level}
                        </span>
                        <span className="text-sm">
                          {formatCreatedAt((user?.createdAt?.seconds as number) * 1000)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <LabelStatus type="success">{user.status}</LabelStatus>
                  </td>
                  <td>{user.role}</td>
                  <td className="flex items-center gap-x-2">
                    <CustomLink href={`${PATH.userManage}/${user.id}`}>
                      <ActionEdit />
                    </CustomLink>
                    {currentUser?.role === userRole.ADMIN && (
                      <ActionDelete onClick={() => handleDeleteUser(user.id)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </LayoutDashboard>
    </CheckAdmin>
  );
};

export default UserManage;
