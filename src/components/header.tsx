"use client";
import React from "react";
import Link from "next/link";
import { DumbbellIcon } from "lucide-react";
import LanguageSelector from "./language-selector";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
	const t = useTranslations("header");
	return (
		<>
			<header className='flex items-center justify-between py-6'>
				<Link className='flex items-center justify-center' href='#'>
					<Avatar className='h-14 w-14 mr-2'>
						<AvatarImage
							src={`/images/icon.webp`}
							alt={"Pesá menos, viví más"}
						/>
						<AvatarFallback>PMVM</AvatarFallback>
					</Avatar>
					{/* <span className='ml-2 text-2xl font-bold text-white'>PMVM</span> */}
				</Link>
				<nav className='hidden md:flex space-x-8'>
					<Link
						className='text-[21px] font-medium text-white hover:text-gray-300 transition-colors transition-transform duration-[950ms] ease-in-out hover:scale-105'
						href='#about'
					>
						{t("about")}
					</Link>
					<Link
						className='text-[21px] font-medium text-white hover:text-gray-300 transition-colors transition-transform duration-[950ms] ease-in-out hover:scale-105'
						href='#services'
					>
						{t("services")}
					</Link>
					<Link
						className='text-[21px] font-medium text-white hover:text-gray-300 transition-colors transition-transform duration-900 ease-in-out hover:scale-105'
						href='#testimonials'
					>
						{t("testimonials")}
					</Link>
					<Link
						className='text-[21px] font-medium text-white hover:text-gray-300 transition-colors transition-transform duration-900 ease-in-out hover:scale-105'
						href='#contact'
					>
						{t("contact")}
					</Link>
				</nav>
				<div/>
				{/* <Button className='hidden md:inline-flex'>{t("schedule-consultation")}</Button> */}
			</header>
		</>
	);
};

export default Header;
