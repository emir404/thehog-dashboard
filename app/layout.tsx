import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Agentation } from "agentation";
import { TooltipProvider } from "./components/ui/tooltip";
import { Sidebar } from "./components/Sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Hog · Developer Console",
  description: "Manage credentials, usage, spending, and billing for The Hog API.",
};

const sidebarInitScript = `try{var v=localStorage.getItem('sb');if(v==='collapsed')document.documentElement.dataset.sidebar='collapsed';}catch(e){}`;
const themeInitScript = `try{var t=localStorage.getItem('th');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.dataset.theme='dark';}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: sidebarInitScript }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full bg-bg text-text flex">
        <TooltipProvider delayDuration={200}>
          <Sidebar />
          <main className="flex-1 min-w-0 h-screen overflow-hidden">
            {children}
          </main>
        </TooltipProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
