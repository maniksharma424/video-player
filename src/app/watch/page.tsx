import { ChevronRight } from "lucide-react";
import Link from "next/link";

import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen flex ">
      <video
        src={
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        className=" object-cover w-full h-full border-none"
        autoPlay
        muted
      ></video>
      <div className="absolute h-screen w-full bg-[#363637] opacity-[0.7] bg-blend-overlay "></div>
      <div className="absolute w-full top-0 flex justify-end px-4"></div>
      <div className=" absolute sm:w-fit w-full h-screen sm:pl-10 pt-10 flex flex-col justify-start sm:items-start items-center sm:text-[60px] text-[20px] text-gray-100 font-[300]">
        <p> Caste</p>
        <p> Your playlist</p>
        <p> Your way</p>
        <p>Enjoy limitless video options!</p>
        <Link
          href={"/watch/533-565-76788-75657"}
          aria-label="Home"
          className=" w-1/2 mt-5 px-4 py-2 sm:text-[20px] text-[14px] text-gray-100 rounded-md  bg-black/60 font-[200] hover:bg-gray-300/60 flex items-center justify-center"
        >
          Get started <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default Page;
