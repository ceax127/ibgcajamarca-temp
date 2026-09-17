import { type FormEvent, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'

export function Contact() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Mensaje de ${name || 'sitio web'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${churchInfo.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                {t.contact.addressTitle}
              </h3>
              <p className="mt-2 break-words text-slate-700">{churchInfo.address}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                {t.contact.phoneTitle}
              </h3>
              <p className="mt-2 break-words text-slate-700">{churchInfo.phone}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                {t.contact.emailTitle}
              </h3>
              <a
                href={`mailto:${churchInfo.email}`}
                className="mt-2 block break-words text-brand-700 hover:underline"
              >
                {churchInfo.email}
              </a>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                {t.contact.followUs}
              </h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <a href={churchInfo.facebookUrl} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                  Facebook
                </a>
                <a href={churchInfo.instagramUrl} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                  Instagram
                </a>
                <a href={churchInfo.youtubeUrl} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              className="h-full w-full"
              src={churchInfo.googleMapsEmbedSrc}
              title="Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              {t.contact.formName}
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              {t.contact.formEmail}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              {t.contact.formMessage}
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
          >
            {t.contact.formSend}
          </button>
          <p className="text-xs text-slate-500">{t.contact.formNote}</p>
        </form>
      </div>
    </div>
  )
}
