import yapeQr from '../assets/yape_qr.png'
import { MinistryIcon } from '../components/MinistryIcon'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo, givingInfo } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

export function Giving() {
  const { t } = useLanguage()
  usePageMeta(`${t.giving.title} — ${churchInfo.shortName}`, t.giving.subtitle)

  const accounts = [
    { title: t.giving.solesAccountTitle, account: givingInfo.bcpSoles },
    { title: t.giving.dollarsAccountTitle, account: givingInfo.bcpDollars },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
          {t.giving.eyebrow}
        </span>
        <h1 className="text-3xl font-bold text-brand-950 sm:text-4xl dark:bg-gradient-to-b dark:from-white dark:to-night-300 dark:bg-clip-text dark:text-transparent">
          {t.giving.title}
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-night-300">{t.giving.subtitle}</p>
      </div>

      {/* Verse — same gold-accented "standalone message" treatment used for
          the giving note on the About page. */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-gold-400/30 bg-brand-50 p-6 text-center shadow-sm dark:border-gold-500/30 dark:bg-night-900 dark:shadow-none sm:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
        <p className="mx-auto max-w-xl text-sm italic text-slate-700 dark:text-night-300 sm:text-base">
          “{t.giving.verseQuote}”
        </p>
        <p className="mt-2 text-xs font-medium text-gold-700 dark:text-gold-400">{t.giving.verseRef}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* Yape */}
        <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none sm:p-8">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
          <div className="text-gold-600 dark:text-gold-400">
            <MinistryIcon id="smartphone" className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-brand-950 dark:text-white">
            {t.giving.yapeTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-night-300">{t.giving.yapeDesc}</p>

          <img
            src={yapeQr}
            alt={t.giving.scanQr}
            className="mt-6 h-48 w-48 rounded-xl border border-slate-200 dark:border-night-700"
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-night-400">{t.giving.scanQr}</p>

          <div className="mt-6 w-full border-t border-slate-200 pt-4 dark:border-night-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
              {t.giving.yapePhoneLabel}
            </p>
            <p className="mt-1 select-all text-lg font-semibold text-brand-950 dark:text-white">
              {churchInfo.phone}
            </p>
          </div>
        </div>

        {/* Bank transfer */}
        <div className="flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
            <div className="text-gold-600 dark:text-gold-400">
              <MinistryIcon id="bank" className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-brand-950 dark:text-white">
              {t.giving.bankTransferTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-night-300">{t.giving.bankTransferDesc}</p>
          </div>

          {accounts.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none"
            >
              <h3 className="text-base font-semibold text-brand-950 dark:text-white">{item.title}</h3>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
                    {t.giving.accountNumberLabel}
                  </p>
                  <p className="mt-1 select-all font-mono text-sm text-brand-900 dark:text-gold-300">
                    {item.account.accountNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
                    {t.giving.interbankNumberLabel}
                  </p>
                  <p className="mt-1 select-all font-mono text-sm text-brand-900 dark:text-gold-300">
                    {item.account.interbank}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
