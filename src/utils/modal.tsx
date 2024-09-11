import { useEffect, useState } from "react";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { addRate } from "../features/classbook/classbook.slice";
import { useAppDispatch } from "../app/hooks";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;
  studentId: string;
}
export const Modal = ({ isOpen, onClose, lessonId, studentId }: IProps) => {
  const [grade, setGrade] = useState<number>(1);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const root = document.getElementById("modal-root");
    setModalRoot(root);
  }, []);

  const handleClose = (grade: number) => {
    if (grade) {
      onClose();
      dispatch(
        addRate({ lessonId: lessonId, student: studentId, rate: grade })
      );
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      {isOpen && (
        <>
          <p>Please enter the mark </p>
          {grade && (
            <p> {grade < 4 ? "bad" : grade <= 7 ? "good" : "excellent"}</p>
          )}

          <select
            value={grade || ""}
            onChange={(e) => setGrade(Number(e.target.value))}
          >
            <option value="" disabled>
              {" "}
              select a grade
            </option>
            {[...Array(10)].map((elm, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button onClick={() => handleClose(grade)}>submit</button>
        </>
      )}
    </div>,
    modalRoot
  );
};
