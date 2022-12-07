import $axios from "@api/axios";
import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "home",
				component: () => import("@views/HomeView.vue"),
			},
			{
				path: "editProfile",
				name: "editProfile",
				component: () => import("@views/EditProfile.vue"),
			},
			{
				path: "auth",
				name: "auth",
				component: () => import("@views/AuthView.vue"),
			},
			{
				path: "newBook",
				name: "newBook",
				component: () => import("@views/NewBook.vue"),
			},
			{
				path: "me",
				name: "myProfile",
				component: () => import("@views/MyProfileView.vue"),
				beforeEnter: async (to) => {
					await $axios.get("user/me").then((res) => (to.meta = res.data));
				},
			},
			{
				path: "user/:id",
				name: "userProfile",
				component: () => import("@views/UserProfileView.vue"),
				beforeEnter: async (to) => {
					await $axios.get(`user/${to.params.id}`).then((res) => (to.meta = res.data));
				},
			},
			{
				path: "book/:id",
				name: "book",
				component: () => import("@views/BookView.vue"),
				beforeEnter: async (to) => {
					await $axios.get(`book/${to.params.id}`).then((res) => (to.meta = res.data));
				},
			},
		],
	},
	{
		path: "/admin",
		component: () => import("@layouts/AdminLayout.vue"),
		children: [
			{
				path: "",
				name: "admin_home",
				component: () => import("@views/HomeView.vue"),
			},
			{
				path: "user",
				name: "admin_user",
				component: () => import("@views/admin/UserView.vue"),
			},
			{
				path: "book",
				name: "admin_book",
				component: () => import("@views/admin/BookView.vue"),
			},
			{
				path: "borrow",
				name: "admin_borrow",
				component: () => import("@views/admin/BorrowView.vue"),
			},
			{
				path: "message",
				name: "admin_message",
				component: () => import("@views/admin/MessageView.vue"),
			},
		],
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@views/404View.vue"),
	},
];
