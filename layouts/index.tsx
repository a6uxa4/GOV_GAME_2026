import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full flex flex-col min-h-screen max-w-7xl mx-auto pt-20'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
