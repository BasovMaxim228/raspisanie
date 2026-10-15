import { DAYS } from "../types.js";
import type { Lesson } from "../types.js";
import { useAppSelector } from "../store/hooks.js";
import DayGroup from "../components/DayGroup.js";
import LessonForm from "../components/LessonForm.js";
import { useState } from "react";

export default function ScheduleScreen() {
  const lessons = useAppSelector((state) => state.lessons.items);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Lesson | null>(null);

  function handleEdit(lesson: Lesson) {
    setEditing(lesson);
    setShowForm(true);
  }

  function handleClose() {
    setEditing(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">MySchedule</h1>
      </header>

      <main className="p-4">
        {DAYS.map((day) => {
          const dayLessons = lessons
            .filter((lesson) => lesson.day === day.key)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <DayGroup
              key={day.key}
              day={day.key}
              lessons={dayLessons}
              onEdit={handleEdit}
            />
          );
        })}
      </main>

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg z-20"
      >
        +
      </button>

      {showForm && <LessonForm editingLesson={editing} onClose={handleClose} />}
    </div>
  );
}
