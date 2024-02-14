"use client";
import Header from "@/components/Header";
import Playlist from "@/components/Playlist";
import VideoPlayer from "@/components/VideoPlayer";
import { playlist } from "@/constant";
import {
  Video,
  useVideoContext,
} from "@/providers/videoProvider";


export default function Page({ params }: { params: { slug: string } }) {
  const currentVideo: Video | null =
    playlist.find((item) => item.id === params.slug) ?? null;

  const { allVideos }: { allVideos: Video[] } = useVideoContext();

  return (
    <div className="w-full h-screen flex flex-col px-10">
      <Header />
      <div className="flex-1 w-full flex sm:flex-row flex-col justify-start ">
        <VideoPlayer currentVideo={currentVideo} />

        <Playlist videos={allVideos} />
      </div>
    </div>
  );
}
