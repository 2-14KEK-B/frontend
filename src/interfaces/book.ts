import type { BookRate } from "./bookRate";
import type { User } from "./user";

interface Book {
	_id?: string;
	uploader: User | string;
	createdAt?: string;
	updatedAt?: string;
	author: string;
	title: string;
	picture: string;
	category: string[];
	price?: number;
	available?: boolean;
	for_borrow: boolean;
	rates?: (BookRate | string)[];
	__v?: number;
}

interface CreateBook {
	author: string;
	title: string;
	picture?: string;
	category?: string[];
	price?: number;
	for_borrow?: boolean;
}

interface ModifyBook {
	author?: string;
	title?: string;
	picture?: string;
	category?: string[];
	price?: number;
	for_borrow?: boolean;
	available?: boolean;
}

export { Book, CreateBook, ModifyBook };
