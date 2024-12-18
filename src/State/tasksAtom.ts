import { atom } from 'recoil';

export interface Task {
    id: number;
    name: string;
    completed: boolean;
}

export const tasksAtom = atom<Task[]>({
    key: 'tasksState',
    default: [],
});
