import { createContext } from "react";
import { ViewType } from "../types";

export const ViewContext = createContext<ViewType>("Grid");
export const SetViewContext = createContext<
	React.Dispatch<React.SetStateAction<ViewType>>
>(() => void {});
