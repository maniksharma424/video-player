import { playlist } from "@/constant";

import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen flex ">
      {/* {allVideos.map((item, index) => {
          return (
            <div key={item.id}>
              <VideoCard item={item} />;
            </div>
          );
        })} */}
      <video
        src={
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        className=" object-cover w-full h-full border-none"
        controls
        autoPlay
        muted
      ></video>
      <div className="absolute h-screen w-full bg-[#363637] opacity-[0.7] bg-blend-overlay "></div>
      <div className="absolute w-full top-0 flex justify-end px-4">
        <button className=" px-4 py-2 text-[20px] text-gray-100 border-gray-500 rounded-md border bg-gray-600/50">
          View more
        </button>
      </div>
      {/* <div className=" absolute w-full h-screen flex flex-col justify-end items-center pb-20 font-Fredoka">
        <p className=" text-[30px] text-white font-[600] tracking-widest">
          {" "}
          BIG BUCK BUNNY
        </p>
        <p className=" text-[30px] text-white font-[600]"> BLENDER FOUNDATION</p>
      </div> */}
    </div>
  );
};

export default Page;
