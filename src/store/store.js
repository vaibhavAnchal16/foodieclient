import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => {
        set(() => ({
          profile: profile,
        }));
      },
      removeToken: () => set({ profile: null }),
    }),
    {
      name: "access_token", // unique name
      // getStorage: () => sessionStorage,
    }
  )
);
