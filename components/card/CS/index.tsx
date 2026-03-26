import { Fragment } from 'react'
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export const CSCard = () => {
    const t = useTranslations("discipline");

    return (
        <Fragment>
            <div className="absolute bottom-10 left-10">
                <h1 className="font-bold text-4xl font-mono">
                    {t("titleCS2")}
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
                </div>
            </div>
            <motion.div initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 80 }} transition={{ duration: 0.5 }} className="scale-150 translate-y-[-80px]">
                <Image src="/photoGovGame.svg" alt="govGame" width={750} height={350} style={{ width: "auto", height: "auto" }} loading="eager" />
            </motion.div>
            <motion.div initial={{ y: -500, }} animate={{ y: 0, }} transition={{ duration: 0.3 }} className='translate-x-[225px] z-20'>
                <Image src="/photoBgCsMap1.png" alt="bgCsMap1" width={900} height={800} style={{ width: "auto", height: "auto" }} loading="eager" />
            </motion.div>
            <motion.div initial={{ y: 500, }} animate={{ y: 0, }} transition={{ duration: 0.3 }} className='z-40 relative [clip-path:polygon(42.5%_0,100%_0,100%_100%,0%_100%)]'>
                <Image src="/photoBgCsMap2.png" alt="bgCsMap2" width={600} height={800} style={{ width: "auto", height: "auto" }} loading="eager" />
                <Image src="/photoCsLogo.png" alt="bgCsMap3" width={350} height={350} style={{ width: "auto", height: "auto" }} loading="eager" className="absolute right-0 top-1/2 -translate-y-1/2" />
            </motion.div>
            <div className='absolute z-30 bottom-0'>
                <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, }} className="flex translate-x-[100px]">
                    <Image src='/photoCHuman1.png' alt="tHuman2" width={500} height={500} style={{ width: "auto", height: "auto" }} loading="eager" />
                    <Image src='/photoTHuman1.png' alt="tHuman1" width={500} height={500} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
            </div>
            <div className='absolute z-20 w-[800px]'>
                <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex justify-between translate-x-[100px]">
                    <Image src='/photoCHuman2.png' alt="tHuman2" width={250} height={680} style={{ width: "auto", height: "auto" }} loading="eager" />
                    <Image src='/photoTHuman2.png' alt="tHuman1" width={250} height={680} style={{ width: "auto", height: "auto" }} loading="eager" />
                </motion.div>
            </div>
        </Fragment>
    )
}
