"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
	const t = useTranslations("cookies");
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Check if user has already made a choice
		const consentGiven = localStorage.getItem("cookieConsent");
		if (consentGiven === null) {
			setShowBanner(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("cookieConsent", "accepted");
		setShowBanner(false);
	};

	const handleReject = () => {
		localStorage.setItem("cookieConsent", "rejected");
		setShowBanner(false);
	};

	return (
		<AnimatePresence>
			{showBanner && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.5 }}
					className='fixed bottom-0 left-0 right-0 bg-lightColor dark:bg-darkColor border-t border-border p-4 md:p-6 shadow-lg z-50'
				>
					<div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
						<div className='flex-1'>
							<h2 className='text-lg font-semibold mb-2'>{t("title")}</h2>
							<p className='text-muted-foreground'>{t("text")}</p>
						</div>
						<div className='flex flex-col sm:flex-row gap-2'>
							<Button variant='outline' onClick={handleReject}>
								{t("btn_cancel")}
							</Button>
							<Button onClick={handleAccept}>{t("btn_accept")}</Button>
						</div>
						<Button
							variant='ghost'
							size='icon'
							className='absolute top-2 right-2'
							onClick={handleReject}
							aria-label='Cerrar banner de cookies'
						>
							<X className='h-4 w-4' />
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
