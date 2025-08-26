import { create } from "zustand";

interface ModelStore {
	onOpen: (type: string, data?: Record<string, any>) => void;
	onClose: () => void;
	data?: Record<string, any>;
	open: boolean;
	type: string;
}

export const useModel = create<ModelStore>((set) => ({
	onOpen: (type, data = {}) => set({ open: true, type, data }),
	onClose: () => set({ open: false, type: "" }),
	open: false,
	data: {},
	type: "",
}));
