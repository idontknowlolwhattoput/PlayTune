import { createContext, useState } from "react";

export const SelectionContext = createContext();

export default function SelectionProvider({ children }) {

  const [selection, setSelection] = useState("browse");

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}
