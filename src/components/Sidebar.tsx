import classNames from "classnames";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { data } = useGetLessonsQuery();

  return (
    <aside className={classNames('transform bottom-0 right-0 fixed h-[calc(100%-3.5rem-1px)] overflow-auto ease-in-out transition-all duration-300 z-50 w-full bg-gray-700 p-6 border-gray-600 lg:w-[348px] lg:border-l lg:relative lg:h-auto', {
      'translate-x-0': isOpen,
      'translate-x-full': !isOpen,
    })}>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-600 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
          />
        ))}
      </div>
    </aside>
  )
}