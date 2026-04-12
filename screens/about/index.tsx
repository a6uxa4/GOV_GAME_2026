'use client'

import { useSectionInView } from '@/utils/hooks/useSectionInView';
import { useCountdownItems } from '@/utils/helpers/countdown';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export const AboutPage = () => {
    const t = useTranslations('about');
    const { ref } = useSectionInView("about", 0.5);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(contentRef, { once: true, amount: 0.5 });
    const countdownItems = useCountdownItems("01.05.2026 12:00");

    return (
        <section id="about" ref={ref} className="scroll-mt-28 w-full h-[842px] overflow-hidden relative">
            <Image src="/photoAboutsBg.png" alt="about" width={1920} height={842} loading="eager" className='w-full h-full' />
            <Image src="/photoAboutsText.png" alt="about" width={1000} height={260} loading="eager" className='absolute top-0 left-[80px] w-auto h-auto' />
            <Image src="/GOV_GIF_1.gif" alt="about" width={950} height={530} loading="eager" className='absolute bottom-0 left-1/2 w-[950px] h-[530px] -translate-x-1/2 z-10' />
            <Image src="/photoAboutSmoke1.png" alt="about" width={1300} height={600} loading="eager" className='absolute bottom-0 left-0' />
            <Image src="/photoAboutSmoke2.png" alt="about" width={1300} height={600} loading="eager" className='absolute bottom-0 right-0' />


            <div ref={contentRef} className='w-full h-full absolute top-0 left-0'></div>
            <motion.div initial={{ x: 900 }} animate={isInView ? { x: 0 } : {}} transition={{ duration: 0.5 }} className='bg-[#00000080] p-6 absolute top-[200px] right-[180px] w-[1000px] rounded-xl backdrop-blur-[6px]'>
                <h1 className='text-end font-bold text-xl'>
                    {t('title')}
                </h1>
                <br />
                <p className='text-end text-lg font-light tracking-widest'>
                    {t('description')}
                </p>
            </motion.div>
            {countdownItems.length > 0 && (
                <div className='absolute bottom-26 right-36 w-[400px] h-[110px] bg-[#00000080] backdrop-blur-md rounded-[8px]'>
                    <div className='h-full flex items-center justify-center gap-4'>
                        {countdownItems.map((item, index) => (
                            <div key={item.unit} className='flex items-center'>
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <h1 className="text-5xl font-bold bg-linear-to-b from-[#0093E0] to-[#00486E] bg-clip-text text-transparent">
                                        {String(item.value).padStart(2, '0')}
                                    </h1>
                                    <p className="text-xs font-medium bg-linear-to-b from-[#0093E0] to-[#00486E] bg-clip-text text-transparent">
                                        {t(`countdown.${item.unit}`)}
                                    </p>
                                </div>
                                {index < countdownItems.length - 1 && (
                                    <span className='mx-2 text-3xl leading-none font-bold bg-linear-to-b from-[#0093E0] to-[#00486E] bg-clip-text text-transparent'>
                                        :
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section >
    )
}
