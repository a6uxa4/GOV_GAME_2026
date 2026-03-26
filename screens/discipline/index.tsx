'use client'

import { useSectionInView } from "@/hooks/useSectionInView";
import { CSCard } from "@/components/card/CS";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DOTACard } from "@/components/card/DOTA";
import clsx from "clsx";

const AUTO_SWITCH_INTERVAL_MS = 5000;

export const DisciplinePage = () => {
    const { ref } = useSectionInView("disciplines", 0.5);
    const [selectedCard, setSelectedCard] = useState<"cs" | "dota">("cs");
    const isCSSelected = selectedCard === "cs";
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setSelectedCard((prev) => (prev === "cs" ? "dota" : "cs"));
        }, AUTO_SWITCH_INTERVAL_MS);

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, []);

    const toggleCard = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
        }

        setSelectedCard((prev) => (prev === "cs" ? "dota" : "cs"));

        intervalRef.current = window.setInterval(() => {
            setSelectedCard((prev) => (prev === "cs" ? "dota" : "cs"));
        }, AUTO_SWITCH_INTERVAL_MS);
    };

    return (
        <section id="disciplines" ref={ref} className="scroll-mt-28 w-full h-[720px] flex items-center justify-center overflow-hidden relative">
            {isCSSelected ? <CSCard /> : <DOTACard />}
            <Image
                onClick={toggleCard}
                src={isCSSelected ? "/button-next.svg" : "/button-prev.svg"}
                alt={isCSSelected ? "buttonNext" : "buttonPrev"}
                width={46}
                height={46}
                style={{ width: "auto", height: "auto" }}
                loading="eager"
                className="absolute bottom-10 z-40 cursor-pointer hover:scale-110 transition-all duration-300 right-[25%]"
            />
            <div className="absolute bottom-10 right-50 z-40 flex gap-4">
                <div onClick={toggleCard} className={clsx("w-[18px] h-[18px] rounded-full transition-all duration-300 cursor-pointer", isCSSelected ? "bg-[#00283D] scale-150" : "bg-white hover:bg-[#00283D]")}></div>
                <div onClick={toggleCard} className={clsx("w-[18px] h-[18px] rounded-full transition-all duration-300 cursor-pointer", !isCSSelected ? "bg-[#E94424] scale-150" : "bg-white hover:bg-[#E94424]")}></div>
            </div>
        </section >
    )
}
