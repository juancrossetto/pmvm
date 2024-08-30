import "./index.css";
import ContactUs from "@/components/sections/contact-us";
import Testimonial from "@/components/sections/testimonial";
import { useTranslations } from "next-intl";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Footer from "@/components/sections/footer";
import LanguageSelector from "@/components/language-selector";
import ScrollToTop from "@/components/scroll-to-top";
// import Parallax from "@/components/parallax";
import AboutMe from "@/components/sections/about-me";
import Pricing from "@/components/sections/pricing";
import ZoomParallax from "@/components/ZoomParallax";
import Metrics from "@/components/sections/metrics";

const MyApp = () => {
	return (
		<>
			<div className='flex flex-col min-h-[100vh] bg-darkColor'>
				{/* <Header /> */}
				<main className='flex-1'>
					<Hero />
					{/* <Parallax/> */}
					{/* <ZoomParallax /> */}
					<AboutMe />
					<Metrics />
					<Pricing />
					<Services />
					<Testimonial />
					<ContactUs />
				</main>
				<Footer />
			</div>
			<ScrollToTop />
		</>
	);
};

export default MyApp;
