"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import useSound from "use-sound";
import { useTheme } from "next-themes";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ThemeSelector() {
	const { theme, setTheme } = useTheme();

	const [play] = useSound("/audios/lightswitch.mp3", {
		volume: 1,
		sprite: {
			light: [0, 300],
			dark: [500, 300],
		},
	});

	const handleClick = () => {
		if (theme === "dark") {
			play({ id: "light" });
			setTheme("light");
		} else {
			play({ id: "dark" });
			setTheme("dark");
		}
	};

	return (
		<div id='navbar-chat-theme-selector' className='flex items-center'>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div
							className={`flex justify-center items-center cursor-pointer ${
								theme === "dark" ? "text-yellow-400" : "text-blue-400"
							}`}
							onClick={handleClick}
						>
							{theme === "dark" ? (
								<SunIcon className='h-6 w-6' />
							) : (
								<MoonIcon className='h-6 w-6' />
							)}
						</div>
					</TooltipTrigger>
					<TooltipContent>
						{theme === "dark"
							? "Cambiar a tema claro"
							: "Cambiar a tema oscuro"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
