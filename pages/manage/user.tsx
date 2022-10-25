import { IUser } from "@types";
import { ActionDelete, ActionEdit } from "components/action";
import { CheckAdmin } from "components/auth";
import { Image } from "components/image";
import { LabelStatus } from "components/label";
import { userRole } from "constants/global";
import { Unsubscribe } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { LayoutDashboard } from "layouts";
import { db } from "libs/firebase/firebase-config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import Swal from "sweetalert2";
import { checkLevel } from "utils";

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
      <LayoutDashboard>
        <div>
          <div className="flex items-center py-3 text-center font-semibold bg-[#f7f7f8] border border-gray-200 gap-x-5 whitespace-nowrap text-[15px] rounded-tl rounded-tr">
            <div className="w-[50px]">STT</div>
            <div className="w-1/4">Họ và tên</div>
            <div className="w-1/5">Email</div>
            <div className="w-[120px]">Giới tính</div>
            <div className="w-[120px]">Trạng thái</div>
            <div className="w-[120px]">Quyền</div>
            <div className="flex-1">Hành động</div>
          </div>
          {users.map((user, index) => (
            <div className="flex items-center mt-4 text-base gap-x-5" key={user.id}>
              <div className="w-[50px] text-center">{index + 1}</div>
              <div className="w-1/4">
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
                      {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-1/5 gap-x-3">{user.email}</div>
              <div className="text-center w-[120px]">{user.gender?.label}</div>
              <div className="text-center w-[120px]">
                <LabelStatus type="success">{user.status}</LabelStatus>
              </div>
              <div className="w-[120px] text-center">{user.role}</div>
              <div className="flex items-center justify-center flex-1 gap-x-2">
                <ActionEdit />
                {currentUser?.role === userRole.ADMIN && (
                  <ActionDelete onClick={() => handleDeleteUser(user.id)} />
                )}
              </div>
            </div>
          ))}
        </div>
      </LayoutDashboard>
    </CheckAdmin>
  );
};

export default UserManage;
