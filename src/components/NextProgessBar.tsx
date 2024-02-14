"use client";
import { Next13ProgressBar } from "next13-progressbar";

const NextProgessBar = () => {
  return (
    <>
      <Next13ProgressBar
        height="40px"
        color="#000000"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};

export default NextProgessBar;
