'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSectionInView } from '@/utils/hooks/useSectionInView';

const sponsors = [
  {
    titleKey: 'sponsors.generalSponsor',
    logo: '/HP-Logo.svg',
    alt: 'HP',
    glowColor: '#3B82F6',
  },
  {
    titleKey: 'sponsors.generalSponsor',
    logo: '/hewlett-packard.svg',
    alt: 'Hewlett Packard Enterprise',
    glowColor: '#EC4899', 
  },
  {
    titleKey: 'sponsors.officialPartner',
    logo: '/Contest-logo.svg',
    alt: 'Contest',
    glowColor: '#A855F7',
  },
];

export const SponsorsPage = () => {
  const t = useTranslations();
  const { ref } = useSectionInView('sponsors', 0.5);

  return (
    <section
      id="sponsors"
      ref={ref}
      className="w-full scroll-mt-28"
    >
      <div className="flex w-[80%] mx-auto items-start justify-center gap-10">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-32"
          >
            <span className="text-lg text-white/70">
              {t(sponsor.titleKey)}
            </span>

            <div className="relative w-full">
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 h-[120px] w-[70%] blur-[60px] opacity-70 rounded-full"
                style={{ background: sponsor.glowColor }}
              />

              <div
                className="relative rounded-xl p-[2px]"
                style={{
                  background: `linear-gradient(to bottom, ${sponsor.glowColor}66, rgba(255,255,255, 0.8)`,
                }}
              >
                <div
                  className="
                    flex h-[280px] w-[334px] items-center justify-center
                    rounded-[11px]
                  bg-gray-900
                    backdrop-blur-md
                  "
                >
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