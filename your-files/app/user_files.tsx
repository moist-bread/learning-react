import { ComputerFiles, UserAccount } from "./types";

const bananaComputer: ComputerFiles = [
	{
		id: 0,
		file: { name: "home", type: "folder", size: 0, lastModified: 0 },
		childIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	},
	{
		id: 1,
		file: { name: "Documents", type: "folder", size: 0, lastModified: 0 },
		childIds: [15, 16, 17, 18],
	},
	{
		id: 2,
		file: { name: "Images", type: "folder", size: 0, lastModified: 0 },
		childIds: [19, 20, 22, 23],
	},
	{
		id: 3,
		file: { name: "Music", type: "folder", size: 0, lastModified: 0 },
		childIds: [24, 25],
	},
	{
		id: 4,
		file: {
			name: "Screenshoot (17)",
			type: "image",
			size: 18000,
			lastModified: 989889878,
		},
		childIds: [],
	},
	{
		id: 5,
		file: {
			name: "Screenshoot (35)",
			type: "image",
			size: 17909,
			lastModified: 50000,
		},
		childIds: [],
	},
	{
		id: 6,
		file: {
			name: "draft",
			type: "text",
			size: 10000,
			lastModified: 5000009,
		},
		childIds: [],
	},
	{
		id: 7,
		file: {
			name: "drafta",
			type: "text",
			size: 50000,
			lastModified: 500000,
		},
		childIds: [],
	},
	{
		id: 8,
		file: {
			name: "draftaa",
			type: "text",
			size: 100000,
			lastModified: 400000,
		},
		childIds: [],
	},
	{
		id: 9,
		file: {
			name: "draftaa (1)",
			type: "text",
			size: 500000,
			lastModified: 300000,
		},
		childIds: [],
	},
	{
		id: 10,
		file: {
			name: "draftaa (1) (2)",
			type: "text",
			size: 600000,
			lastModified: 200000,
		},
		childIds: [],
	},
	{
		id: 11,
		file: {
			name: "draftaa (2)",
			type: "text",
			size: 550000,
			lastModified: 150000,
		},
		childIds: [],
	},
	{
		id: 12,
		file: {
			name: "ringtone",
			type: "music",
			size: 40000,
			lastModified: 8000000,
		},
		childIds: [],
	},
	{
		id: 13,
		file: {
			name: "microwave manual",
			type: "pdf",
			size: 15000,
			lastModified: 5099990,
		},
		childIds: [],
	},
	{
		id: 14,
		file: {
			name: "printer manual",
			type: "pdf",
			size: 90000,
			lastModified: 5999900,
		},
		childIds: [],
	},

	{
		id: 15,
		file: {
			name: "Poetry for Dummies",
			type: "epub",
			size: 666677666,
			lastModified: 7762671,
		},
		childIds: [],
	},
	{
		id: 16,
		file: {
			name: "Utility Bill SEPTEMBER",
			type: "private",
			size: 9009990,
			lastModified: 50777770,
		},
		childIds: [],
	},
	{
		id: 17,
		file: {
			name: "Image Editor",
			type: "program",
			size: 99999990,
			lastModified: 9999999,
		},
		childIds: [],
	},
	{
		id: 18,
		file: {
			name: "Text Editor",
			type: "program",
			size: 99999990,
			lastModified: 9999999,
		},
		childIds: [],
	},
	{
		id: 19,
		file: { name: "New Folder", type: "folder", size: 0, lastModified: 0 },
		childIds: [26],
	},
	{
		id: 20,
		file: {
			name: "Screenshoot (24)",
			type: "image",
			size: 6667328,
			lastModified: 536277,
		},
		childIds: [],
	},
	{
		id: 21,
		file: {
			name: "credit card numbers",
			type: "private",
			size: 1000,
			lastModified: 500,
		},
		childIds: [],
	},
	{
		id: 22,
		file: {
			name: "sun rise by the coast",
			type: "video",
			size: 92661000,
			lastModified: 63542500,
		},
		childIds: [],
	},
	{
		id: 23,
		file: {
			name: "house tour",
			type: "video",
			size: 99991000,
			lastModified: 9354250,
		},
		childIds: [],
	},
	{
		id: 24,
		file: {
			name: "4 HOURS of White Noise (Slow and Reverb)",
			type: "music",
			size: 589937400,
			lastModified: 6666383,
		},
		childIds: [],
	},
	{
		id: 25,
		file: {
			name: "Children (Eat Me Edit) - Robert Miles",
			type: "music",
			size: 937400,
			lastModified: 66383,
		},
		childIds: [],
	},

	{
		id: 26,
		file: { name: "New Folder", type: "folder", size: 0, lastModified: 0 },
		childIds: [27],
	},
	{
		id: 27,
		file: {
			name: "New Folder (1)",
			type: "folder",
			size: 0,
			lastModified: 0,
		},
		childIds: [28],
	},
	{
		id: 28,
		file: { name: "DON'T LOOK", type: "folder", size: 0, lastModified: 0 },
		childIds: [21],
	},
];

const userComputer: ComputerFiles = [
	{
		id: 0,
		file: { name: "home", type: "folder", size: 0, lastModified: 0 },
		childIds: [1, 2, 3, 4],
	},
	{
		id: 1,
		file: { name: "Documents", type: "folder", size: 0, lastModified: 0 },
		childIds: [5, 6, 7, 8],
	},
	{
		id: 2,
		file: { name: "Images", type: "folder", size: 0, lastModified: 0 },
		childIds: [9, 10],
	},
	{
		id: 3,
		file: { name: "Music", type: "folder", size: 0, lastModified: 0 },
		childIds: [11],
	},
	{
		id: 4,
		file: {
			name: "README.md",
			type: "text",
			size: 10000,
			lastModified: 989889878,
		},
		childIds: [],
	},
	{
		id: 5,
		file: {
			name: "Anti Virus",
			type: "program",
			size: 99999990,
			lastModified: 9999999,
		},
		childIds: [],
	},
	{
		id: 6,
		file: {
			name: "FireWall",
			type: "program",
			size: 99999990,
			lastModified: 9999999,
		},
		childIds: [],
	},
	{
		id: 7,
		file: {
			name: "Image Editor",
			type: "program",
			size: 99999990,
			lastModified: 9999999,
		},
		childIds: [],
	},
	{
		id: 8,
		file: {
			name: "Text Editor",
			type: "program",
			size: 99999990,
			lastModified: 9999999,
		},
		childIds: [],
	},
	{
		id: 9,
		file: {
			name: "Screenshoots",
			type: "folder",
			size: 0,
			lastModified: 0,
		},
		childIds: [],
	},
	{
		id: 10,
		file: {
			name: "Default Wallpaper",
			type: "image",
			size: 1809900,
			lastModified: 989889878,
		},
		childIds: [],
	},
	{
		id: 11,
		file: {
			name: "Notification Sound Effect",
			type: "music",
			size: 40000,
			lastModified: 989889878,
		},
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
	{
		userId: 1,
		userName: "User",
		password: "Password",
		fileSystem: userComputer,
	},
];
