import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "./context/authcontext.jsx";
import { UIProvider } from "./context/Uicontext.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:"Loom | Share Your Moments",
  description: "Loom is a social platform to share your photos, express yourself, and connect with people around the world. ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
           <UIProvider>
          <Navbar />
          <main className='grow'>
            {children}
          </main>
          <Footer />
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
