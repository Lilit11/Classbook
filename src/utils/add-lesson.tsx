import { useState } from "react";
import { useStore } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { addLesson } from "../features/classbook/classbook.slice";

export const AddLesson = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    dispatch(addLesson({title:text, ratings:[]}))
    .unwrap()//fulfilledy memoise a anum, u stex karanq eli ogtagorcenq ardyunqy
    .then(res=>{
        setText('')
    })
  };

  return (
    <div>
      <h3>Add Lesson:</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" && handleSubmit()}
      />
    </div>
  );
};
