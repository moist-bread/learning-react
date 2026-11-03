import { createContext } from "react";

export const LoggedIdContext = createContext<number | null>(null);

export const HandleLogoutContext = createContext<() => void>(() => void {});
export const HandleLoginContext = createContext<
	(user: string, pass: string) => void
>((u, p) => void {});
