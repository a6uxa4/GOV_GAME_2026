'use client'

import { useSectionInView } from "@/hooks/useSectionInView";

export const DisciplinePage = () => {
    const { ref } = useSectionInView("disciplines", 0.5);
    return (
        <section id="disciplines" ref={ref} className="scroll-mt-28 w-full h-[700px] flex items-center justify-center bg-green-200">DisciplinePage</section >
    )
}
