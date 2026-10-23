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
	| "private"
	| "trash"
	| "folder"
	| "video"
	| "music"
	| "text"
	| "program"
	| "default";

const bananaComputer: ComputerFiles = [
	{
		id: 0,
		file: { name: "home", type: "folder", size: 0, lastModified: 0 },
		childIds: [1],
	},
	{
		id: 1,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
];

export const allUsers: Array<UserAccount> = [
	{
		userId: 0,
		userName: "banana",
		password: "ana123",
		fileSystem: bananaComputer,
	},
];
