import { type FormEvent, useState } from 'react'
import { MinistryIcon } from '../components/MinistryIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_API_URL, churchInfo } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const { t, lang } = useLanguage()
  usePageMeta(`${t.contact.title} — ${churchInfo.shortName}`, t.contact.subtitle)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot — real visitors never fill this in
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const inputClasses =
    'mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-night-700 dark:bg-night-950/60 dark:text-white dark:focus:border-gold-500/60 dark:focus:ring-gold-500/40'

  const infoItems = [
    { icon: 'contact-address', title: t.contact.addressTitle, content: <span>{churchInfo.address[lang]}</span> },
    { icon: 'contact-phone', title: t.contact.phoneTitle, content: <span>{churchInfo.phone}</span> },
    {
      icon: 'contact-email',
      title: t.contact.emailTitle,
      content: (
        <a href={`mailto:${churchInfo.email}`} className="hover:underline">
          {churchInfo.email}
        </a>
      ),
    },
    {
      icon: 'contact-social',
      title: t.contact.followUs,
      content: (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href={churchInfo.facebookUrl} target="_blank" rel="noreferrer" className="hover:underline">
            Facebook
          </a>
          <a href={churchInfo.instagramUrl} target="_blank" rel="noreferrer" className="hover:underline">
            Instagram
          </a>
          <a href={churchInfo.youtubeUrl} target="_blank" rel="noreferrer" className="hover:underline">
            YouTube
          </a>
        </div>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {infoItems.map((item) => (
            <div
              key={item.icon}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-700 dark:border dark:border-gold-400/20 dark:text-gold-400">
                <MinistryIcon id={item.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
                  {item.title}
                </h3>
                <div className="mt-1 break-words text-brand-900 dark:text-white [&_a]:text-brand-700 dark:[&_a]:text-gold-300">
                  {item.content}
                </div>
              </div>
            </div>
          ))}

          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-night-800">
            <iframe
              className="h-full w-full dark:[filter:invert(90%)_hue-rotate(180deg)_brightness(85%)_contrast(90%)]"
              src={churchInfo.googleMapsEmbedSrc}
              title="Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-night-800 dark:bg-night-900/60 dark:shadow-none"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-night-300">
              {t.contact.formName}
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-night-300">
              {t.contact.formEmail}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-night-300">
              {t.contact.formMessage}
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Honeypot — hidden from real visitors via CSS, not "hidden" or
              display:none (some bots skip those specifically). */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-2 flex h-11 items-center justify-center rounded-xl bg-gold-400 px-6 text-sm font-semibold text-brand-950 shadow-[0_0_16px_rgba(214,184,108,0.3)] transition-all hover:scale-[1.02] hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === 'sending' ? t.contact.formSending : t.contact.formSend}
          </button>

          {status === 'success' && (
            <p className="text-sm font-medium text-green-700 dark:text-green-400">{t.contact.formSuccess}</p>
          )}
          {status === 'error' && (
            <p className="text-sm font-medium text-red-700 dark:text-red-400">{t.contact.formError}</p>
          )}
        </form>
      </div>
    </div>
  )
}
