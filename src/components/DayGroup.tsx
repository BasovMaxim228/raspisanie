import type { Lesson, DayOfWeek } from "../types.js";
import { DAYS } from "../types.js";
import LessonCard from "./LessonCard";

interface DayGroupProps {
  day: DayOfWeek;
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
}

export default function DayGroup({ day, lessons, onEdit }: DayGroupProps) {
  const today = new Date();
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const isToday = DAYS[todayIndex]?.key === day;
  const dayLabel = DAYS.find((d) => d.key === day)?.label ?? day;

  return (
    <section className="mb-6">
      <h2
        className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
          isToday ? "text-amber-400" : "text-gray-500"
        }`}
      >
        {isToday && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        )}
        {dayLabel}
        {isToday && (
          <span className="ml-1 text-xs font-medium text-amber-400/70 normal-case tracking-normal">
            сегодня
          </span>
        )}
      </h2>
      {lessons.length === 0 ? (
        <p className="text-sm text-gray-600 italic pl-3 border-l-2 border-[#2a2a32]">
          Занятий нет
        </p>
      ) : (
        lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onEdit={onEdit} />
        ))
      )}
    </section>
  );
}
