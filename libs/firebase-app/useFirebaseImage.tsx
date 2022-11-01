import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { userRole } from "constants/global";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";

export default function useFirebaseImage(imageName?: string, callback?: () => void) {
  const { currentUser } = useGlobalStore();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const handleUploadImage = async (file: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytesResumable(storageRef, file);
    return await getDownloadURL(storageRef);
  };
  const handleDeleteImage = () => {
    if (currentUser?.role !== userRole.ADMIN) {
      toast.warning("Bạn không đủ quyền để thao tác!");
      return;
    }
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + imageName);
    deleteObject(imageRef)
      .then(() => {
        setImage("");
        setProgress(0);
        callback && callback();
      })
      .catch((error) => {
        setImage("");
      });
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    setImage,
    progress,
    handleResetUpload,
    handleUploadImage,
    handleDeleteImage,
  };
}
