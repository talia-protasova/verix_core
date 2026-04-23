import { Header } from '../../widgets/header/Header.tsx';
import { Hero } from '../../widgets/hero/Hero';
import { Stats } from '../../widgets/stats/Stats';
import { Features } from '../../widgets/features/Features';
import { Roadmap } from '../../widgets/roadmap/Roadmap';
import { Ecosystem } from '../../widgets/ecosystem/Ecosystem';
import { Team } from '../../widgets/team/Team';
import { Cta } from '../../widgets/cta/Cta';
import { Footer } from '../../widgets/footer/Footer';

export const HomePage = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Stats />
                <Features />
                <Roadmap />
                <Ecosystem />
                <Team />
                <Cta />
            </main>
            <Footer />
        </>
    );
};
