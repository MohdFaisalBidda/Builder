import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <nav className="w-full h-20 flex justify-end p-4 gap-x-10 text-xl list-none">
      <li>Home</li>
      {!!session && <Logout />}
      {!session && (
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
      )}
    </nav>
  );
};

export default Navbar;
