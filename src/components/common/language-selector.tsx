"use client";
import React, { useTransition } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function LanguageSelector() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const pathname = usePathname();
	const localActive = useLocale();

	const changeLanguage = (lang: string) => {
		const nextLocale = lang;
		startTransition(() => {
			router.replace(`/${nextLocale}`);
		});
	};

	const languageFlags = {
		es: "/flags/es.svg",
		en: "/flags/en.svg",
		pt: "/flags/pt.svg",
	} as any;
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					disabled={isPending}
					className='focus:ring-0 focus:ring-transparent !important'
				>
					<Button
						variant='outline'
						size='sm'
						className='border-none shadow-none bg-transparent hover:bg-transparent focus:ring-0 focus:ring-transparent !important'
					>
						<Image
							src={languageFlags[localActive]}
							alt={localActive}
							width={35}
							height={35}
							className='rounded-md'
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => changeLanguage("es")}>
						<img
							src='/flags/es.svg'
							alt='Español'
							className='inline-block w-4 h-4 mr-2'
						/>
						Español
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => changeLanguage("en")}>
						<img
							src='/flags/en.svg'
							alt='English'
							className='inline-block w-4 h-4 mr-2'
						/>
						English
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => changeLanguage("pt")}>
						<img
							src='/flags/pt.svg'
							alt='Português'
							className='inline-block w-4 h-4 mr-2'
						/>
						Português
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
