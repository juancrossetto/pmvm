import "./index.css";
import ContactUs from "@/components/contact-us";
import Testimonial from "@/components/testimonial";
import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import LanguageSelector from "@/components/language-selector";
import ScrollToTop from "@/components/scroll-to-top";

const MyApp = () => {
	const t = useTranslations("header");

	return (
		<>
			<div className='flex flex-col min-h-[100dvh]'>
				{/* <Header /> */}
				<main className='flex-1'>
					<Hero />
					<Services />
					<Testimonial />
					<ContactUs />
				</main>
				<Footer />
			</div>
			<div className='absolute top-[20px] right-[20px]'>
				<LanguageSelector />
			</div>
			<ScrollToTop />
		</>
	);
};

export default MyApp;
