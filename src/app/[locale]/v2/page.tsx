import { Inter, Montserrat } from "next/font/google";
import "./v2.css";
import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Marquee from "@/components/v2/V2Marquee";
import V2Metrics from "@/components/v2/V2Metrics";
import V2About from "@/components/v2/V2About";
import V2Bio from "@/components/v2/V2Bio";
import V2SuccessStories from "@/components/v2/V2SuccessStories";
import V2Pricing from "@/components/v2/V2Pricing";
import V2Contact from "@/components/v2/V2Contact";
import V2Footer from "@/components/v2/V2Footer";
import SplashScreenManager from "@/components/splash-screen-manager";
import CookieConsent from "@/components/cookie-consent";
import ScrollToTop from "@/components/common/scroll-to-top";
import V2WhatsappButton from "@/components/v2/V2WhatsappButton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
});

export default function V2Page() {
  return (
    <SplashScreenManager>
      <div
        className={`${inter.variable} ${montserrat.variable} v2-page bg-brand-black text-brand-text antialiased overflow-x-hidden`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <V2Nav />
        <V2Hero />
        <V2Marquee />
        <V2Metrics />
        <V2About />
        <V2Bio />
        <V2SuccessStories />
        <V2Pricing />
        <V2Contact />
        <V2Footer />
      </div>
      <V2WhatsappButton />
      <ScrollToTop />
      <CookieConsent />
    </SplashScreenManager>
  );
}
