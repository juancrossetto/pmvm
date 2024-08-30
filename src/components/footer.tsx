import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
	const t = useTranslations("footer");
	return (
		<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#212121] border-t-bg-darkColor'>
			<p className='text-xs text-muted-foreground text-white text-[14px]'>{t("copyright")}</p>
			<nav className='sm:ml-auto flex gap-4 sm:gap-6'>
				<Link
					href='#'
					className='text-xs hover:underline underline-offset-4 text-white text-[14px]'
					prefetch={false}
				>
					{t("terms")}
				</Link>
				<Link
					href='#'
					className='text-xs hover:underline underline-offset-4 text-white text-[14px]'
					prefetch={false}
				>
					{t("privacy")}
				</Link>
			</nav>
		</footer>
	);
};

export default Footer;
