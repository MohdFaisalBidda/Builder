"use client"
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return <li className="cursor-pointer" onClick={()=>signOut()}>Logout</li>;
};

export default Logout;
