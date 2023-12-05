"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface RegFormProps {
  buttonLabel?: string;
  buttonColor?: string;
  justifyState?: string;
}

const RegForm: React.FC<RegFormProps> = ({
  buttonLabel,
  buttonColor,
  justifyState,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [regData, setRegData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    // Update the 'name' property of the message chunk
    setRegData((prevChunk: typeof regData) => {
      return { ...prevChunk, [name]: value };
    });
  };

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = JSON.stringify(regData);

    axios
      .post("/api/register", data)
      .then(
        (res: AxiosResponse<{ code: string | number; message: string }>) => {
          if (res.data.code === "P2002") {
            throw new Error("E-mail został odebrany... 🤔 Spróbuj innego");
          } else if (res.data.code === 400 || res.data.code === 500) {
            throw new Error(res.data.message);
          } else {
            toast.success(
              <>
                <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                  {`${res.data.message}`}
                </div>
              </>
            );
            return setRegData((chunk) => {
              return { ...chunk, username: "", email: "", password: "" };
            });
          }
        }
      )
      .catch((error: any) => {
        toast.error(`Błąd: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <form name="wf-form-password" onSubmit={handleSubmit}>
        <div className={`flex flex-row w-full gap-2 ${justifyState || ""}`}>
          <div className="relative w-[50%]">
            <Image
              height={20}
              width={20}
              alt="envelope Icon denoting email field"
              src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
              className="absolute left-[5%] top-[26%] inline-block"
            />
            <input
              type="email"
              autoComplete="email"
              className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
              maxLength={256}
              value={regData?.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Adres e-mail"
              required
            />
          </div>

          <div className="relative w-[50%]">
            <Image
              height={981}
              width={888}
              alt="unknown person icon denoting username field"
              src="/images/username.png"
              className="absolute left-[5%] top-[26%] inline-block max-w-[18px] max-h-[20px]"
            />
            <input
              type="text"
              className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
              maxLength={256}
              value={regData?.username}
              onChange={handleInputChange}
              name="username"
              autoComplete="off"
              placeholder="Nazwa użytkownika"
              required
            />
          </div>
        </div>
        <div className="relative mb-4 md:mb-6 lg:mb-8">
          <Image
            height={20}
            width={20}
            alt="padlock icon denoting password field"
            src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"
            className="absolute left-[5%] top-[26%] inline-block"
          />
          <input
            type="password"
            className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
            maxLength={256}
            onChange={handleInputChange}
            value={regData?.password}
            name="password"
            placeholder="Hasło (min. 8 znaków)"
            autoComplete="off"
            required
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={`inline-block w-full cursor-pointer items-center ${
            buttonColor || "bg-black"
          } px-6 py-3 text-center font-semibold text-white disabled:cursor-not-allowed`}
        >
          {buttonLabel || "Zarejestruj sie"}
        </button>
      </form>
    </>
  );
};

interface RegFormProps {
  buttonLabel?: string;
}

export default RegForm;

//Dołącz do Wimax
