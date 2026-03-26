'use client'

import { useSectionInView } from "@/hooks/useSectionInView";
import Image from "next/image";

export const HomePage = () => {
    const { ref } = useSectionInView("home", 0.5);
    return (
        <section id="home" ref={ref} className="scroll-mt-28 w-full h-[700px] flex items-center justify-center"><Image src="/photoGG.png" alt="about" width={1200} height={380} style={{ width: "auto", height: "auto" }} loading="eager" className="aspect-[1200/380]" /></section >
    )
}
