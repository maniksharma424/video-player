import React from "react";

const SearchResultNotFound = () => {
  return (
    <div className="relative bottom-[56px] flex h-fit w-fit flex-col">
      <div id="illustration" className="flex items-center justify-center">
        <Icon />
      </div>
      <div id="info" className="mt-[8px]">
        <p className="text-center text-[16px]  font-[600] leading-[24px] text-[#475467]">
          No result found.
        </p>
        <div className="mt-[4px] text-[14px] font-[400] leading-[20px] text-[#475467]">
          <p className="text-center">Try using a different search term </p>
          <div className="flex items-center justify-center mt-[24px]"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultNotFound;

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="153"
      height="120"
      viewBox="0 0 153 120"
      fill="none"
    >
      <circle cx="76.5" cy="52" r="52" fill="#EAECF0"></circle>
      <g filter="url(#filter0_dd_516_11096)">
        <path
          d="M78.1 16C67.3273 16 57.7978 21.3233 51.9987 29.4829C50.105 29.0363 48.1301 28.8 46.1 28.8C31.9615 28.8 20.5 40.2615 20.5 54.4C20.5 68.5385 31.9615 80 46.1 80L110.1 80C122.471 80 132.5 69.9712 132.5 57.6C132.5 45.2288 122.471 35.2 110.1 35.2C109.221 35.2 108.354 35.2506 107.502 35.349C102.598 23.9677 91.2797 16 78.1 16Z"
          fill="#F9FAFB"
        ></path>
        <ellipse
          cx="46.1"
          cy="54.4"
          rx="25.6"
          ry="25.6"
          fill="url(#paint0_linear_516_11096)"
        ></ellipse>
        <circle
          cx="78.1001"
          cy="48"
          r="32"
          fill="url(#paint1_linear_516_11096)"
        ></circle>
        <ellipse
          cx="110.1"
          cy="57.5999"
          rx="22.4"
          ry="22.4"
          fill="url(#paint2_linear_516_11096)"
        ></ellipse>
      </g>
      <circle cx="21.5" cy="19" r="5" fill="#F2F4F7"></circle>
      <circle cx="18.5" cy="109" r="7" fill="#F2F4F7"></circle>
      <circle cx="145.5" cy="35" r="7" fill="#F2F4F7"></circle>
      <circle cx="134.5" cy="8" r="4" fill="#F2F4F7"></circle>
      <g filter="url(#filter1_b_516_11096)">
        <rect
          x="52.5"
          y="62"
          width="48"
          height="48"
          rx="24"
          fill="#344054"
          fill-opacity="0.4"
        ></rect>
        <path
          d="M85.5 95L82.0001 91.5M84.5 85.5C84.5 90.1944 80.6944 94 76 94C71.3056 94 67.5 90.1944 67.5 85.5C67.5 80.8056 71.3056 77 76 77C80.6944 77 84.5 80.8056 84.5 85.5Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_dd_516_11096"
          x="0.5"
          y="16"
          width="152"
          height="104"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_516_11096"
          ></feMorphology>
          <feOffset dy="8"></feOffset>
          <feGaussianBlur stdDeviation="4"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_516_11096"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_516_11096"
          ></feMorphology>
          <feOffset dy="20"></feOffset>
          <feGaussianBlur stdDeviation="12"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_516_11096"
            result="effect2_dropShadow_516_11096"
          ></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_516_11096"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter1_b_516_11096"
          x="44.5"
          y="54"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImageFix"
            stdDeviation="4"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_516_11096"
          ></feComposite>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_516_11096"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_516_11096"
          x1="26.4429"
          y1="37.4858"
          x2="71.7"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D0D5DD"></stop>
          <stop offset="0.350715" stop-color="white" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_516_11096"
          x1="53.5287"
          y1="26.8571"
          x2="110.1"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D0D5DD"></stop>
          <stop offset="0.350715" stop-color="white" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_516_11096"
          x1="92.8999"
          y1="42.8"
          x2="132.5"
          y2="79.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D0D5DD"></stop>
          <stop offset="0.350715" stop-color="white" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
