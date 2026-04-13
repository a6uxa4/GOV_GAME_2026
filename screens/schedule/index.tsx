'use client'

import { useMemo, useRef } from "react"
import type { MotionValue } from "motion/react"
import { motion, useScroll, useTransform } from "motion/react"
import clsx from "clsx"
import { useTranslations } from "next-intl"

const LINE_H_1 = 300
const LINE_H_2 = 760
const LINE_H_3 = 400

const LINE_START = 0.22
const LINE_END = 0.58

const BALL_REVEAL: readonly [number, number][] = [
    [0.24, 0.34],
    [0.32, 0.42],
    [0.40, 0.56],
    [0.48, 0.58],
]

const pillClass =
    "h-[16px] min-w-[62px] rounded-full bg-gradient-to-b from-[#651FFF] to-[#D1C4E9] shadow-[0_2px_10px_rgba(94,53,177,0.35)]"

// ✅ Исправлено: добавлены пропсы title, date, time вместо хардкода
// ✅ Исправлено: gap-10 → gap-4 для безопасного layout
function ScheduleGroupText({
    pillOnLeft,
    opacity,
    pillScale,
    pillX,
    toColor,
    fromColor,
    title,
    date,
    time,
    times,
    variant,
    games,
    timeLabel,
}: {
    pillOnLeft: boolean
    opacity: MotionValue<number>
    pillScale: MotionValue<number>
    pillX: MotionValue<number>
    toColor: string
    fromColor: string
    title: string
    date: string
    time?: string
    times?: string[]
    variant: number
    games?: { value: string, time: string }[]
    timeLabel: string
}) {
    return (
        <motion.div
            style={{ opacity, scale: pillScale, x: pillX }}
            className={clsx(
                "absolute top-[-40px] flex gap-4",
                pillOnLeft ? "left-50" : "right-50", {
                'flex-row': variant === 1 && pillOnLeft,
                'flex-row-reverse': variant === 1 && !pillOnLeft,
                'flex-col-reverse': variant === 2 || variant === 3,
            })}
        >
            <div>
                <h1 className="text-[56px] font-bold">{title}</h1>
                <div className="flex gap-10">
                    {variant === 3 ? <>
                        {games?.map((game, i) => (
                            <h1 key={i} className="text-[24px] font-light"> {game.value}{games.length > 1 ? <br /> : <>&nbsp;</>} {game.time}</h1>
                        ))}
                    </> :
                        <h1 className="text-[24px] font-light"> {timeLabel} &nbsp; {time ? time : <><br />{times?.join(' ')} </>}</h1>
                    }
                </div>
            </div>
            <h1
                className="text-8xl font-bold bg-clip-text text-transparent"
                style={{
                    backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
                }}
            >
                {date}
            </h1>
        </motion.div >
    )
}

// ✅ Исправлено: добавлены пропсы title, date, time и прокинуты в ScheduleGroupText
function TimelineNode({
    scrollYProgress,
    topFraction,
    index,
    toColor,
    fromColor,
    title,
    date,
    time,
    times,
    variant,
    games,
    timeLabel,
}: {
    scrollYProgress: MotionValue<number>
    topFraction: number
    index: number
    toColor: string
    fromColor: string
    title: string
    date: string
    time?: string
    times?: string[]
    variant: number
    games?: { value: string, time: string }[]
    timeLabel: string
}) {
    const [start, end] = BALL_REVEAL[index] ?? [0, 0.1]
    const pillOnLeft = index % 2 === 0

    const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
    const scale = useTransform(scrollYProgress, [start, end], [0.35, 1])
    const pillScale = useTransform(scrollYProgress, [start, end], [0.88, 1])
    const pillX = useTransform(
        scrollYProgress,
        [start, end],
        pillOnLeft ? [-28, 0] : [28, 0],
    )

    return (
        <div
            className="pointer-events-none absolute left-0 right-0 top-0 flex -translate-y-1/2 justify-center"
            style={{ top: `${topFraction * 100}%` }}
        >
            <div className="grid w-full max-w-[560px] grid-cols-[1fr_auto_1fr] items-center gap-x-2 px-2">
                <div className="flex min-h-[16px] justify-end">
                    {pillOnLeft ? (
                        <ScheduleGroupText
                            pillOnLeft
                            opacity={opacity}
                            pillScale={pillScale}
                            pillX={pillX}
                            toColor={toColor}
                            fromColor={fromColor}
                            title={title}
                            date={date}
                            time={time}
                            times={times}
                            variant={variant}
                            games={games}
                            timeLabel={timeLabel}
                        />
                    ) : null}
                    {pillOnLeft ? (
                        <motion.div
                            style={{ opacity, scale: pillScale, x: pillX }}
                            className={pillClass}
                        />
                    ) : null}
                </div>

                <motion.div
                    style={{ opacity, scale }}
                    className="relative z-10 size-3 shrink-0 rounded-full bg-[#D1C4E9] shadow-[0_0_8px_rgba(209,196,233,0.45)]"
                />

                <div className="flex min-h-[16px] justify-start">
                    {!pillOnLeft ? (
                        <motion.div
                            style={{ opacity, scale: pillScale, x: pillX }}
                            className={pillClass}
                        />
                    ) : null}
                    {!pillOnLeft ? (
                        <ScheduleGroupText
                            pillOnLeft={false}
                            opacity={opacity}
                            pillScale={pillScale}
                            pillX={pillX}
                            toColor={toColor}
                            fromColor={fromColor}
                            title={title}
                            date={date}
                            time={time}
                            times={times}
                            variant={variant}
                            games={games}
                            timeLabel={timeLabel}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

const TextHeader = ({ children }: { children: string }) => (
    <h1 className="text-[56px] font-bold uppercase tracking-wide text-white">{children}</h1>
)

// ✅ Исправлено: отдельные ref и scrollYProgress для каждой секции
// ✅ Исправлено: отдельные lineHeight для каждой секции (LINE_H_3 теперь используется)
export const SchedulePage = () => {
    const t = useTranslations("schedule")
    const groupRef = useRef<HTMLDivElement>(null)
    const playoffRef = useRef<HTMLDivElement>(null)
    const thirdPlaceRef = useRef<HTMLDivElement>(null)

    const ballPositions1 = useMemo(
        () => [
            {
                value: 0.12,
                color: { to: "#D1C4E9", from: "#651FFF" },
                title: t("groupA"),
                date: t("june3"),
                time: "19:00",
                variant: 1,
            },
            {
                value: 0.38,
                color: { to: "#D1C4E9", from: "#651FFF" },
                title: t("groupB"),
                date: t("june4"),
                time: "19:00",
                variant: 1,
            },
            {
                value: 0.62,
                color: { to: "#D1C4E9", from: "#651FFF" },
                title: t("groupC"),
                date: t("june5"),
                time: "19:00",
                variant: 1,
            },
            {
                value: 0.88,
                color: { to: "#D1C4E9", from: "#651FFF" },
                title: t("groupD"),
                date: t("june6"),
                time: "19:00",
                variant: 1,
            },
        ],
        [t],
    )

    const ballPositions2 = useMemo(
        () => [
            {
                value: 0.12,
                color: { to: "#00E5FF", from: "#0072FF" },
                title: t("disciplineCS2"),
                date: t("june7"),
                times: ["13:00", "15:00", "17:00", "19:00"],
                variant: 2,
            },
            {
                value: 0.38,
                color: { to: "#00E5FF", from: "#0072FF" },
                title: t("disciplineDOTA2"),
                date: t("june8"),
                times: ["13:00", "15:00", "17:00", "19:00"],
                variant: 2,
            },
            {
                value: 0.62,
                color: { to: "#00E5FF", from: "#0072FF" },
                title: t("disciplineCS2"),
                date: t("june9"),
                variant: 3,
                games: [
                    { value: t("game5"), time: "19:00" },
                    { value: t("game6"), time: "21:00" },
                ],
            },
            {
                value: 0.88,
                color: { to: "#00E5FF", from: "#0072FF" },
                title: t("disciplineDOTA2"),
                date: t("june10"),
                variant: 3,
                games: [
                    { value: t("game5"), time: "19:00" },
                    { value: t("game6"), time: "21:00" },
                ],
            },
        ],
        [t],
    )

    const ballPositions3 = useMemo(
        () => [
            {
                value: 0.12,
                color: { to: "#00E5FF", from: "#00B193" },
                title: t("disciplineCS2"),
                date: t("june11"),
                variant: 3,
                games: [{ value: t("game7"), time: "19:00" }],
            },
            {
                value: 0.38,
                color: { to: "#00E5FF", from: "#00B193" },
                title: t("disciplineDOTA2"),
                date: t("june12"),
                variant: 3,
                games: [{ value: t("game7"), time: "19:00" }],
            },
        ],
        [t],
    )

    const { scrollYProgress: groupProgress } = useScroll({
        target: groupRef,
        offset: ["start end", "end start"],
    })
    const { scrollYProgress: playoffProgress } = useScroll({
        target: playoffRef,
        offset: ["start end", "end start"],
    })
    const { scrollYProgress: thirdProgress } = useScroll({
        target: thirdPlaceRef,
        offset: ["start end", "end start"],
    })

    const lineHeight1 = useTransform(
        groupProgress,
        [0, LINE_START, LINE_END, 1],
        [0, 0, LINE_H_1, LINE_H_1],
    )
    const lineHeight2 = useTransform(
        playoffProgress,
        [0, LINE_START, LINE_END, 1],
        [0, 0, LINE_H_2, LINE_H_2],
    )
    // ✅ Исправлено: была lineHeightPlayoff, теперь своя lineHeight3 с LINE_H_3
    const lineHeight3 = useTransform(
        thirdProgress,
        [0, LINE_START, LINE_END, 1],
        [0, 0, LINE_H_3, LINE_H_3],
    )

    return (
        <div className="flex min-h-[130vh] w-full flex-col items-center pt-[5vh]">
            <div className="flex w-full flex-col items-center gap-[40px]">

                <TextHeader>{t("groupStage")}</TextHeader>
                <div ref={groupRef} className="relative mx-auto mt-16 w-full px-4" style={{ height: LINE_H_1 }}>
                    <motion.div
                        style={{ height: lineHeight1 }}
                        className="absolute left-1/2 top-0 z-0 w-1 -translate-x-1/2 origin-top rounded-full bg-[#444444]"
                    />
                    {ballPositions1.map((item, i) => (
                        <TimelineNode
                            key={i}
                            scrollYProgress={groupProgress}
                            topFraction={item.value}
                            index={i}
                            toColor={item.color.to}
                            fromColor={item.color.from}
                            title={item.title}
                            date={item.date}
                            time={item.time}
                            variant={item.variant}
                            timeLabel={t("timeLabel")}
                        />
                    ))}
                </div>

                <TextHeader>{t("playoff")}</TextHeader>
                <div ref={playoffRef} className="relative mx-auto w-full px-4" style={{ height: LINE_H_2 }}>
                    <motion.div
                        style={{ height: lineHeight2 }}
                        className="absolute left-1/2 top-0 z-0 w-1 -translate-x-1/2 origin-top rounded-full bg-[#444444]"
                    />
                    {ballPositions2.map((item, i) => (
                        <TimelineNode
                            key={i}
                            scrollYProgress={playoffProgress}
                            topFraction={item.value}
                            index={i}
                            toColor={item.color.to}
                            fromColor={item.color.from}
                            title={item.title}
                            date={item.date}
                            times={item.times}
                            variant={item.variant}
                            games={item.games}
                            timeLabel={t("timeLabel")}
                        />
                    ))}
                </div>
                <div className="h-30"></div>
                <TextHeader>{t("thirdPlace")}</TextHeader>
                <div ref={thirdPlaceRef} className="relative mx-auto w-full px-4" style={{ height: LINE_H_3 }}>
                    <motion.div
                        style={{ height: lineHeight3 }}
                        className="absolute left-1/2 top-0 z-0 w-1 -translate-x-1/2 origin-top rounded-full bg-[#444444]"
                    />
                    {ballPositions3.map((item, i) => (
                        <TimelineNode
                            key={i}
                            scrollYProgress={thirdProgress}
                            topFraction={item.value}
                            index={i}
                            toColor={item.color.to}
                            fromColor={item.color.from}
                            variant={3}
                            date={item.date}
                            title={item.title}
                            games={item.games}
                            timeLabel={t("timeLabel")}
                        />
                    ))}
                </div>


                <div className="w-[750px] h-[225px] rounded-[12px] border-[#FF7DFD] border-2 bg-white/20 flex flex-col items-center justify-center">
                    <h1 className='text-white text-[56px] font-bold uppercase tracking-wide'>{t("final")}</h1>
                    <h1
                        style={{
                            backgroundImage: `linear-gradient(to right, #FF00E5, #6d0462)`,
                        }} className='text-[86px] font-bold uppercase tracking-wide bg-clip-text text-transparent'>{t("finalDate")}
                    </h1>
                </div>
            </div>
        </div>
    )
}