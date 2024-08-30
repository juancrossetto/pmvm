"use client";
import React, { useState } from "react";
import Link from "next/link";
import { DumbbellIcon, Menu, X } from "lucide-react";
import LanguageSelector from "../language-selector";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import ThemeSelector from "../theme-selector";

const Header = () => {
	return (
		<>
			<header
			// className='header'
			>
				<Navbar />
			</header>
		</>
	);
};

export default Header;

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const t = useTranslations("header");
	// const [currentLanguage, setCurrentLanguage] = useState('es')
	const navItems = [
		{ name: "services", href: "#services" },
		{ name: "testimonials", href: "#testimonials" },
		{ name: "contact", href: "#contact" },
	];
	return (
		<nav className='navbar shadow-md'>
			<div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16 relative z-[1]'>
					<div className='flex-shrink-0 flex items-center'>
						<Logo className='logo' />
					</div>

					<div className='hidden sm:flex sm:items-center sm:justify-center flex-1'>
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='px-3 py-2 rounded-md text-sm font-medium'
							>
								{t(item.name)}
							</Link>
						))}
					</div>

					<div className='hidden sm:flex sm:items-center'>
						<ThemeSelector />
					</div>

					{/* Language Selector (Desktop) */}
					<div className='hidden sm:flex sm:items-center'>
						<LanguageSelector />
					</div>

					{/* Mobile menu button */}
					<div className='sm:hidden flex items-center z-[1]'>
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button
									variant='ghost'
									className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryColor'
									onClick={() => setIsOpen(!isOpen)}
								>
									<span className='sr-only'>Abrir menú principal</span>
									<Menu className='h-6 w-6' aria-hidden='true' />
								</Button>
							</SheetTrigger>
							<SheetContent
								side='right'
								className='w-[400px] sm:w-[500px] bg-darkColor'
							>
								<nav className='flex flex-col h-full'>
									<div className='flex items-center justify-between mb-8 ml-2'>
										<Logo />
									</div>
									<div className='flex flex-col space-y-4 items-center'>
										{navItems.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className='px-3 py-2 rounded-md text-base font-medium text-white'
												onClick={() => setIsOpen(!isOpen)}
											>
												{t(item.name)}
											</Link>
										))}
									</div>
									<div className='mt-auto mb-8 flex justify-around items-center'>
										<ThemeSelector />
										<LanguageSelector />
									</div>
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
};

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link className={className} href='#'>
			<Avatar className='h-12 w-12'>
				<AvatarImage
					className='bg-white'
					src={`/images/icon.webp`}
					alt={"Pesá menos, viví más"}
				/>
				<AvatarFallback>PMVM</AvatarFallback>
			</Avatar>
		</Link>
	);
};
