interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-2 ${alignClasses}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-brand-950 sm:text-4xl dark:text-white">{title}</h2>
      {subtitle && <p className="max-w-2xl text-slate-600 dark:text-night-300">{subtitle}</p>}
    </div>
  )
}
