import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LoadingProps {
	loading: boolean;
}

const bgStart = "#2e2e2d";
const bgEnd = "#009CA6"; //'#3ecfda'
const animationTime = 900;
const animationTimingFunction = "cubic-bezier(0.82, 0.12, 0.8, 0.35)";

const Loading = ({ loading }: LoadingProps) => {
	const [finishedStartSlide, setFinishedStartSlide] = useState(false);
	const [finishedAnimation, setFinishedAnimation] = useState(false);

	useEffect(() => {
		if (!finishedStartSlide) {
			setTimeout(() => {
				setFinishedStartSlide(true);
			}, animationTime);
		}
	}, [finishedStartSlide]);

	useEffect(() => {
		if (!loading && finishedStartSlide) {
			setTimeout(() => {
				setFinishedAnimation(true);
			}, animationTime);
		}

		if (loading) {
			setFinishedAnimation(false);
			setFinishedStartSlide(false);
		}
	}, [loading, finishedStartSlide]);

	if (finishedAnimation) return null;

	return (
		<div className='fixed inset-0 z-[1000] bg-[#009CA6] w-full h-full'>
			<div className='flex w-full h-full items-center justify-center'>
				<Avatar className='h-12 w-12'>
					<AvatarImage
						className='bg-white'
						src={`/images/icon.webp`}
						alt={"Pesá menos, viví más"}
					/>
					<AvatarFallback>PMVM</AvatarFallback>
				</Avatar>
				{/* <Icon className="beat" icon="sanFrancisco" zIndex={1001} size={110} color="white" squareColor="white" /> */}
				<div
					className={`cover-start ${
						!loading && finishedStartSlide ? "hidden" : ""
					}`}
				/>
				{!loading && finishedStartSlide && <div className='cover-end' />}
			</div>
			<style jsx>{`
				@keyframes slide-start {
					from {
						left: -100vw;
					}
					to {
						left: 0;
					}
				}

				@keyframes slide-end {
					from {
						right: -100vw;
					}
					to {
						right: 0;
					}
				}

				.cover-start {
					position: fixed;
					height: 100vh;
					width: 100vw;
					top: 0;
					left: -100vw;
					z-index: 1000;
					background-color: ${bgStart};
					animation: slide-start ${animationTime}ms ${animationTimingFunction}
						forwards;
				}

				.cover-end {
					position: fixed;
					height: 100vh;
					width: 100vw;
					top: 0;
					right: -100vw;
					z-index: 1002;
					background-color: ${bgEnd};
					animation: slide-end ${animationTime}ms ${animationTimingFunction}
						forwards;
				}
			`}</style>
		</div>
	);
};

export default Loading;
