import React, { createContext, useContext } from "react";
import { IRootStore, createRootStore } from "@/stores/RootStore";

const StoreContext = createContext<IRootStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = createRootStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};

// Add hooks for other stores as you create them, e.g.:
// export const useUserStore = () => {
//   const { userStore } = useStore();
//   return userStore;
// };
