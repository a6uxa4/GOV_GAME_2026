'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSectionInView } from '@/utils/hooks/useSectionInView';

const sponsors = [
  {
    titleKey: 'sponsors.generalSponsor',
    bg: '/sponsors1.png',
    logo: '/HP-Logo.svg',
    alt: 'HP',
    glowColor: '#2346C166',
  },
  {
    titleKey: 'sponsors.generalSponsor',
    bg: '/sponsors2.png',
    logo: '/hewlett-packard.svg',
    alt: 'Hewlett Packard Enterprise',
    glowColor: '#FF168666',
  },
  {
    titleKey: 'sponsors.officialPartner',
    bg: '/sponsors3.png',
    logo: '/Contest-logo.svg',
    alt: 'Contest',
    glowColor: '#FB16FF66',
  },
];

export const SponsorsPage = () => {
  const t = useTranslations();
  const { ref } = useSectionInView('sponsors', 0.5);

  return (
    <section id="sponsors" ref={ref} className="w-full scroll-mt-28">
      <div className="mx-auto flex w-[80%] items-start justify-around gap-10">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="mb-4 text-lg text-white/70">
              {t(sponsor.titleKey)}
            </span>

            <div className="flex flex-col items-center">
              <Image
                src={`/sponsors-gradient${index + 1}.png`}
                alt=""
                width={587}
                height={587}
                className="pointer-events-none object-contain -mb-62.5"
              />

              <div className="relative z-10">
                <Image
                  src={sponsor.bg}
                  alt={sponsor.bg}
                  width={334}
                  height={208}
                  className="object-contain"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.alt}
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};