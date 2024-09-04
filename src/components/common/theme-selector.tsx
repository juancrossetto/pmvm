"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ThemeSelector() {
	const { setTheme } = useTheme();
	return (
		<div id='navbar-chat-theme-selector'>
			<DropdownMenu>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<DropdownMenuTrigger asChild>
								<div className='flex justify-center items-center mr-2 cursor-pointer text-icons'>
									<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0  text-darkColor dark:text-white sm:text-white dark:sm:text-darkColor' />
									<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-darkColor dark:text-white' />
									<span className='sr-only'>Cambiar tema</span>
								</div>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>Cambiar Tema</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={() => setTheme("light")}>
						Claro
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Oscuro
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						Sistema
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
