import "./index.css";
import ContactUs from "@/components/contact-us";
import Testimonial from "@/components/testimonial";
import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import LanguageSelector from "@/components/language-selector";
import ScrollToTop from "@/components/scroll-to-top";
// import Parallax from "@/components/parallax";
import AboutMe from "@/components/about-me";
import Pricing from "@/components/pricing";
import ZoomParallax from "@/components/ZoomParallax";

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
