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
		childIds: [1, 4, 5],
	},
	{
		id: 1,
		file: { name: "bomdiaa", type: "folder", size: 1000, lastModified: 500 },
		childIds: [2],
	},
	{
		id: 2,
		file: { name: "bomdiabaaaaaaaaaaaa", type: "folder", size: 1000, lastModified: 500 },
		childIds: [3],
	},
	{
		id: 3,
		file: { name: "bomdiac", type: "folder", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 4,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 5,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 6,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 7,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 8,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 9,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 10,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 11,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 12,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 13,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 14,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 15,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 16,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 17,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 18,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 19,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 20,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 21,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 22,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 23,
		file: { name: "bomdia", type: "music", size: 1000, lastModified: 500 },
		childIds: [],
	},
	{
		id: 24,
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
