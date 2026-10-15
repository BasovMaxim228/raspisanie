import type { Lesson } from "../types";

interface LessonState {
  items: Lesson[];
}

export const mockLessons: Lesson[] = [
  {
    id: "1",
    subject: "Управление проектами",
    teacher: "Буйницкий П.Е.",
    room: "40",
    day: "wednesday",
    startTime: "8:30",
    endTime: "10.10",
    task: "",
    taskDone: false,
  },
  {
    id: "2",
    subject: "Проектирование и дизайн",
    teacher: "Буйницкий П.Е.",
    room: "40",
    day: "wednesday",
    startTime: "10:20",
    endTime: "12:00",
    task: "",
    taskDone: false,
  },
  {
    id: "3",
    subject: "Разработка кода ",
    teacher: "Буйницкий П.Е.",
    room: "40",
    day: "wednesday",
    startTime: "13:00",
    endTime: "14:40",
    task: "Отправить код на GitHub",
    taskDone: false,
  },
];
