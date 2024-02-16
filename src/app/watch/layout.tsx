import { VideoPlayerProvider } from "@/providers/videoPlayerProvider";
import { VideoProvider } from "@/providers/videoProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


        <VideoProvider>
          <VideoPlayerProvider>{children}</VideoPlayerProvider>
        </VideoProvider>


  );
}
