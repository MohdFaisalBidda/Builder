"use client";

import { FormElementInstance } from "@/components/FormElements";
import { ReactNode, createContext, useState } from "react";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  deleteElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((elements) => elements.id !== id));
  };
  return (
    <DesignerContext.Provider value={{ elements, addElement, deleteElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
