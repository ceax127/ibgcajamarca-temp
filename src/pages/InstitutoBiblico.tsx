import { MinistryIcon } from '../components/MinistryIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo, googleAds } from '../data/config'
import { dayName, weeklySchedule } from '../data/schedule'
import {
  type Course,
  type CourseStatus,
  courseStatus,
  findCourse,
  instituteProgress,
  levels,
  totalCourses,
} from '../data/seminario'
import { seoFor, usePageMeta } from '../hooks/usePageMeta'
import { trackConversion } from '../hooks/useTrackConversion'

const statusBadgeClasses: Record<CourseStatus, string> = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400',
  current: 'bg-gold-400 text-brand-950',
  upcoming: 'bg-slate-100 text-slate-600 dark:bg-night-800 dark:text-night-300',
}

const courseCardClasses: Record<CourseStatus, string> = {
  completed: 'border-green-200 bg-white dark:border-green-500/20 dark:bg-night-900',
  current: 'border-gold-400 bg-gold-400/10 ring-1 ring-gold-400/40 dark:bg-gold-400/5',
  upcoming: 'border-slate-200 bg-white dark:border-night-800 dark:bg-night-900',
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  )
}

export function InstitutoBiblico() {
  const { t, lang } = useLanguage()
  const s = t.institute
  usePageMeta(seoFor('/instituto-biblico', lang).title, seoFor('/instituto-biblico', lang).description)

  const classTime = weeklySchedule.find((item) => item.id === 'instituto-biblico')
  const currentCourse = instituteProgress.current ? findCourse(instituteProgress.current) : undefined
  const completedCourses = instituteProgress.completed
    .map(findCourse)
    .filter((course): course is Course => Boolean(course))
  const progressPercent = Math.round((completedCourses.length / totalCourses) * 100)
  const levelOf = (courseId: string) => levels.find((level) => level.courses.some((c) => c.id === courseId))

  const statusLabel: Record<CourseStatus, string> = {
    completed: s.statusCompleted,
    current: s.statusCurrent,
    upcoming: s.statusUpcoming,
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
          {s.eyebrow}
        </span>
        <h1 className="text-3xl font-bold text-brand-950 sm:text-4xl dark:bg-gradient-to-b dark:from-white dark:to-night-300 dark:bg-clip-text dark:text-transparent">
          {s.title}
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-night-300">{s.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
            {s.scheduleLabel}
          </p>
          <p className="mt-1 text-lg font-bold text-brand-900 dark:text-gold-300">
            {classTime ? `${dayName(classTime.dayOfWeek, lang)} · ${classTime.time[lang]}` : '—'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
            {s.coursesLabel}
          </p>
          <p className="mt-1 text-lg font-bold text-brand-900 dark:text-gold-300">
            {totalCourses} · {levels.length} {s.levelsLabel}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
            {s.progressLabel}
          </p>
          <p className="mt-1 text-lg font-bold text-brand-900 dark:text-gold-300">
            {s.progressValue.replace('{done}', String(completedCourses.length)).replace('{total}', String(totalCourses))}
          </p>
          <div
            className="mx-auto mt-3 h-2 w-full max-w-[12rem] overflow-hidden rounded-full bg-slate-200 dark:bg-night-800"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={s.progressLabel}
          >
            <div className="h-full rounded-full bg-gold-400" style={{ width: `${Math.max(progressPercent, 2)}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {currentCourse && (
          <div className="relative overflow-hidden rounded-2xl border border-gold-400/40 bg-brand-50 p-6 shadow-sm dark:border-gold-500/30 dark:bg-night-900 dark:shadow-none sm:p-8">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/20 blur-2xl dark:bg-gold-400/10" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-950">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-950" />
              {s.currentTitle}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-brand-950 dark:text-white">{currentCourse.title[lang]}</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-700 dark:text-gold-400">
              {s.level} {levelOf(currentCourse.id)?.number} · {levelOf(currentCourse.id)?.name[lang]} ·{' '}
              {currentCourse.hours}
              {s.hours}
            </p>
            <p className="mt-3 text-sm text-slate-700 dark:text-night-300">{currentCourse.summary[lang]}</p>
          </div>
        )}

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none sm:p-8">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
          <div className="text-gold-600 dark:text-gold-400">
            <MinistryIcon id="maestros" className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-brand-950 dark:text-white">{s.completedTitle}</h2>
          <ul className="mt-4 space-y-3">
            {completedCourses.map((course) => (
              <li key={course.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-medium text-brand-950 dark:text-white">{course.title[lang]}</p>
                  <p className="text-xs text-slate-500 dark:text-night-400">
                    {s.level} {levelOf(course.id)?.number} · {course.hours}
                    {s.hours}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow={s.curriculumEyebrow} title={s.curriculumTitle} subtitle={s.curriculumSubtitle} />
        <div className="mt-10 space-y-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-night-800 dark:bg-white/[0.02] sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-gold-300 dark:bg-gold-400 dark:text-brand-950">
                  {level.number}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
                    {s.level} {level.number}
                  </p>
                  <h3 className="text-lg font-semibold text-brand-950 dark:text-white">{level.name[lang]}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-night-300">{level.goal[lang]}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {level.courses.map((course) => {
                  const status = courseStatus(course.id)
                  return (
                    <div key={course.id} className={`rounded-xl border p-4 ${courseCardClasses[status]}`}>
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-semibold text-brand-900 dark:text-white">{course.title[lang]}</h4>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadgeClasses[status]}`}
                        >
                          {status === 'completed' && <CheckIcon className="h-3 w-3" />}
                          {statusLabel[status]}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 dark:text-night-400">{course.summary[lang]}</p>
                      <p className="mt-2 text-xs font-medium text-slate-500 dark:text-night-400">
                        {course.hours}
                        {s.hours}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden rounded-2xl border border-gold-400/30 bg-brand-50 p-8 text-center shadow-sm dark:border-gold-500/30 dark:bg-night-900 dark:shadow-none">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
        <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl dark:text-white">{s.ctaTitle}</h2>
        <p className="mx-auto mt-2 max-w-xl text-lg font-semibold text-gold-700 dark:text-gold-400">
          {s.ctaText.split('{time}')[0]}
          <span className="whitespace-nowrap">{classTime?.time[lang]}</span>
          {s.ctaText.split('{time}')[1]}
        </p>
        <p className="mx-auto mt-2 inline-flex max-w-xl items-center gap-1.5 text-sm text-slate-600 dark:text-night-300">
          <MinistryIcon id="contact-address" className="h-4 w-4 shrink-0" />
          {churchInfo.address[lang]}
        </p>
        <div>
          <a
            href={churchInfo.googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackConversion(googleAds.directions.sendTo)}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gold-400 px-6 text-sm font-semibold text-brand-950 shadow-[0_0_16px_rgba(214,184,108,0.3)] transition-all hover:scale-[1.02] hover:bg-gold-300"
          >
            {t.contact.getDirections} ↗
          </a>
        </div>
      </div>
    </div>
  )
}
