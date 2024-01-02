"use client";

import { Session, getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ session }: any) => {
  const path =usePathname();
  const submit =path.includes("/submit")
  return (
    <>
      {/* <div className="flex justify-end">
        <NavigationMenu className="flex justify-end">
          <NavigationMenuList className="p-4 gap-x-8 text-xl list-none">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
            
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}
      <nav className="flex justify-between p-4">
        <Logo />
        <div className="flex flex-col items-center gap-5 sm:gap-x-8 sm:flex-row ">
          <ThemeSwitcher />
          {/* <LoginButton /> */}
          <NavigationMenu className="flex justify-end">
            <NavigationMenuList className="">
              {!session && (
                <>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Login
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/register" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Register
                    </NavigationMenuLink>
                  </Link>
                </>
              )}
              {!!session && !submit && (
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Logout />
                </NavigationMenuLink>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </>

    // <nav className="w-full h-20 flex justify-end p-4 gap-x-10 text-xl list-none">
    //   <li>Home</li>
    //   {!!session && <Logout />}
    //   {!session && (
    //     <li>
    //       <Link href={"/login"}>Login</Link>
    //     </li>
    //   )}
    // </nav>
  );
};

export default Navbar;
