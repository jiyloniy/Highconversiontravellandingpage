import { Navigation } from "../components/navigation";
import { HeroSection } from "../components/hero-section";
import { ExploreByMood } from "../components/explore-by-mood";
import { TrendingDestinations } from "../components/trending-destinations";
import { AiTripPlanner } from "../components/ai-trip-planner";
import { SocialProof } from "../components/social-proof";
import { LimitedDeals } from "../components/limited-deals";
import { ExperienceGallery } from "../components/experience-gallery";
import { WhyChooseUs } from "../components/why-choose-us";
import { HowItWorks } from "../components/how-it-works";
import { CommunityFeed } from "../components/community-feed";
import { CtaBanner } from "../components/cta-banner";
import { Footer } from "../components/footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif] overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ExploreByMood />
        <TrendingDestinations />
        <AiTripPlanner />
        <SocialProof />
        <LimitedDeals />
        <ExperienceGallery />
        <WhyChooseUs />
        <HowItWorks />
        <CommunityFeed />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
