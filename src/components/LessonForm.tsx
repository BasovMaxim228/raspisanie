import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { addLesson, updateLesson } from "../store/lessonsSlice";
import { DAYS, type DayOfWeek, type Lesson } from "../types";

interface LessonFormProps {
  editingLesson: Lesson | null;
  onClose: () => void;
}

const emptyLesson = (): Lesson => ({
  id: crypto.randomUUID(),
  subject: "",
  teacher: "",
  room: "",
  day: "monday",
  startTime: "8:30",
  endTime: "10:10",
  task: "",
  taskDone: false,
});

export default function LessonForm({
  editingLesson,
  onClose,
}: LessonFormProps) {
  const dispatch = useAppDispatch();
  const [lesson, setLesson] = useState<Lesson>(() =>
    editingLesson ? { ...editingLesson } : emptyLesson()
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lesson.subject.trim()) return;

    if (editingLesson) {
      dispatch(updateLesson(lesson));
    } else {
      dispatch(addLesson(lesson));
    }
    onClose();
  }

  const inputClass =
    "w-full bg-[#232329] border border-[#2a2a32] text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1f] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-3 border border-[#2a2a32] shadow-2xl shadow-black/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {editingLesson ? "Редактировать" : "Новое занятие"}
          </h2>
          <div className="w-10 h-1 rounded-full bg-[#2a2a32] sm:hidden" />
        </div>

        <input
          className={inputClass}
          placeholder="Предмет"
          value={lesson.subject}
          onChange={(event) =>
            setLesson({ ...lesson, subject: event.target.value })
          }
        />
        <input
          className={inputClass}
          placeholder="Преподаватель"
          value={lesson.teacher}
          onChange={(event) =>
            setLesson({ ...lesson, teacher: event.target.value })
          }
        />
        <input
          className={inputClass}
          placeholder="Кабинет"
          value={lesson.room}
          onChange={(event) =>
            setLesson({ ...lesson, room: event.target.value })
          }
        />

        <select
          className={inputClass}
          value={lesson.day}
          onChange={(event) =>
            setLesson({ ...lesson, day: event.target.value as DayOfWeek })
          }
        >
          {DAYS.map((d) => (
            <option key={d.key} value={d.key}>
              {d.label}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="time"
            className={inputClass}
            value={lesson.startTime}
            onChange={(event) =>
              setLesson({ ...lesson, startTime: event.target.value })
            }
          />
          <input
            type="time"
            className={inputClass}
            value={lesson.endTime}
            onChange={(event) =>
              setLesson({ ...lesson, endTime: event.target.value })
            }
          />
        </div>

        <textarea
          className={inputClass}
          placeholder="Задание"
          rows={3}
          value={lesson.task}
          onChange={(event) =>
            setLesson({ ...lesson, task: event.target.value })
          }
        />

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#232329] text-gray-300 font-medium border border-[#2a2a32] hover:bg-[#2a2a32] transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-amber-400 text-black font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
