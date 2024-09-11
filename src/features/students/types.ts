import { type } from "@testing-library/user-event/dist/cjs/utility/type.js"

export interface IStudent{
    id:string
    name:string
    surname:string
}

export interface IState {
    list:IStudent[]
}

export type InputStudent = Omit <IStudent, 'id'>