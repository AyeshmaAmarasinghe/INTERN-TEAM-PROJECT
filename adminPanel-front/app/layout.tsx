import { Urbanist } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/navBar/side-bar";
import Header from "./components/header/header";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.variable} antialiased flex`}>
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 ml-[290px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
