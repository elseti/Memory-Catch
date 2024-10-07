import {create} from 'zustand';

interface Lives {
    lives: number;
    incrementLife: () => void;
    decrementLife: () => void;
    setLives: (lives: number) => void;

    level: number;
    incrementLevel: () => void;
    decrementLevel: () => void;
    setLevel: (level: number) => void;
}

export const useStore = create<Lives>((set) => ({
    lives: 3,
    incrementLife: () => {
        set((state) => ({lives: state.lives + 1}))
    },
    decrementLife: () => {
        set((state) => ({lives: state.lives - 1}))
    },
    setLives: (lives) => set({ lives }),

    level: 1,
    incrementLevel: () => {
        set((state) => ({level: state.level + 1}))
    },
    decrementLevel: () => {
        set((state) => ({level: state.level - 1}))
    },
    setLevel: (level) => set({level}),

}));