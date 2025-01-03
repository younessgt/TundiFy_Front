// "use client";

import { capitalise } from "@/utils/capitalise";
import { useSelector } from "react-redux";
import DotsIcon from "@/components/svg/Dots";
import { SearchIcon } from "@/components/svg";
import { VideoCall } from "@mui/icons-material";

export default function ChatHeader() {
  const { activeConversation } = useSelector((state) => state.chatState);
  const { picture, name } = activeConversation;
  return (
    <div className="w-full h-full flex justify-between items-center ">
      {/* picture and name */}
      <div className="flex items-center gap-x-4 p-[16px]">
        {/* picture */}
        <div className="flex justify-center items-center max-w-[40px] min-w-[40px] h-[40px] rounded-full   bg-black overflow-hidden">
          <img
            src={picture}
            alt={`${name} picture`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* name and status*/}
        <div className="flex flex-col justify-center ">
          <h1 className="dark:text-white  font-bold text-sm">
            {capitalise(name)}
          </h1>
          <span className="dark:text-dark_svg_2 text-xs">Online</span>
        </div>
      </div>

      {/* icons right*/}
      <div className="flex">
        <ul className="flex p-[16px]">
          <li>
            <button className="p-2 bg-dark_bg_3 rounded-full btn">
              <VideoCall className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="p-2 bg-dark_bg_3 rounded-full btn">
              <SearchIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="p-2 bg-dark_bg_3 rounded-full btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
