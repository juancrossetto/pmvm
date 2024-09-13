import "./index.css";
import ContactUs from "@/components/sections/contact-us";
import Testimonial from "@/components/sections/testimonial";
import { useTranslations } from "next-intl";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Footer from "@/components/sections/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
// import Parallax from "@/components/parallax";
import AboutMe from "@/components/sections/about-me";
import Pricing from "@/components/sections/pricing";
import Metrics from "@/components/sections/metrics";
import WhatsappButton from "@/components/common/whatsapp-button";
import SplashScreenManager from "@/components/splash-screen-manager";
import Header from "@/components/sections/header";
import CookieConsent from "@/components/cookie-consent";
import ParallaxMessage from "@/components/sections/parallax-message";
import Transformations from "@/components/sections/transformations";
import Transformations2 from "@/components/sections/transformations2";

const MyApp = () => {
	return (
		<SplashScreenManager>
			<div className='flex flex-col min-h-[100vh] bg-lightColor dark:bg-darkColor'>
				<Header />
				<main className='flex-1'>
					<Hero />
					<AboutMe />
					<Metrics />
					<Transformations />
					<Transformations2 />
					<ParallaxMessage />
					<Pricing /> 
					{/* <Services />
					<Testimonial /> */}
					<ContactUs />
				</main>
				<Footer />
			</div>
			<WhatsappButton />
			<ScrollToTop />
			<CookieConsent />
		</SplashScreenManager>
	);
};

export default MyApp;
