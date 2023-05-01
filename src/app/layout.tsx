import Chat from "@/components/Chat";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookbuddy",
  description: "Your bookstore for fantasy & mystery novels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Chat />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
