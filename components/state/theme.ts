import { ThemeState } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const options = {
    name: 'theme',
    storage: createJSONStorage(() => sessionStorage),
    merge: (persistedState: any, currentState: any) => ({ ...currentState, ...(persistedState) }),
}

const management = persist((set) => ({
    theme: 'light', 
    setTheme: (theme: string) => set(() => { return { theme: theme } })
}), options)

//@ts-ignore
export const useTheme = create<ThemeState>(management);
