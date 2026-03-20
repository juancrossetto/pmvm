import { Bebas_Neue, Inter } from "next/font/google";
import "./v3.css";
import V3SplashManager from "@/components/v3/V3SplashScreen";
import V3Nav from "@/components/v3/V3Nav";
import V3Hero from "@/components/v3/V3Hero";
import V3About from "@/components/v3/V3About";
import V3Program from "@/components/v3/V3Program";
import V3Testimonials from "@/components/v3/V3Testimonials";
import V3Pricing from "@/components/v3/V3Pricing";
import V3FAQ from "@/components/v3/V3FAQ";
import V3Contact from "@/components/v3/V3Contact";
import V3Footer from "@/components/v3/V3Footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import V2WhatsappButton from "@/components/v2/V2WhatsappButton";
import CookieConsent from "@/components/cookie-consent";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function V3Page() {
  return (
    <div
      className={`${bebasNeue.variable} ${inter.variable} v3-page bg-brand-black text-brand-text antialiased overflow-x-hidden`}
    >
      <V3SplashManager>
        <V3Nav />
        <V3Hero />
        <V3About />
        <V3Program />
        <V3Testimonials />
        <V3Pricing />
        <V3FAQ />
        <V3Contact />
        <V3Footer />
        <V2WhatsappButton />
        <ScrollToTop />
        <CookieConsent />
      </V3SplashManager>
    </div>
  );
}
