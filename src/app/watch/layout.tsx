import { VideoPlayerProvider } from "@/providers/videoPlayerProvider";
import { VideoProvider } from "@/providers/videoProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <VideoProvider>
          <VideoPlayerProvider>{children}</VideoPlayerProvider>
        </VideoProvider>
      </body>
    </html>
  );
}
