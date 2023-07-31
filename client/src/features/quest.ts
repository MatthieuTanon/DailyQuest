import { createSlice } from '@reduxjs/toolkit';

export class Quest {
    id?: string;
    name: string = '';
    description: string = '';

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

export interface Quest {
    id?: string;
    name: string;
    description: string;
}

export const QUEST_API = 'http://localhost:3000/api/quest';

const initialQuestState: Quest[] = [];

export const questSlice = createSlice({
    name: 'quest',
    initialState: { value: initialQuestState },
    reducers: {
        setQuests: (state, action) => {
            state.value = JSON.parse(action.payload);
        }, 
        addQuest: (state, action) => {
            state.value.push({ id: '1', name: action.payload.name, description: action.payload.description });
        },
        editQuest: (state, action) => {
            const editedQuest: Quest = { ...action.payload };
            state.value = state.value.map(quest => quest.id === action.payload.id ? editedQuest : quest);
        },
        deleteQuest: (state, action) => {
            state.value = state.value.filter(quest => quest.id !== action.payload.id);
        }
    }
})

export const { addQuest, setQuests, editQuest, deleteQuest } = questSlice.actions;

export default questSlice.reducer;