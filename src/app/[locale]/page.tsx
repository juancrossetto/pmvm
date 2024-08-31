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
import ZoomParallax from "@/components/ZoomParallax";
import Metrics from "@/components/sections/metrics";
import WhatsappButton from "@/components/common/whatsapp-button";
import { Suspense } from "react";
import SplashScreenManager from "@/components/splash-screen-manager";

const MyApp = () => {
	return (
		<SplashScreenManager>
			<div className='flex flex-col min-h-[100vh] bg-darkColor'>
				{/* <Header /> */}
				<main className='flex-1'>
					<Hero />
					{/* <Parallax/> */}
					{/* <ZoomParallax /> */}
					<AboutMe />
					<Metrics />
					<Pricing />
					{/* <Services />
					<Testimonial />
					<ContactUs /> */}
				</main>
				<Footer />
			</div>
			<WhatsappButton />
			<ScrollToTop />
		</SplashScreenManager>
	);
};

export default MyApp;
