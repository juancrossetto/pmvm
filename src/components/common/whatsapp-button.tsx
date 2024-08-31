"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";

const WhatsappButton = () => {
	const isMobile = useClientMediaQuery("(max-width: 640px)");
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href='https://wa.me/5491170636497' passHref target='_blank'>
						<div className='fixed bottom-4 right-3 z-50 cursor-pointer'>
							<button
								aria-label='Contact us on WhatsApp'
								className='relative  bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
							>
								<FaWhatsapp size={isMobile ? 16 : 20} />
								<span className='absolute inset-0 bg-green-500 opacity-75 rounded-full animate-ping duration-5000 ping-slow'></span>
							</button>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<span>Contact us on WhatsApp</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default WhatsappButton;
