"use client";

import { useTranslations } from "next-intl";
import Image from "next/image"
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: (typeof custom === "number" ? custom : 0) * 0.08,
            duration: 0.55,
            ease: "easeOut" as const,
        },
    }),
};

// ─── Reusable primitives ───────────────────────────────────────────────────────

const GlassCard = ({
    children,
    className = "",
    custom,
}: {
    children: React.ReactNode;
    className?: string;
    /** Stagger index → delay `index * 0.08s` */
    custom?: number;
}) => (
    <motion.div
        variants={cardVariants}
        custom={custom}
        initial="hidden"
        whileInView="visible"
        whileHover={{ y: -4, scale: 1.015 }}
        viewport={{ once: true, margin: "-80px" }}
        className={`relative rounded-[12px] border-2 border-white/50 overflow-hidden cursor-pointer ${className}`}
    >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#474E60] to-[#1C3850] opacity-60" aria-hidden />
        {children}
    </motion.div>
);

const FrostedCard = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`bg-[#EBEEF34D] rounded-[12px] p-6 flex items-center justify-center ${className}`}>
        {children}
    </div>
);

const FrostedLabel = ({ text, custom }: { text: string; custom: number }) => (
    <motion.div
        variants={cardVariants}
        custom={custom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="bg-[#EBEEF34D] rounded-[12px] p-6 flex items-center justify-center w-[375px] h-[115px]"
    >
        <p className="text-white text-center text-2xl font-bold uppercase tracking-wide">{text}</p>
    </motion.div>
);

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`bg-linear-to-b from-[#84D5FF] to-[#C4EBFF] bg-clip-text text-transparent ${className}`}>
        {children}
    </span>
);

// ─── Stage card ────────────────────────────────────────────────────────────────

const StageCard = ({
    title,
    datesLabel,
    date,
    custom,
}: {
    title: string;
    datesLabel: string;
    date: string;
    custom: number;
}) => (
    <GlassCard custom={custom} className="w-[375px] h-[148px] flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center gap-1">
            <p className="text-[24px] font-bold uppercase text-white tracking-widest">{title}</p>
            <p className="text-[20px] font-bold uppercase text-white tracking-wider">
                {datesLabel}&nbsp;&nbsp;<GradientText>{date}</GradientText>
            </p>
        </div>
    </GlassCard>
);

// ─── Main component ────────────────────────────────────────────────────────────

export const FormatPage = () => {
    const t = useTranslations("format");

    const stages = [
        { key: "stageGroup", title: t("stageGroup"), date: '19:00' },
        { key: "stagePlayoff", title: t("stagePlayoff"), date: '19:00' },
        { key: "stageLanFinal", title: t("stageLanFinal"), date: '19:00' },
    ];

    return (
        <section className="w-full h-[1000px] flex items-center justify-center relative">
            <Image src="/photoFormatBg.png" alt="formatBg" width={1920} height={1000} loading="eager" className="w-full h-full" />
            <Image src="/photoFormatText.png" alt="formatText" width={1920} height={200} loading="eager" className="absolute top-0 left-[80px] w-auto h-auto z-20" />

            <div className="bg-[linear-gradient(to_bottom,#9DB2CF80,#000000)] absolute inset-0 z-10" />

            <Image
                src="/GOV_GIF_2.gif"
                alt="formatGif"
                width={520}
                height={845}
                loading="eager"
                className="w-[520px] h-auto object-cover rounded-[8px] absolute z-30 left-60"
            />

            <div className="absolute top-[200px] left-[650px] z-30 flex items-center justify-center gap-6 flex-wrap p-8">
                {/* Row 1 — labels */}
                <FrostedLabel custom={0} text={t("whoCanParticipate")} />
                <FrostedLabel custom={1} text={t("periodOfConduct")} />
                <FrostedLabel custom={2} text={t("totalPrizeFund")} />

                {/* Participants restriction */}
                <GlassCard custom={3} className="w-[375px]">
                    <p className="relative z-10 flex flex-col items-center gap-1 p-[32px] text-center text-[16px] font-bold uppercase tracking-wide">
                        <span className="text-white">{t("participantsRestrictionWhite1")}</span>
                        <span>
                            <span className="text-white">{t("participantsRestrictionWhite2")}</span>
                            <span className="text-[#C4EBFF]"> {t("participantsRestrictionBlue1")}</span>
                        </span>
                        <span className="text-[#C4EBFF]">{t("participantsRestrictionBlue2")}</span>
                    </p>
                </GlassCard>

                {/* Date card */}
                <GlassCard custom={4} className="w-[375px]">
                    <div className="relative z-10 flex flex-col items-center pt-5">
                        <GradientText className="text-[48px] leading-none font-bold uppercase">
                            {t("eventDateRange")}
                        </GradientText>
                        <p className="text-[14px] font-semibold uppercase text-white tracking-widest mt-1">
                            {t("eventYear")}
                        </p>
                    </div>
                    <div className="relative z-10 h-px bg-white/20 mt-4" />
                    <div className="relative z-10 flex items-center justify-center gap-1.5 py-[5px] bg-white/20 cursor-pointer">
                        <span className="text-[13px] font-semibold uppercase text-white/60 tracking-[0.15em]">
                            {t("schedule")}
                        </span>
                        <span className="text-white/60">›</span>
                    </div>
                </GlassCard>

                {/* Prize fund */}
                <GlassCard custom={5} className="w-[375px] h-[148px] flex items-center justify-center">
                    <div className="relative z-10 flex flex-col items-center">
                        <GradientText className="text-[48px] leading-none font-bold uppercase">$20 000</GradientText>
                        <p className="text-[14px] font-semibold uppercase text-white tracking-widest mt-[15px]">
                            {t("inTechAndGadgets")}
                        </p>
                    </div>
                </GlassCard>

                {/* Stages title */}
                <motion.div
                    variants={cardVariants}
                    custom={6}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="w-full"
                >
                    <FrostedCard className="w-full h-[115px]">
                        <p className="text-white text-center text-2xl font-bold uppercase tracking-wide">{t("stagesTitle")}</p>
                    </FrostedCard>
                </motion.div>

                {/* Stage cards */}
                {stages.map(({ key, title, date }, index) => (
                    <StageCard
                        key={key}
                        custom={7 + index}
                        title={title}
                        datesLabel={t("datesLabel")}
                        date={date}
                    />
                ))}
            </div>
        </section>
    );
};