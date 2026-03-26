'use client'

import { useSectionInView } from '@/hooks/useSectionInView';

export const AboutPage = () => {
    const { ref } = useSectionInView("about", 0.5);
    return (
        <section id="about" ref={ref} className="scroll-mt-28 w-full h-[700px] flex items-center justify-center bg-red-200">AboutPage</section >
    )
}
