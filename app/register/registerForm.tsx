"use client";
import React, { FormEvent } from "react";

function RegisterForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ response });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex flex-col justify-center items-center"
    >
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
