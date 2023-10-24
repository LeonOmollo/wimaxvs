"use client";

import { SafeDriver } from "@/app/types";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentDriver?: SafeDriver | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentDriver }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuActions = (los: string) => {
    switch (los) {
      case "login":
        (()=>{})();
        toggleOpen();
        break;
      case "signup":
        (() => {})();
        toggleOpen();
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* <div className="" onClick={toggleOpen}>
          <AiOutlineMenu />
        </div> */}
        {currentDriver && (
          <div
            className="p-4 md:px-2 flex flex-row items-center gap-3 cursor-pointer hover:scale-100 hover:drop-shadow-mdtm transition"
            onClick={toggleOpen}
          >
            <Avatar src={currentDriver?.image} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[25vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer pb-2 mb-2 md:pb-0 md:mb-0">
            {currentDriver ? (
              <>
                <MenuItem
                  label="Logout"
                  onClick={() =>
                    signOut({ callbackUrl: "http://localhost:3000/" })
                  }
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => menuActions("login")} />
                <MenuItem
                  label="Sign up"
                  onClick={() => menuActions("signup")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
