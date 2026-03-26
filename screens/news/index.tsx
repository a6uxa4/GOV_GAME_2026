'use client'

import { useSectionInView } from '@/hooks/useSectionInView';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export const NewsPage = () => {
    const { ref } = useSectionInView("news", 0.5);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(contentRef, { once: true, amount: 0.5 });
    return (
        <section id="news" ref={ref} className="scroll-mt-28 w-screen h-[700px] flex items-center justify-center bg-white">
            <div ref={contentRef} className="w-full h-full max-w-[1920px] mx-auto relative flex items-center justify-center gap-8 overflow-hidden">
                <Image src="/photoNewsText.png" alt="news" width={830} height={260} style={{ width: "auto", height: "auto" }} loading="eager" className='w-full h-full object-cover absolute top-0 left-[80px] z-10' />
                <motion.div initial={{ y: -600 }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 0.6 }} className='cursor-pointer'>
                    <Image src="/newsCard1.svg" alt="newsCard1" width={300} height={436} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
                <motion.div initial={{ y: 600 }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className='cursor-pointer'>
                    <Image src="/newsCard2.svg" alt="newsCard2" width={300} height={436} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
                <motion.div initial={{ y: -600 }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className='cursor-pointer'>
                    <Image src="/newsCard3.svg" alt="newsCard3" width={300} height={436} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
                <motion.div initial={{ y: 600 }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className='cursor-pointer'>
                    <Image src="/newsCard4.svg" alt="newsCard4" width={300} height={436} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
                <motion.div initial={{ y: -600 }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className='cursor-pointer'>
                    <Image src="/newsCard5.svg" alt="newsCard5" width={300} height={436} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
            </div>
        </section >
    )
}
