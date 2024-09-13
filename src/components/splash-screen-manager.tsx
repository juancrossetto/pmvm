'use client'
import React, { useEffect, useState } from "react";
import SplashScreen from "./common/splash-screen";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";

const SplashScreenManager = ({ children }: { children: any }) => {
	const [showSplash, setShowSplash] = useState(true);
	const isMobile = useClientMediaQuery("(max-width: 640px)");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowSplash(false);
		}, 2500);
		return () => clearTimeout(timeout);
	}, []);

	const finishLoading = () => {
		setShowSplash(false);
	};
	return showSplash ? <SplashScreen finishLoading={finishLoading} isMobile={isMobile} loading={true} /> : children;
};

export default SplashScreenManager;
