import Header from "@/componentsMHO/Header";
import HeroSection from "@/componentsMHO/HeroSection";
import Stats from "@/componentsMHO/Stats";
import WhoWeAre from "@/componentsMHO/WhoWeAre";
import HowItWorks from "@/componentsMHO/HowItWorks";
import Testimonial from "@/componentsMHO/Testimonial";
import JoinPanel from "@/componentsMHO/JoinPanel";
import Footer from "@/componentsMHO/Footer";
import WeArePart from "@/componentsMHO/WeArePart";
import Journey from "@/componentsMHO/Journey";

import HomeClient from "./homeclient";

export default function HomePage() {
  const sections = [
    { label: "About", id: "about" },
    { label: "Steps to Join", id: "how-it-works" },
    { label: "Contact Us", isExternalPage: true, path: "/contact" },
  ];

  return (
    <div
      id="scroll-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "linear-gradient(90deg, #fff 0, #fff1d8 100%)",
      }}
    >
      <Header sections={sections} />

      <HeroSection />
      <WeArePart />
      <Journey />
      <Stats />
      <WhoWeAre />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <Testimonial />
      <JoinPanel />
      <Footer sections={sections} />

      <HomeClient />
    </div>
  );
}
