import { LiveSermon } from '../components/LiveSermon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'

export function Sermons() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.sermons.title} subtitle={t.sermons.subtitle} />
      <div className="mt-10">
        <LiveSermon variant="full" />
      </div>
    </div>
  )
}
