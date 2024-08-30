import { useEffect, useRef, useState } from "react";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";

interface CounterProps {
	value: number;
	fontSize?: number;
	padding?: number;
	className?: string;
}

interface DigitProps {
	place: number;
	value: number;
	isVisible: boolean;
	height: number;
}

interface NumberProps {
	mv: MotionValue<number>;
	number: number;
	height: number;
}

function Counter({
	value,
	fontSize = 70,
	padding = 15,
	className = "",
}: CounterProps) {
	const height = fontSize + padding;
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect(); // Para ejecutar la animación solo una vez
				}
			},
			{
				threshold: 0.1, // Se activa cuando el 10% del componente es visible
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);

	// Convertir el valor en dígitos y eliminar ceros a la izquierda
	const digits = String(value)
		.split('')
		.map((digit) => parseInt(digit, 10))
		.filter((digit, index, arr) => digit !== 0 || index === arr.length - 1);

	return (
		<div
			ref={ref}
			style={{ fontSize }}
			className={`flex space-x-3 overflow-hidden rounded bg-transparent px-2 leading-none text-darkColor dark:text-lightColor font-bold ${className}`}
		>
			{digits.map((_, index) => (
				<Digit
					key={index}
					place={Math.pow(10, digits.length - index - 1)}
					value={value}
					isVisible={isVisible}
					height={height}
				/>
			))}
		</div>
	);
}

function Digit({ place, value, isVisible, height }: DigitProps) {
	let valueRoundedToPlace = Math.floor(value / place);
	let animatedValue = useSpring(isVisible ? valueRoundedToPlace : 0, {
		stiffness: 50, // Disminuye la rigidez para hacer la animación más lenta
		damping: 20, // Aumenta la amortiguación para suavizar la animación
	});

	useEffect(() => {
		if (isVisible) {
			animatedValue.set(valueRoundedToPlace);
		}
	}, [animatedValue, valueRoundedToPlace, isVisible]);

	return (
		<div style={{ height }} className='relative w-[.7ch] tabular-nums'>
			{Array.from(Array(10).keys()).map((i) => (
				<Number key={i} mv={animatedValue} number={i} height={height} />
			))}
		</div>
	);
}

function Number({ mv, number, height }: NumberProps) {
	let y = useTransform(mv, (latest) => {
		let placeValue = latest % 10;
		let offset = (10 + number - placeValue) % 10;

		let memo = offset * height;

		if (offset > 5) {
			memo -= 10 * height;
		}

		return memo;
	});

	return (
		<motion.span
			style={{ y }}
			className='absolute inset-0 flex items-center justify-center'
		>
			{number}
		</motion.span>
	);
}

export default Counter;
