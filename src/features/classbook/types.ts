
export interface IState{
    lessons:ILesson[]
}

export interface ILesson{
    id:string
    title:string
    ratings:IRating[]
}

export interface IRating{
    id:string
    student:string
    rate:number
}

export interface InputRate{
    student:string
    rate:number,
    lessonId:string
}
export type InputLesson = Omit<ILesson, 'id'>