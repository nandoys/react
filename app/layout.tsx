import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ouvrir compe | Grand Max Infinity",
  description: "Portail d'ouverture de compte",
  icons: {
    icon: '/icon.png',
    //shortcut: '/shortcut-icon.png',
    //apple: '/apple-icon.png',
    //other: {
    //  rel: 'apple-touch-icon-precomposed',
   //   url: '/apple-touch-icon-precomposed.png',
   // },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full bg-white">
      <body className="h-full">{children}</body>
    </html>
  );
}
