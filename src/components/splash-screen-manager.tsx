'use client'
import React, { useEffect, useState } from "react";
import SplashScreen from "./common/splash-screen";

const SplashScreenManager = ({ children }: { children: any }) => {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowSplash(false);
		}, 2500);
		return () => clearTimeout(timeout);
	}, []);

	const finishLoading = () => {
		setShowSplash(false);
	};
	return showSplash ? <SplashScreen finishLoading={finishLoading} loading={true} /> : children;
};

export default SplashScreenManager;
