'use client';

import { useTranslations } from 'next-intl';
import { useSectionInView } from '@/utils/hooks/useSectionInView';

const contacts = [
  {
    label: 'contacts.locationLabel',
    value: 'contacts.locationValue',
    type: 'text',
  },
  {
    label: 'contacts.mailLabel',
    value: 'contacts.mailValue',
    type: 'email',
    href: 'mailto:mail@govgames.gov.kg',
  },
  {
    label: 'contacts.phoneLabel',
    value: 'contacts.phoneValue',
    type: 'phone',
    href: 'tel:+99631212345',
  },
];

export const ContactsPage = () => {
  const t = useTranslations();
  const { ref } = useSectionInView('contacts', 0.5);

  return (
    <section
      id="contacts"
      ref={ref}
      className="flex w-full flex-col scroll-mt-28 pb-20"
    >
      <h2
        className="
          ml-20
          text-start
          text-[200px]
          font-bold
          bg-gradient-to-b from-white/10 via-white/20 to-white/5
          bg-clip-text text-transparent
        "
      >
        {t('contacts.contacts')}
      </h2>
      

      <div
        className="
          mx-auto
          flex w-[85%] flex-col gap-8
          rounded-xl
          border-2 border-solid border-white/50
          bg-gradient-to-r from-white/10 via-white/20 to-white/30
          p-8
        "
      >
        <div className="flex w-full gap-10">
          {contacts.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-xl font-normal text-white">
                {t(item.label)}
              </span>

              {item.type === 'text' && (
                <span className="text-lg font-light text-white/70">
                  {t(item.value)}
                </span>
              )}

              {(item.type === 'email' || item.type === 'phone') && (
                <a
                  href={item.href}
                  className="text-lg text-white/70 transition-colors hover:text-white"
                >
                  {t(item.value)}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="h-96 w-full overflow-hidden rounded-xl">
          <iframe
           src="https://widgets.2gis.com/widget?type=firm&id=70000001077834451"
            loading="lazy"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
};