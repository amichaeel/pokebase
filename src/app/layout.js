import Navbar from "@/components/Navigation/Navbar";

import { Fira_Sans } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({ subsets: ['latin'], weight: '300' });

export const metadata = {
  title: "PokéBase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={firaSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
