import { createContext } from "react";

export const DarkModeContext = createContext<boolean | null>(null);
export const SetDarkModeContext = createContext<
	React.Dispatch<React.SetStateAction<boolean | null>>
>(() => void {});
