import { Video } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchCard: React.FC<{ item: Video }> = ({ item }) => {
  const { description, sources, subtitle, thumb, title } = item;
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.push(`/watch/${item.id}`);
      }}
      className="w-full h-full  cursor-pointer flex items-start"
    >
      <div id="image" className="w-2/5 h-[95px] border rounded-md relative">
        <Image
          className="w-full h-full rounded-md object-cover "
          src={item.thumb}
          height={5}
          width={100}
          alt="image"
        />

        <span className="absolute bottom-2 right-1 text-[9px] p-1  bg-black/60 text-white font-[500] rounded-sm ">
          {item.duration}
        </span>
      </div>
      <div id="info" className="w-1/2 ml-2 flex flex-col justify-start">
        <span className="w-2/3 truncate font-[600]">{title}</span>

        <p className="text-[12px] w-fit px-2 font-[600] leading-8  truncate bg-gray-100 text-gray-600 rounded-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
