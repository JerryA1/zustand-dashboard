import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useWeddingBoundStore } from "../wedding";
// import { customSessionStorage } from "../storages/session.store";
// import { firebaseStorage } from "../storages/firebase.store";
// import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  // logger(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      // storage: firebaseStorage,
    })
  )
  // )
);

usePersonStore.subscribe((nextState, /* prevState */) => {
  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName)
  useWeddingBoundStore.getState().setLastName(lastName)
});
