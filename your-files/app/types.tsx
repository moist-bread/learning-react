export type homeStates = "landing" | "login" | "files";

export type LogAction = { type: "logout" } | { type: "login"; id: number };

export interface UserAccount {
	userId: number;
	userName: string;
	password: string;
	fileSystem: ComputerFiles;
}

export type ComputerFiles = Array<FileObjectNode>;

export type FileObjectNode = {
	id: number;
	file: FileObject;
	childIds: Array<number>;
};

export interface FileObject {
	name: string;
	type: FileType;
	size: number;
	lastModified: number;
}

export type FileType =
	| "epub"
	| "image"
	| "private"
	| "folder"
	| "video"
	| "music"
	| "text"
	| "program"
	| "pdf";

export type ViewType = "List" | "Grid" | "Large";
