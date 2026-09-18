import { LiveSermon } from '../components/LiveSermon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

export function Sermons() {
  const { t } = useLanguage()
  usePageMeta(`${t.sermons.title} — ${churchInfo.shortName}`, t.sermons.subtitle)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.sermons.title} subtitle={t.sermons.subtitle} />
      <div className="mt-10">
        <LiveSermon variant="full" />
      </div>
    </div>
  )
}
