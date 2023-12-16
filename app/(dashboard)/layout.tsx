import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-full min-w-full bg-background max-h-full">
      <main className="flex w-full h-full flex-grow-0">{children}</main>
    </div>
  );
}

export default layout;
