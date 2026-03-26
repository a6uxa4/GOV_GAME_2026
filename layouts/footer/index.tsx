import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="w-full h-[300px] flex justify-between items-center">
            <div className="flex flex-col gap-20">
                <Link href="/" className="block">
                    <Image src="/IconGG.svg" alt="logo" width={190} height={60} loading="eager" style={{ width: "auto", height: "auto" }} />
                </Link>
                <div className="flex items-center gap-2">
                    <Link href="https://www.facebook.com/govgames2026" target="_blank">
                        <Image src="/button-facebook.png" alt="logo" width={24} height={24} loading="eager" style={{ width: "auto", height: "auto" }} />
                    </Link>
                    <Link href="https://www.instagram.com/govgames2026" target="_blank">
                        <Image src="/button-instagram.png" alt="logo" width={24} height={24} loading="eager" style={{ width: "auto", height: "auto" }} />
                    </Link>
                    <Link href="https://www.youtube.com/govgames2026" target="_blank">
                        <Image src="/button-youtube.png" alt="logo" width={24} height={24} loading="eager" style={{ width: "auto", height: "auto" }} />
                    </Link>
                </div>
            </div>
            <div className="w-[360px] text-white">
                <h1 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.02em]">
                    Контакты
                </h1>

                <div className="mb-4 space-y-1 text-[12px] font-light leading-[1.2] text-white/75">
                    <p>Номер телефона:</p>
                    <p>(312)-12 34 56</p>
                </div>

                <div className="mb-4 space-y-1 text-[12px] font-light leading-[1.2] text-white/75">
                    <p>Почта:</p>
                    <p>mail@academy.gov.kg</p>
                    <p>academy@academy.gov.kg</p>
                </div>

                <div className="space-y-1 text-[12px] font-light leading-[1.2] text-white/75">
                    <p>Адрес:</p>
                    <p>720040, г. Бишкек, Академия, 123</p>
                </div>
            </div>
        </footer>
    );
};