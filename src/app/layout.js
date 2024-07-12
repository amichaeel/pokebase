import Navbar from "@/components/Navigation/Navbar";

import { Fira_Sans } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: "swap"
});

export const metadata = {
  title: "PokéBase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-base-300">
      <body className={firaSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
