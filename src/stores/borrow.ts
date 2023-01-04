import { defineStore } from "pinia";
import $axios from "@api/axios";
import { Loading } from "quasar";
import { ref } from "vue";
import type { Borrow, CreateBorrow, ModifyBorrow } from "@interfaces/borrow";
import type { PaginateResult, PathQuery } from "@interfaces/paginate";

export const useBorrowStore = defineStore("borrow", () => {
	const borrows = ref<Borrow[]>([]);

	async function getLoggedInBorrows() {
		try {
			Loading.show();
			await $axios.get(`/user/me/borrow`);
		} catch (error) {
			return;
		}
	}

	async function getBorrowById(id: string) {
		try {
			Loading.show();
			await $axios.get(`/borrow/${id}`);
		} catch (error) {
			return;
		}
	}

	async function createBorrow(borrowData: CreateBorrow) {
		try {
			Loading.show();
			await $axios.post(`/borrow`, borrowData);
		} catch (error) {
			return;
		}
	}

	async function editBorrow(borrowData: ModifyBorrow, id?: string) {
		try {
			Loading.show();
			await $axios.patch(`/borrow/${id}`, borrowData);
		} catch (error) {
			return;
		}
	}

	async function deleteBorrow(id: string) {
		try {
			Loading.show();
			await $axios.delete(`/borrow/${id}`);
		} catch (error) {
			return;
		}
	}

	async function adminGetBorrows(query: PathQuery = { skip: 0, limit: 10 }) {
		try {
			Loading.show();

			let path = `/admin/borrow?skip=${query.skip}&limit=${query.limit}`;
			if (query.sortBy) {
				path += `&sortBy=${query.sortBy}`;
			}
			if (query.keyword) {
				path += `&keyword=${query.keyword}`;
			}

			const { data } = await $axios.get(path);
			return data as PaginateResult<Borrow>;
		} catch (error) {
			return;
		}
	}
	async function adminGetBorrowById(id: string) {
		try {
			Loading.show();
			await $axios.delete(`/admin/borrow/${id}`);
		} catch (error) {
			return;
		}
	}
	async function adminDeleteBorrow(id: string) {
		try {
			Loading.show();
			await $axios.delete(`/admin/borrow/${id}`);
		} catch (error) {
			return;
		}
	}

	async function adminEditBorrow(borrowData: ModifyBorrow, id?: string) {
		try {
			Loading.show();
			await $axios.patch(`/admin/borrow/${id}`, borrowData);
		} catch (error) {
			return;
		}
	}

	return {
		borrows,
		getLoggedInBorrows,
		getById: getBorrowById,
		createBorrow,
		editBorrow,
		deleteBorrow,
		adminGetBorrows,
		adminGetBorrowById,
		adminDeleteBorrow,
		adminEditBorrow,
	};
});
