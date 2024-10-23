import "../globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Liveblocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Providers>{children}</Providers>
    </main>
  );
}
