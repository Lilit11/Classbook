import { Link, redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addStudent } from "./students.slice";
import { useForm } from 'react-hook-form';

export const Students = () => {
    const navigate = useNavigate()
    interface FormData {
        name:string,
        surname:string
    }
    const {register, handleSubmit, reset} = useForm<FormData>()

const dispatch = useAppDispatch()

    const onSubmit =(data:FormData)=>{
        dispatch(addStudent({name:data.name, surname:data.surname}))
        .unwrap()
        .then(res=>{
            reset()
            navigate('/')
        })
    }
  return (
    <>
      <Link to={"/"}>classbook</Link>

      <h3>Students</h3>

      <form  onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="enter a name" 
        {...register("name")}
        />
        <input placeholder="enter a surname" 
        {...register("surname")}
        />
        <button>Add</button>
      </form>
    </>
  );
};
