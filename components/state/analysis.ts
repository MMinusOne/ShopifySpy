import { AnalysisState, Product } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const options = {
    name: 'analysis',
    storage: createJSONStorage(() => sessionStorage),
    merge: (persistedState: any, currentState: any) => ({ ...currentState, ...(persistedState) }),
}

const management = persist((set) => ({
    websiteUrl: '',
    products: [],
    setWebsiteUrl: (url: string) => set((state: AnalysisState) => { return { ...state, websiteUrl: url } }),
    setProducts: (products: Product[]) => set((state: AnalysisState) => { return { ...state, products } }),
}), options)

//@ts-ignore
export const useAnalysis = create<AnalysisState>(management);
