/* eslint-disable @nx/enforce-module-boundaries */
import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TLoginSchema } from 'libs/contract/src/auth/schema';

interface ILogin {
  user: TLoginSchema | null;
  login: (userData: TLoginSchema) => void;
}

const initialUserState: TLoginSchema | null = null;

const useLoginStore = create<ILogin>()(
  persist(
    (set) => ({
      user: initialUserState,
      login: (userData) => set({ user: userData }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLoginStore;
