import React from 'react'
import { MurfyNavbar } from '../../Organisms/MurfyNavbar/MurfyNavbar'
import { HeroSection } from '../../Organisms/HeroSection/HeroSection'
import { WhyMurfySection } from '../../Organisms/WhyMurfySection/WhyMurfySection'
import { TrustpilotSection } from '../../Organisms/TrustpilotSection/TrustpilotSection'
import { AllServicesSection } from '../../Organisms/AllServicesSection/AllServicesSection'
import { NewsletterSection } from '../../Organisms/NewsletterSection/NewsletterSection'
import { ImpactSection } from '../../Organisms/ImpactSection/ImpactSection'
import { ServiceAreaSection } from '../../Organisms/ServiceAreaSection/ServiceAreaSection'
import { SeoSection } from '../../Organisms/SeoSection/SeoSection'
import { RecruitmentSection } from '../../Organisms/RecruitmentSection/RecruitmentSection'
import { CitiesSection } from '../../Organisms/CitiesSection/CitiesSection'
import { Footer } from '../../Molecules/Footer/Footer'

export interface HomePageProps {
  heroImageUrl?: string
  impactImageUrl?: string
  recruitmentImageUrl?: string
}


export function HomePage({ heroImageUrl, impactImageUrl, recruitmentImageUrl }: HomePageProps) {
  return (
    <div className="w-full flex flex-col">
      <MurfyNavbar />
      <HeroSection imageUrl={heroImageUrl} />
      <WhyMurfySection />
      <TrustpilotSection />
      <AllServicesSection />
      <NewsletterSection />
      <ImpactSection imageUrl={impactImageUrl} />
      <ServiceAreaSection />
      <SeoSection />
      <RecruitmentSection imageUrl={recruitmentImageUrl} />
      <CitiesSection />
      <Footer />
    </div>
  )
}
