"use client";
import Header from "@/components/Header";
import Playlist from "@/components/Playlist";
import VideoPlayer from "@/components/VideoPlayer";
import { playlist } from "@/constant";
import { useVideoContext } from "@/providers/videoProvider";
import { Video } from "@/types/types";

export default function Page({ params }: { params: { slug: string } }) {
  const currentVideo: Video | null =
    playlist.find((item) => item.id === params.slug) ?? null;

  const { allVideos }: { allVideos: Video[] } = useVideoContext();

  return (
    <div className="w-full h-screen flex flex-col px-10">
      <Header />
      <div className="flex-1 w-full flex sm:flex-row flex-col justify-start ">
        <VideoPlayer isPlaylistVideo currentVideo={currentVideo} />

        <Playlist />
      </div>
    </div>
  );
}
