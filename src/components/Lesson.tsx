import classNames from "classnames";
import { format, isPast } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'class' | 'live'
}

export function Lesson({title, slug, availableAt, type}: LessonProps) {
  const { slug: currentSlug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt)
  let formattedAvailableDate = format(
    availableAt,
    "EEEE' • 'dd' de 'MMMM' • 'hh'h'mm",
    {
      locale: ptBR,
    }
  )

  const isActiveLesson = currentSlug === slug

  return (
    <Link to={`/event/lesson/${slug}`} className='group'>
      <span className="text-gray-300">
        {formattedAvailableDate.at(0)?.toUpperCase() + formattedAvailableDate.slice(1)}
      </span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500' : isActiveLesson,
        })}
      >
        <header className="flex items-center justify-between">
          {
            isLessonAvailable ? (
              <span className={classNames('text-sm font-medium flex items-center gap-2', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson,
              })}>
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em breve
              </span>
            )
          }
          

          <span className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border font-bold uppercase', {
            'border-green-300': !isActiveLesson,
            'border-white': isActiveLesson,
          })}>
            {type === 'live' ? 'Ao Vivo' : 'Aula Prática'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white' : isLessonAvailable,
          'text-gray-200' : !isLessonAvailable,
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}