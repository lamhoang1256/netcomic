import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase-config";

export const sendLinkResetPassword = async (email: string) => {
  try {
    if (!email) return;
    await sendPasswordResetEmail(auth, email);
    toast.success("Đã gửi link reset password tới email!");
  } catch (error: any) {
    toast.error(error?.message);
  }
};
