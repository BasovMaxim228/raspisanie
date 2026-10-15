import { useAppDispatch } from "../store/hooks";
import { deleteLesson, toggleTaskDone } from "../store/lessonsSlice";
import type { Lesson } from "../types";

interface LessonCardProps {
  lesson: Lesson;
  onEdit: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, onEdit }: LessonCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="animate-fade-in bg-[#1a1a1f] rounded-2xl p-5 mb-3 border border-[#2a2a32] shadow-lg shadow-black/30 hover:border-amber-400/40 hover:shadow-amber-400/10 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-semibold text-black bg-amber-400 px-3 py-1 rounded-full">
          {lesson.startTime} — {lesson.endTime}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-1">
        {lesson.subject}
      </h3>
      <p className="text-sm text-gray-400 mb-1">{lesson.teacher}</p>
      <p className="text-sm text-gray-500">
        <span className="text-gray-400">Кабинет:</span> {lesson.room}
      </p>

      {lesson.task && (
        <div className="mt-4 pt-4 border-t border-[#2a2a32]">
          <p className="text-xs uppercase tracking-wide text-amber-400/80 mb-2 font-medium">
            Задание
          </p>
          <p
            className={`text-sm leading-relaxed ${
              lesson.taskDone ? "line-through text-gray-600" : "text-gray-200"
            }`}
          >
            {lesson.task}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#2a2a32]">
        {lesson.task && (
          <button
            onClick={() => dispatch(toggleTaskDone(lesson.id))}
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 font-medium border border-amber-400/20 hover:bg-amber-400/20 transition-colors"
          >
            {lesson.taskDone ? "Снять отметку" : "Выполнено"}
          </button>
        )}
        <button
          onClick={() => onEdit(lesson)}
          className="text-xs px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 font-medium border border-amber-400/20 hover:bg-amber-400/20 transition-colors"
        >
          Изменить
        </button>
        <button
          onClick={() => dispatch(deleteLesson(lesson.id))}
          className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 font-medium border border-red-500/20 hover:bg-red-500/20 transition-colors"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
