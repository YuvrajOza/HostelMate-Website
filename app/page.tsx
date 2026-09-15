import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { PopularCities } from '@/components/popular-cities';
import { WhyHostelMate } from '@/components/why-hostelmate';
import { HowItWorks } from '@/components/how-it-works';
import { AiCta } from '@/components/ai-cta';
import { TrustSection } from '@/components/trust-section';
import { Footer } from '@/components/footer';

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <PopularCities />
                <WhyHostelMate />
                <HowItWorks />
                <AiCta />
                <TrustSection />
            </main>
            <Footer />
        </>
    );
}