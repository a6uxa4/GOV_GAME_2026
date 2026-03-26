import { useEffect, useMemo, useState } from 'react';

export type CountdownTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export type CountdownItem = {
    label: 'days' | 'hours' | 'minutes' | 'seconds';
    value: number;
};

const DATE_TIME_REGEX = /^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/;

export const parseCountdownDate = (value: string): Date | null => {
    const match = value.trim().match(DATE_TIME_REGEX);

    if (!match) {
        return null;
    }

    const [, dayRaw, monthRaw, yearRaw, hoursRaw, minutesRaw] = match;
    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const year = Number(yearRaw);
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);

    const date = new Date(year, month - 1, day, hours, minutes, 0, 0);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date.getHours() !== hours ||
        date.getMinutes() !== minutes
    ) {
        return null;
    }

    return date;
};

export const getCountdownTime = (targetDate: Date): CountdownTime => {
    const diff = targetDate.getTime() - Date.now();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
};

const ZERO_COUNTDOWN: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export const useCountdownItems = (targetDateString: string): CountdownItem[] => {
    const targetDate = useMemo(() => parseCountdownDate(targetDateString), [targetDateString]);
    const [countdown, setCountdown] = useState<CountdownTime>(() =>
        targetDate ? getCountdownTime(targetDate) : ZERO_COUNTDOWN
    );

    useEffect(() => {
        if (!targetDate) {
            return;
        }

        const tick = () => {
            setCountdown(getCountdownTime(targetDate));
        };

        tick();
        const intervalId = window.setInterval(tick, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [targetDate]);

    return useMemo(
        () => {
            const safeCountdown = targetDate ? countdown : ZERO_COUNTDOWN;

            return [
                { label: 'days', value: safeCountdown.days },
                { label: 'hours', value: safeCountdown.hours },
                { label: 'minutes', value: safeCountdown.minutes },
                { label: 'seconds', value: safeCountdown.seconds },
            ];
        },
        [countdown, targetDate]
    );
};
