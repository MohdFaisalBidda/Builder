import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <main className="flex w-full flex-grow-0">{children}</main>
    </div>
  );
}

export default layout;
