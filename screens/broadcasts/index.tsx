'use client'

import { useSectionInView } from '@/utils/hooks/useSectionInView';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const BroadcastsPage = () => {
  const t = useTranslations('broadcasts');
  const { ref } = useSectionInView("broadcasts", 0.5);
  return (
    <section id="broadcasts" ref={ref} className="scroll-mt-28 w-full h-[1450px] flex items-center justify-center relative">
      <Image src="/photoBroadcastText.png" alt="broadcasts" width={1170} height={260} loading="eager" className="absolute top-0 left-[80px] w-auto h-auto" />
      <div className='flex gap-8 absolute top-[240px]'>
        <Image
          src="/button-prev.svg"
          alt="buttonPrev"
          width={46}
          height={46}
          loading="eager"
          className="cursor-pointer hover:scale-110 transition-all duration-300"
        />
        <iframe
          width="1450px"
          height="830px"
          className='rounded-[16px] overflow-hidden border border-[#0053EB66]'
          src="https://www.youtube.com/embed/9P9xO4edsmw?autoplay=0"
          title="Archive"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Image
          src="/button-next.svg"
          alt="buttonNext"
          width={46}
          height={46}
          loading="eager"
          className="cursor-pointer hover:scale-110 transition-all duration-300"
        />
      </div>
      <p className='text-center text-lg font-light tracking-wide absolute bottom-[260px] max-w-[700px]'>
        {t('description')}
      </p>
      <div className='w-full border-t border-white flex gap-6 items-center justify-center absolute bottom-10 pt-6'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='w-[300px] h-[175px]'>
            <iframe
              width="300px"
              height="175px"
              className='rounded-[16px] overflow-hidden border border-[#0053EB66]'
              src="https://www.youtube.com/embed/9P9xO4edsmw?autoplay=0"
              title="Archive"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section >
  )
}
