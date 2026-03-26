'use client'

import { useSectionInView } from '@/utils/hooks/useSectionInView';
import { useCountdownItems } from '@/utils/helpers/countdown';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export const AboutPage = () => {
    const { ref } = useSectionInView("about", 0.5);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(contentRef, { once: true, amount: 0.5 });
    const countdownItems = useCountdownItems("01.05.2026 12:00");

    return (
        <section id="about" ref={ref} className="scroll-mt-28 w-full h-[842px] overflow-hidden relative">
            <Image src="/photoAboutBg.png" alt="about" width={1920} height={842} loading="eager" className='w-full h-full' />
            <Image src="/photoAboutText.png" alt="about" width={1000} height={260} loading="eager" className='absolute top-0 left-[80px] w-auto h-auto' />
            <div ref={contentRef} className='w-full h-full absolute top-0 left-0'></div>
            <motion.div initial={{ x: 900 }} animate={isInView ? { x: 0 } : {}} transition={{ duration: 0.5 }} className='bg-[#00000080] p-6 absolute top-[200px] right-[180px] w-[1000px] rounded-xl backdrop-blur-[6px]'>
                <h1 className='text-end font-bold text-xl'>
                    Киберспортивный турнир среди государственных IT-организаций Кыргызстана
                </h1>
                <br />
                <p className='text-end text-lg font-light tracking-widest'>
                    Главная цель мероприятия — популяризация киберспорта среди резидентов государственных
                    IT- учреждений, развитие командного духа, стратегического мышления и эффективного взаимодействия в командах.
                </p>
            </motion.div>
            {countdownItems.length > 0 && (
                <div className='absolute bottom-26 right-36 w-[400px] h-[110px] bg-[#00000080] backdrop-blur-md rounded-[8px]'>
                    <div className='h-full flex items-center justify-center gap-4'>
                        {countdownItems.map((item, index) => (
                            <div key={item.label} className='flex items-center'>
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <h1 className="text-5xl font-bold bg-linear-to-b from-[#0093E0] to-[#00486E] bg-clip-text text-transparent">
                                        {String(item.value).padStart(2, '0')}
                                    </h1>
                                    <p className="text-xs font-medium bg-linear-to-b from-[#0093E0] to-[#00486E] bg-clip-text text-transparent">
                                        {item.label}
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
