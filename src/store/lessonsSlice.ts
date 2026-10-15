import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Lesson } from "../types";

interface LessonState {
  items: Lesson[];
}

const initialState: LessonState = {
  items: [],
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    addLesson(state, action: PayloadAction<Lesson>) {
      state.items.push(action.payload);
    },
    updateLesson(state, action: PayloadAction<Lesson>) {
      const index = state.items.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteLesson(state, action: PayloadAction<string>) {
      state.items = state.items.filter((l) => l.id !== action.payload);
    },
    toggleTaskDone(state, action: PayloadAction<string>) {
      const lesson = state.items.find((l) => l.id === action.payload);
      if (lesson) {
        lesson.taskDone = !lesson.taskDone;
      }
    },
  },
});

export const { addLesson, updateLesson, deleteLesson, toggleTaskDone } =
  lessonsSlice.actions;

export default lessonsSlice.reducer;
