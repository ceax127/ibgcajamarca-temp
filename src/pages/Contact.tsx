import { type FormEvent, useState } from 'react'
import { MinistryIcon } from '../components/MinistryIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_API_URL, churchInfo } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const { t } = useLanguage()
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
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-white dark:focus:border-gold-400 dark:focus:ring-gold-400'

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-gold-600 dark:text-gold-400">
                <MinistryIcon id="contact-address" className="h-4 w-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">{t.contact.addressTitle}</h3>
              </div>
              <p className="mt-2 break-words text-slate-700 dark:text-night-300">{churchInfo.address}</p>
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-gold-600 dark:text-gold-400">
                <MinistryIcon id="contact-phone" className="h-4 w-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">{t.contact.phoneTitle}</h3>
              </div>
              <p className="mt-2 break-words text-slate-700 dark:text-night-300">{churchInfo.phone}</p>
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-gold-600 dark:text-gold-400">
                <MinistryIcon id="contact-email" className="h-4 w-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">{t.contact.emailTitle}</h3>
              </div>
              <a
                href={`mailto:${churchInfo.email}`}
                className="mt-2 block break-words text-brand-700 hover:underline dark:text-gold-300"
              >
                {churchInfo.email}
              </a>
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-gold-600 dark:text-gold-400">
                <MinistryIcon id="contact-social" className="h-4 w-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">{t.contact.followUs}</h3>
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <a
                  href={churchInfo.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-700 hover:underline dark:text-gold-300"
                >
                  Facebook
                </a>
                <a
                  href={churchInfo.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-700 hover:underline dark:text-gold-300"
                >
                  Instagram
                </a>
                <a
                  href={churchInfo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-700 hover:underline dark:text-gold-300"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-night-800">
            <iframe
              className="h-full w-full"
              src={churchInfo.googleMapsEmbedSrc}
              title="Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 p-6 dark:border-night-800 dark:bg-night-900"
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
            className="mt-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
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
