import type { Metadata } from "next";
import "./globals.css";
import PageMotion from "@/components/page-motion";
export const metadata: Metadata = { title: "PlayHive — Find your next favourite game", description: "Discover a new favourite. Play browser games instantly on PlayHive." };
export default function RootLayout({children}:{readonly children:React.ReactNode}) { return <html lang="en"><body><PageMotion>{children}</PageMotion></body></html>; }
