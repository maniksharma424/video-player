import GithubIcon from "@/components/GithubIcon";
import Logo from "@/components/Logo";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full sm:px-10 sm:py-20 px-5 py-10 flex  flex-col justify-start items-center overflow-auto  ">
      <div className="absolute px-8 bg-white top-0 left-0 w-full flex justify-center ">
        <div className="w-4/5 py-3 border-b border-gray-200 flex justify-between items-center ">
          <div className="flex items-center">
            <Link
              href={"/watch"}
              className=" cursor-pointer flex justify-start items-baseline"
            >
              <Logo />
              <p className="font-[500] text-[16px] ml-2 leading-12">Caste</p>
            </Link>
            <Link
              className="ml-4"
              href={"/watch/533-565-76788-75657"}
              aria-label="Home"
            >
              <Home />
            </Link>
          </div>
          <Link
            aria-label="Github repository for the project"
            href={"https://github.com/maniksharma424/video-player"}
          >
            <GithubIcon />
          </Link>
        </div>
      </div>
      <div className="w-4/5 sm:mt-0 mt-10  flex flex-col justify-start items-start">
        {" "}
        <h1 className="text-[40px] font-[600]">
          Building a Video Player App with React
        </h1>
      </div>
      <div className="w-4/5 mt-5 flex flex-col gap-5">
        <h1 className="text-[20px] font-[300]">
          In this blog , I will explain the learnings and features i implemented
          while building the video player application using React.js. Along the
          way, I encountered some challenges and learned new things further
          enhancing my development skills.
        </h1>
        <div className="w-full mt-5">
          <h2 className="text-[25px] font-[500]">
            Interacting with Web APIs for video element
          </h2>
          <p className="text-gray-600">
            While building the video player component, I got a chance to learn
            the behaviour for the video element and its associated JavaScript
            APIs. Used those to control various event in a video{" "}
          </p>
        </div>

        <div className="w-full flex sm:flex-row flex-col  justify-between">
          <div className="sm:w-1/2 w-full">
            <h2 className="text-[25px] font-[500]">
              Autoplay Restrictions in Chrome
            </h2>
            <p className="text-gray-600">
              One significant challenge I encountered was Chrome autoplay
              policy, which restricts autoplaying videos unless the user has
              interacted with the document first. To overcome this limitation, I
              implemented a workaround by requiring user interaction before
              initiating autoplay, unless an refresh is done by the user
              ensuring a seamless user experience across different browsers.
            </p>
            <h2 className="text-[25px] font-[500] mt-8">Drag and Drop</h2>
            <p className="text-gray-600">
              Implemented drag-and-drop functionality for reordering videos in
              the playlist Rather than using any external libraries, I learned
              React built-in APIs to create a seamless drag-and-drop experience.
              By utilizing useState and useRef hooks along with drag-and-drop
              events, I achieved a lightweight and efficient solution.
            </p>
            <h2 className="text-[25px] font-[500] mt-10">Keyboard Shortcuts</h2>
            <p className="text-gray-600">
              Enhanced user accessibility, I implemented keyboard shortcuts to
              control video events such as seek ,volume control resize and
              search shortcuts. Also handled edge cases and conflicts between
              the shortcuts to ensure a smooth experience .
            </p>
          </div>
          <div className="sm:w-1/3 w-full sm:mt-0 mt-10 ">
            <h2 className="text-[25px] font-[500] sm:mt-0 mt-4">
              Lighthouse score
            </h2>
            <div className="border h-full shadow-lg rounded-md mt-2">
              <Image
                src={"https://i.imgur.com/8ckw33P.png"}
                width={500}
                height={500}
                alt="SEO score"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-[25px] font-[500]">Code Modularity</h2>
          <p className="text-gray-600">
            Maintained a clean and organized codebase for ease of maintenance. I
            emphasized code modularity by breaking down the application into
            reusable components, custom hooks and providers to handle complex
            logic. By adhering to best practices and keeping file sizes in
            check, I ensured readability and maintainability throughout the
            development process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
