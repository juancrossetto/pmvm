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
			<header className='header'>
				<Link
					// className='flex items-center justify-center'
					className='logo'
					href='#'
				>
					<Avatar className='h-12 w-12'>
						<AvatarImage
							className='bg-white'
							src={`/images/icon.webp`}
							alt={"Pesá menos, viví más"}
						/>
						<AvatarFallback>PMVM</AvatarFallback>
					</Avatar>
				</Link>
				{/* <a href="#" className="logo">PMVM</a> */}
				<nav className='navbar'>
					<a href='#services' className='active'>{t("services")}</a>
					<a href='#testimonials'>{t("testimonials")}</a>
					<a href='#contact'>{t("contact")}</a>
				</nav>
				<div className='language-selector-container'>
					<LanguageSelector />
				</div>
				<div className="div-empty"/>
			</header>
		</>
	);
};

export default Header;
