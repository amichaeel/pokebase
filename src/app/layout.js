import Navigation from "@/components/Navigation";

import { Inter, Fira_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const firaSans = Fira_Sans({ subsets: ['latin'], weight: '300' });

export const metadata = {
  title: "PokeBase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={firaSans.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
