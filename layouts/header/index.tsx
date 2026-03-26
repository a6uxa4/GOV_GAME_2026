'use client'

import { useActiveSectionContext } from "@/providers/ActiveSection";
import { NAV_LINKS } from "@/utils/constants";
import { SectionName } from "@/common/useSection.common";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const Header = () => {
    const t = useTranslations("header");
    const pathname = usePathname();
    const { replace } = useRouter();
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const currentLocale = pathname?.split("/")[1] === "en" ? "en" : "ru";
    const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);

    const handleNavClick = (sectionName: SectionName, hash: string, clickTimestamp: number) => {
        setActiveSection(sectionName);
        setTimeOfLastClick(clickTimestamp);

        const normalizedHash = hash.replace("/#", "#");
        const isHomeRoute = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;

        if (isHomeRoute) {
            const targetId = normalizedHash.slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                window.history.replaceState(null, "", `/${currentLocale}${normalizedHash}`);
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }

        replace(`/${currentLocale}${normalizedHash}`);
    };

    const changeLocale = (nextLocale: "en" | "ru") => {
        const nextPath = pathname
            ? pathname.replace(/^\/(en|ru)(?=\/|$)/, `/${nextLocale}`)
            : `/${nextLocale}`;

        replace(nextPath);
        setIsLocaleMenuOpen(false);
    };


    return (
        <header className="pt-4 fixed top-0 left-[80px] right-[80px] z-50 flex justify-between items-center bg-black">
            <Link href="/" className="block">
                <Image
                    src="/IconGG.svg"
                    alt="logo"
                    width={190}
                    height={60}
                    loading="eager"
                    style={{ width: "auto", height: "auto" }}
                />
            </Link>
            <nav className="flex items-center text-white/60">
                {NAV_LINKS.map((link, index) => (
                    <div
                        onClick={(event) => {
                            handleNavClick(link.name, link.hash, event.timeStamp);
                        }}
                        key={link.name} className="group flex items-center cursor-pointer">
                        {index !== 0 && (
                            <span className="mx-5 text-white/30 select-none text-[24px] group-hover:text-white">|</span>
                        )}
                        <span
                            className={`relative block pb-1 text-[33px] leading-none transition-colors duration-300 group-hover:text-white ${activeSection === link.name ? "text-white" : ""}`}
                        >
                            <span className="inline-block translate-y-0.5 text-[16px] font-light tracking-[0.02em] font-mono transition-transform duration-300 group-hover:-translate-y-0.5">
                                {t(link.name)}
                            </span>
                            <span className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-white/90 transition-transform duration-300 ${activeSection === link.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                        </span>
                    </div>
                ))}
            </nav>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Link href="https://www.facebook.com/govgames2026" target="_blank">
                        <Image src="/icon-facebook.png" alt="logo" width={24} height={24} loading="eager" style={{ width: "auto", height: "auto" }} />
                    </Link>
                    <Link href="https://www.instagram.com/govgames2026" target="_blank">
                        <Image src="/icon-instagram.png" alt="logo" width={24} height={24} loading="eager" style={{ width: "auto", height: "auto" }} />
                    </Link>
                    <Link href="https://www.youtube.com/govgames2026" target="_blank">
                        <Image src="/icon-youtube.png" alt="logo" width={24} height={24} loading="eager" style={{ width: "auto", height: "auto" }} />
                    </Link>
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => setIsLocaleMenuOpen(true)}
                    onMouseLeave={() => setIsLocaleMenuOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsLocaleMenuOpen((prev) => !prev)}
                        aria-label="Change language"
                        className="flex min-w-28 items-center justify-between gap-3 rounded-xl cursor-pointer border border-white/70 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm outline-none transition-all duration-300 hover:border-white hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-lg"
                    >
                        <span>{currentLocale === "en" ? "English" : "Русский"}</span>
                        <span className={`transition-transform duration-300 ${isLocaleMenuOpen ? "rotate-180" : ""}`}>
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </span>
                    </button>
                    <div
                        className={`absolute right-0 top-[calc(100%+8px)] w-full overflow-hidden rounded-xl border border-white/25 bg-black/85 text-white shadow-xl backdrop-blur-md transition-all duration-200 ${isLocaleMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
                    >
                        <button
                            type="button"
                            onClick={() => changeLocale("en")}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-white/15 cursor-pointer ${currentLocale === "en" ? "bg-white/10" : ""}`}
                        >
                            English
                        </button>
                        <button
                            type="button"
                            onClick={() => changeLocale("ru")}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-white/15 cursor-pointer ${currentLocale === "ru" ? "bg-white/10" : ""}`}
                        >
                            Русский
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}