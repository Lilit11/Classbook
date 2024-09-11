import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { getAllStudents } from "../students/students.slice";
import { getAllLessons } from "./classbook.slice";
import styles from "./styles.module.css";
import { AddLesson } from "../../utils/add-lesson";
import { Modal } from "../../utils/modal";

export const ClassBook = () => {
  const students = useAppSelector((state) => state.students.list);
  const lessons = useAppSelector((state) => state.classbook.lessons);
  const empty = new Array(12 - lessons.length).fill(null);
  const [isModalVisible, setisModalVisible] = useState<boolean>(false);
  const [lessonId, setLessonId] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getAllLessons());
  }, []);

  const handleClick = (
    lessonId: string,
    studentId: string,
    rate: number | undefined
  ) => {
    if (!rate) {
      setisModalVisible(true);
      setStudentId(studentId);
      setLessonId(lessonId);
    }
  };
  return (
    <>
      <Link to={"/students"}>Students</Link>
      <h3>classbook</h3>
      <p>Students {students.length}</p>
      <p>Lessons {lessons.length}</p>
      <AddLesson />
      <Modal
        isOpen={isModalVisible}
        onClose={() => setisModalVisible(false)}
        studentId={studentId}
        lessonId={lessonId}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th rowSpan={2}>student</th>
            <th colSpan={12}>lessons</th>
          </tr>
          <tr>
            {lessons.map((lesson) => (
              <th key={lesson.id} className={styles.vertical}>
                {lesson.title}
              </th>
            ))}

            {empty.map((less, index) => (
              <th key={index}></th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                {student.name} 
                <span> </span>
                {student.surname}
              </td>
              {lessons.map((lesson) => {
                const found = lesson.ratings.find(
                  (rate) => rate.student === student.id
                );
                return (
                  <td
                    key={lesson.id}
                    onClick={() =>
                      handleClick(lesson.id, student.id, found?.rate)
                    }
                  >
                    {found?.rate || "-"}
                  </td>
                );
              })}
              {empty.map((emp, i) => (
                <td key={i}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
