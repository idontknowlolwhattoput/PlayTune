import SelectionProvider from "./selectionprovider";

export default function ContextProvider({children}) {
   return (
      <SelectionProvider>
         {children}
      </SelectionProvider>
   )
}