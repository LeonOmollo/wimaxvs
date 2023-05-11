"use client";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import useSubSectionModal from "@/app/hooks/useSubSectionModal";
import useCurrentSection from "@/app/hooks/useCurrentSection";

interface SectionChipProps {
  label: string;
  icon?: ReactElement<IconType>;
  addOrNum?: number;
}
const SectionChip: React.FC<SectionChipProps> = ({
  label,
  icon: Icon,
  addOrNum,
}) => {
  const subSectionModal = useSubSectionModal();
  const [ setCurrentSection ] = useCurrentSection((state)=> [state.setCurrentSection])

  const menuActions = (los: string) => {
    switch (los) {
      case "addSub":
        subSectionModal.onOpen();
        setCurrentSection(label)
        break;
      // case "signup":
      //   registerModal.onOpen();
      //   break;

      default:
        break;
    }
  };

  return (
    <button
      onClick={() => menuActions("addSub")}
      className="sectionChip py-2 px-3 rounded-md hover:bg-deep-blue/10 transition hover:ease-in ease-in duration-300 text-deep-blue w-full flex flex-row items-center justify-around "
    >
      <div className="flex flex-row gap-2 items-center w-2/3">
        {Icon && Icon} {label}
      </div>
      {addOrNum ? (
        <div className="px-2 rounded-full bg-deep-blue">
          <p className="text-bold text-white">{addOrNum}</p>
        </div>
      ) : (
        <AiOutlinePlus size={20} color={"#343e83"} />
      )}
    </button>
  );
};

export default SectionChip;
