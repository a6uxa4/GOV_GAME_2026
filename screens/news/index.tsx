'use client'

import { useSectionInView } from '@/hooks/useSectionInView';

export const NewsPage = () => {
    const { ref } = useSectionInView("news", 0.5);
    return (
        <section id="news" ref={ref} className="scroll-mt-28 w-full h-[700px] flex items-center justify-center bg-yellow-200">NewsPage</section >
    )
}
