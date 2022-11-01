import { ICurrentUser } from "@types";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase-config";

export const sendLinkResetPassword = async (email: string) => {
  try {
    if (!email) return;
    await sendPasswordResetEmail(auth, email);
    toast.success("Đã gửi link reset password tới email!");
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export const handleUpdateUser = async (
  e: FormEvent<HTMLFormElement>,
  userId: string,
  values: any
) => {
  try {
    e.preventDefault();
    if (!userId) return;
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, { ...values });
    toast.success("Cập nhật thông tin thành công!");
  } catch (error) {
    toast.error("Cập nhật thông tin thất bại!");
  }
};

export const handleUpdateAvatar = async (
  e: ChangeEvent<HTMLInputElement>,
  userId: string,
  values: any,
  setValues: any
) => {
  try {
    const files = e.target.files;
    if (!files || !userId) return;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + files[0].name);
    await uploadBytesResumable(storageRef, files[0]);
    const newAvatar = await getDownloadURL(storageRef);
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, { avatar: newAvatar });
    toast.success("Cập nhật ảnh đại diện thành công!");
    setValues({ ...values, avatar: newAvatar });
  } catch (error) {
    console.log("error: ", error);
    toast.error("Cập nhật ảnh đại diện thất bại!");
  }
};
