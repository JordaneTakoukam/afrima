import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Heart, Hand, Award, Globe2 } from 'lucide-react';
import { AdinkraPattern } from '@/components/shared/AdinkraPattern';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10">
        <AdinkraPattern opacity={0.07} />
        <div className="relative mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-clay">{t('kicker')}</div>
          <h1 className="mt-3 font-display text-6xl leading-[0.95] md:text-9xl">{t('title')}</h1>
          <p className="mt-6 max-w-2xl text-ink/80 md:text-lg">{t('subtitle')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <h2 className="font-display text-3xl md:text-5xl">{t('valuesTitle')}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Value Icon={Heart} title={t('value1')} body={t('value1Body')} />
          <Value Icon={Award} title={t('value2')} body={t('value2Body')} />
          <Value Icon={Hand} title={t('value3')} body={t('value3Body')} />
          <Value Icon={Globe2} title={t('value4')} body={t('value4Body')} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <h2 className="font-display text-3xl md:text-5xl">{t('missionTitle')}</h2>
        <p className="mt-6 text-ink/80 leading-relaxed md:text-lg">
          {locale === 'fr'
            ? "AFRIMA est née d'un constat simple : les artisans africains font des pièces extraordinaires, mais leur part de la valeur finale frôle souvent zéro. Le wax que vous achetez à Paris a fait trois ou quatre intermédiaires. Le karité que vous mettez sur votre peau a quitté la coopérative à 1 300 FCFA pour finir vendu à 23 000 FCFA. Nous coupons la chaîne. Direct artisan, marges transparentes, fair-trade non négociable."
            : "AFRIMA started from a simple observation: African artisans make extraordinary pieces, but their share of the final value is often near zero. The wax fabric you buy in Paris went through three or four middlemen. The shea butter on your skin left the cooperative at 1,300 FCFA to be sold at 23,000 FCFA. We cut the chain. Direct from artisan, transparent margins, fair-trade non-negotiable."}
        </p>
      </section>

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
          <h2 className="font-display text-3xl md:text-5xl">{t('teamTitle')}</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { name: 'Idriss Jordane', role: 'Founder' },
              { name: 'Aïsha B.', role: 'Sourcing lead' },
              { name: 'Kojo M.', role: 'Design' },
              { name: 'Léa T.', role: 'Operations' },
            ].map((p) => (
              <div key={p.name} className="flex flex-col gap-1 border-l-2 border-ochre pl-4">
                <div className="font-display text-xl">{p.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-bone/60">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Value({ Icon, title, body }: { Icon: typeof Heart; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Icon className="h-6 w-6 text-clay" />
      <div className="font-display text-xl leading-tight">{title}</div>
      <p className="text-sm text-ink/70">{body}</p>
    </div>
  );
}
