import { useTranslations } from "next-intl";
import Image from "next/image"

export const FormatPage = () => {
    const t = useTranslations("format");
    return (
        <section className="w-full h-[1000px] flex items-center justify-center relative">
            <Image src="/photoFormatBg.png" alt="formatBg" width={1920} height={1000} loading="eager" className='w-full h-full' />
            <Image src="/photoFormatText.png" alt="formatText" width={1920} height={200} loading="eager" className='absolute top-0 left-[80px] w-auto h-auto z-20' />
            <div className="bg-[linear-gradient(to_bottom,#9DB2CF80,#000000)] absolute bottom-0 left-0 w-full h-full z-10"></div>
            <Image
                src="/GOV_GIF_2.gif"
                alt="formatGif"
                width={520}
                height={845}
                loading="eager"
                className='w-[520px] h-auto object-cover rounded-[8px] absolute z-30 left-60'
            />
            <div className="absolute bg-[#EBEEF34D] w-[375px] h-[115px] rounded-[8px] top-[300px] left-[700px] z-30">
                <span>
                    Кто может принять участие?
                </span>
            </div>
        </section>
    )
}
