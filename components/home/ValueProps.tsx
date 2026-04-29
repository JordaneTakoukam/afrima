import { useTranslations } from 'next-intl';
import { Globe2, Hand, Award, Plane } from 'lucide-react';

export function ValueProps() {
  const t = useTranslations('ValueProps');
  const items = [
    { Icon: Globe2, title: t('p1Title'), body: t('p1Body') },
    { Icon: Hand, title: t('p2Title'), body: t('p2Body') },
    { Icon: Award, title: t('p3Title'), body: t('p3Body') },
    { Icon: Plane, title: t('p4Title'), body: t('p4Body') },
  ];
  return (
    <section className="border-y border-ink/15 bg-bone-deep">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-4 py-12 md:grid-cols-4 md:px-8">
        {items.map(({ Icon, title, body }) => (
          <div key={title} className="flex flex-col items-start gap-3 px-4">
            <Icon className="h-6 w-6 text-clay" />
            <div>
              <div className="font-display text-lg">{title}</div>
              <div className="text-sm text-ink/70">{body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
