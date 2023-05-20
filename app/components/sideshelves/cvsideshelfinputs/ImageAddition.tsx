"use client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import React from "react";
import { BsCameraFill } from "react-icons/bs";

interface ImageAdditionProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  filePreview?:
    | string
    | React.Dispatch<React.SetStateAction<string | null>>
    | null;
}

const ImageAddition: React.FC<ImageAdditionProps> = ({
  register,
  id,
  }) => {
  let img = useCvSubSegments().theCurrentUser?.image
  // img = URL.createObjectURL(img as Blob)
  
  const [imagePreview, setImagePreview] = React.useState("");
  const placeholderPic =
    "https://via.placeholder.com/150/FFFFFF/000000/?text=add+picture";

  function validateImg(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event?.target.files) {
      return;
    } else {
      const imgDoc = event?.target.files[0];
      console.log(typeof(imgDoc))
      if (imgDoc.size >= 3048576) {
        return alert("Max file size is 3mb");
      } else {
        setImagePreview(URL.createObjectURL(imgDoc));
      }
    }
  }

  return (
    <div
      className={`ImageAddition z-7 bg-light-purple/20 mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
    >
      <div className="flex flex-col px-20">
        <p className=" avatarAdditionPrompt mt-2 text-deep-blue/70 font-bold text-base">
          Add a picture:
        </p>
        <div className="avatarAdditionSpace mt-2 mb-8 relative rounded-full bg-neutral-300 h-[110px] w-[110px] flex flex-col items-center content-center border-2 border-blue-purple/20">
          <img
            src={imagePreview || placeholderPic}
            alt="avatar placeholder"
            className="signup-profile-pic object-cover rounded-full h-[109px] w-[109px]"
          />
          <label htmlFor="image" className="absolute top-1 right-0">
            <span>
              <BsCameraFill size={26} style={{ color: "#492a68" }} />
            </span>
          </label>
          <input
            type="file"
            id={id}
            multiple
            hidden
            accept="image/*"
            {...register(id, {
              onChange: (e) => validateImg(e)
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageAddition;
