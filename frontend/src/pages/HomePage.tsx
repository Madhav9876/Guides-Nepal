import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedExperiences } from '../components/home/FeaturedExperiences';
import { PromoBanner } from '../components/home/PromoBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { Testimonials } from '../components/home/Testimonials';
import { ValuePropositions } from '../components/home/ValuePropositions';

interface HomePageProps {
  onCartOpen: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCartOpen }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onCartOpen={onCartOpen} />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedExperiences />
        <PromoBanner />
        <CategoryGrid />
        <Testimonials />
        <ValuePropositions />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
