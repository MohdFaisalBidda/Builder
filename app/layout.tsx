import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Session, getServerSession } from "next-auth";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/context/DesignerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Builder",
  description: "Form Building Application Built using Nextjs,NextAuth,TailwindCSS,Shadcn,Prisma,PostgresSql,Docker.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession();
  console.log(session, "session");

  return (
    <html lang="en">
      <body className={inter.className}>
        <DesignerContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
              <Navbar session={session} />
              <main className="flex h-screen w-full flex-grow">
                {children}
                <Toaster/>
              </main>
            </div>
          </ThemeProvider>
        </DesignerContextProvider>
      </body>
    </html>
  );
}
