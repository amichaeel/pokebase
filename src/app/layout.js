import Navbar from "@/components/Navigation/Navbar";

import { Fira_Sans, Afacad } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const pageTitle =
  //   pathname === "/"
  //     ? "Home | PokéBase"
  //     : `${pathname.replace("/", "")} | PokéBase`;
  return (
    <html lang="en" className="bg-base-300 antialiased">
      {/* <head>
        <title>{pageTitle}</title>
      </head> */}
      <body className={afacad.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
