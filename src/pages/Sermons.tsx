import { LiveSermon } from '../components/LiveSermon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { seoFor, usePageMeta } from '../hooks/usePageMeta'

export function Sermons() {
  const { t, lang } = useLanguage()
  usePageMeta(seoFor('/sermones', lang).title, seoFor('/sermones', lang).description)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.sermons.title} subtitle={t.sermons.subtitle} />
      <div className="mt-10">
        <LiveSermon variant="full" />
      </div>
    </div>
  )
}
