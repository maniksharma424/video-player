import { VideoProvider } from "@/providers/videoProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <VideoProvider>{children}</VideoProvider>
      </body>
    </html>
  );
}
