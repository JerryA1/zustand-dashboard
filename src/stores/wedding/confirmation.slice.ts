import { StateCreator } from "zustand";

export interface ConfirmationSlice {
  isConfirmed: boolean;
  setIsConfirmed: (confirmed: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
  set
) => ({
  isConfirmed: false,
  setIsConfirmed: (confirmed: boolean) => set({ isConfirmed: confirmed }),
});
