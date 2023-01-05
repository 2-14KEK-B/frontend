import { defineStore } from "pinia";
import { ref } from "vue";
import { Loading } from "quasar";
import $axios from "@api/axios";
import type { CreateUserRate, ModifyUserRate, UserRate } from "@interfaces/userRate";
import { useBorrowStore } from "./borrow";

export const useUserRateStore = defineStore("userRate", () => {
	const loggedInRates = ref<{ from: UserRate[]; to: UserRate[] }>({ from: [], to: [] });

	async function getLoggedInUserRates() {
		try {
			Loading.show();
			const { data } = await $axios.get("/user/me/rate");
			return data as UserRate[];
		} catch (error) {
			return;
		}
	}

	async function getUserRatesByUserId(id: string) {
		try {
			Loading.show();
			const { data } = await $axios.get(`/user/${id}/rate`);
			return data as UserRate[];
		} catch (error) {
			return;
		}
	}

	async function getUserRatesByBorrowId(id: string) {
		try {
			Loading.show();
			const { data } = await $axios.get(`/borrow/${id}/rate`);
			return data as UserRate[];
		} catch (error) {
			return;
		}
	}

	async function createUserRate(userRateData: CreateUserRate, userId: string, borrowId: string) {
		try {
			Loading.show();
			const { data } = await $axios.post<UserRate>(`/user/${userId}/rate`, { ...userRateData, borrow: borrowId });
			const borrowStore = useBorrowStore();
			loggedInRates.value.from.push(data);
			borrowStore.loggedInBorrows.forEach((b) => {
				if (b._id == borrowId) {
					b.user_rates?.push(data);
				}
			});
		} catch (error) {
			return;
		}
	}

	async function editUserRate(userRateData: ModifyUserRate, userId: string, rateId: string) {
		try {
			Loading.show();
			await $axios.patch(`/user/${userId}/rate/${rateId}`, userRateData);
		} catch (error) {
			return;
		}
	}
	async function deleteUserRate(userId: string, rateId: string) {
		try {
			Loading.show();
			await $axios.delete(`/user/${userId}/rate/${rateId}`);
		} catch (error) {
			return;
		}
	}

	async function adminGetUserRates() {
		try {
			const { data } = await $axios.get("/admin/user/rate");
			return data as UserRate[];
		} catch (error) {
			return;
		}
	}

	async function adminDeleteUserRate(userId: string, rateId: string) {
		try {
			Loading.show();
			await $axios.delete(`/admin/user/${userId}/rate/${rateId}`);
		} catch (error) {
			return;
		}
	}

	async function adminEditUserRate(userRateData: ModifyUserRate, userId: string, rateId: string) {
		try {
			Loading.show();
			await $axios.patch(`/admin/user/${userId}/rate/${rateId}`, userRateData);
		} catch (error) {
			return;
		}
	}

	return {
		loggedInRates,
		getLoggedInUserRates,
		getUserRatesByUserId,
		getUserRatesByBorrowId,
		createUserRate,
		editUserRate,
		deleteUserRate,
		adminGetUserRates,
		adminDeleteUserRate,
		adminEditUserRate,
	};
});
