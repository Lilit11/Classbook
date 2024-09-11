import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IState, IStudent, InputStudent } from "./types";
import axios from "axios";

const initialState:IState ={
    list:[]
}
export const getAllStudents = createAsyncThunk('students/get', async ()=>{
    const response = await axios.get('http://localhost:3008/students')
    return response.data
})
export const addStudent = createAsyncThunk('students/add', async (param:InputStudent)=>{
    const response = await axios.post('http://localhost:3008/students', param)
    return response.data
})
const StudenSlice = createSlice({
    name:'students',
    initialState,
    reducers:{},
    extraReducers:builder =>{
        builder
        .addCase(getAllStudents.fulfilled,(state, action)=>{
           state.list = action.payload
            
        })
        .addCase(addStudent.fulfilled,(state, action)=>{
            state.list.push(action.payload)
        })
    }
})

export const studentReducer = StudenSlice.reducer