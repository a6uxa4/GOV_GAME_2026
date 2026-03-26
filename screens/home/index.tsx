'use client'

import { useSectionInView } from "@/hooks/useSectionInView";

export const HomePage = () => {
    const { ref } = useSectionInView("home", 0.5);
    return (
        <section id="home" ref={ref} className="scroll-mt-28 w-full h-[700px] flex items-center justify-center bg-blue-200">HomePage</section >
    )
}
