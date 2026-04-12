import { motion } from 'motion/react'
import { Fragment } from 'react'
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Button } from '@/components/button';

export const DOTACard = () => {
    const t = useTranslations("discipline");

    return (
        <Fragment>
            <div className="absolute bottom-10 left-10">
                <h1 className="font-bold text-4xl font-mono">
                    {t("titleDOTA2")}
                </h1>
                <div className="flex flex-col gap-2 mt-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <p key={index} className='space-x-2'>
                            <span className="font-light text-base text-[#FFFFFF99]">
                                {t(`section${index + 1}`)}
                            </span>
                            <span className="font-light text-lg text-[#FFFFFFCC]">
                                {t(`answer${index + 1}`)}
                            </span>
                        </p>
                    ))}
                    <div className='flex gap-4'>
                        <Button onClick={() => { }} variant='primary' className='mt-4'>Регламент турнира</Button>
                        <Button onClick={() => { }} variant='secondary' className='mt-4'>Регистрация на турнир</Button>
                    </div>

                </div>
            </div>
            <motion.div initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 80 }} transition={{ duration: 0.5 }} className="scale-150 translate-y-[-120px]">
                <Image src="/photoGovGame.svg" alt="govGame" width={750} height={350} style={{ width: "auto", height: "auto" }} loading="eager" />
            </motion.div>
            <motion.div initial={{ y: -500, }} animate={{ y: 0, }} transition={{ duration: 0.3 }} className='translate-x-[225px] z-20'>
                <Image src="/photoBgDotaMap1.png" alt="bgDotaMap1" width={900} height={800} style={{ width: "auto", height: "auto" }} loading="eager" />
            </motion.div>
            <motion.div initial={{ y: 500, }} animate={{ y: 0, }} transition={{ duration: 0.3 }} className='z-30 relative [clip-path:polygon(42.5%_0,100%_0,100%_100%,0%_100%)]'>
                <Image src="/photoBgDotaMap2.png" alt="bgDotaMap2" width={600} height={800} style={{ width: "auto", height: "auto" }} loading="eager" />
                <Image src="/photoDotaLogo.png" alt="LogoDota" width={350} height={340} style={{ width: "auto", height: "auto" }} loading="eager" className="absolute right-3 top-1/2 -translate-y-1/2" />
            </motion.div>
            <div className='absolute z-20 bottom-[100px]'>
                <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, }}>
                    <Image src='/photoInvoker.png' alt="DotaInvoker" width={570} height={550} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
            </div>
            <div className='absolute z-30 bottom-0 translate-x-[150px]'>
                <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                    <Image src='/photoJuggernaut.png' alt="DotaJuggernaut" width={800} height={600} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
            </div>
            <div className='absolute z-20 bottom-0 translate-x-[400px]'>
                <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <Image src='/photoLegion.png' alt="DotaLegionnaire" width={450} height={650} style={{ width: "450px", height: "650px" }} loading="eager" />
                </motion.div>
            </div>
        </Fragment>
    )
}