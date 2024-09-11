import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IState, InputLesson, InputRate } from "./types";
import axios from "axios";
import { act } from "react";

const initialState: IState = {
  lessons: [],
};
export const getAllLessons = createAsyncThunk("classbook/get", async () => {
  const response = await axios.get("http://localhost:3008/lessons");
  return response.data;
});

export const addLesson = createAsyncThunk(
  "classbook/add",
  async (param: InputLesson) => {
    const response = await axios.post("http://localhost:3008/lessons", param);
    return response.data;
  }
);

export const addRate = createAsyncThunk(
  "classbook/addRate",
  async (param: InputRate) => {
    const newRating = {
      id: Date.now(),
      student: param.student,
      rate: param.rate,
    };

    const responseOne = await axios.get(
      `http://localhost:3008/lessons/${param.lessonId}`
    );
    const updatedRatings = [...responseOne.data.ratings, newRating];
    const response = await axios.patch(
      `http://localhost:3008/lessons/${param.lessonId} `,
      { ratings: updatedRatings }
    );

    return response.data;
  }
);
const ClassBookSlice = createSlice({
  name: "classbook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      })
      .addCase(addRate.fulfilled, (state, action) => {
        state.lessons.forEach((less) => {
          if (less.id == action.payload.id) {
            less.ratings = action.payload.ratings;
          }
        });
      });
  },
});

export const classReducer = ClassBookSlice.reducer;
