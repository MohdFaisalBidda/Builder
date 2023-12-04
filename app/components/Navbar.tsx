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

const Navbar = ({ session }: any) => {
  return (
    <div className="flex justify-end">
      <NavigationMenu className="flex justify-end">
        <NavigationMenuList className="p-4 gap-x-8 text-xl list-none">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
          {!session && (
            <>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
              <Link href="/register" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Register
                </NavigationMenuLink>
              </Link>
            </>
          )}
          {!!session && (
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Logout />
            </NavigationMenuLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>

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
