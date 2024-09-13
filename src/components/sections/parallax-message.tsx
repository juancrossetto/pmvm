import { useTranslations } from "next-intl";
import ParallaxText from "../common/parallax-text";

const SVGBackground = () => (
	<svg
		className='absolute inset-0 w-full h-full'
		xmlns='http://www.w3.org/2000/svg'
		version='1.1'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		viewBox='0 0 1422 800'
		preserveAspectRatio='xMinYMin slice'
		opacity='0.15'
	>
		<g stroke-width='10.5' stroke='#fad02c' fill='none' stroke-linecap='butt'>
			<line x1='92' y1='0' x2='0' y2='92' opacity='0.22'></line>
			<line x1='92' y1='0' x2='184' y2='92' opacity='0.35'></line>
			<line x1='184' y1='0' x2='276' y2='92' opacity='0.36'></line>
			<line x1='276' y1='0' x2='368' y2='92' opacity='0.57'></line>
			<line x1='368' y1='0' x2='460' y2='92' opacity='0.82'></line>
			<line x1='460' y1='0' x2='552' y2='92' opacity='0.90'></line>
			<line x1='552' y1='0' x2='644' y2='92' opacity='0.46'></line>
			<line x1='644' y1='0' x2='736' y2='92' opacity='0.38'></line>
			<line x1='736' y1='0' x2='828' y2='92' opacity='0.30'></line>
			<line x1='920' y1='0' x2='828' y2='92' opacity='0.47'></line>
			<line x1='920' y1='0' x2='1012' y2='92' opacity='0.71'></line>
			<line x1='1012' y1='0' x2='1104' y2='92' opacity='0.32'></line>
			<line x1='1196' y1='0' x2='1104' y2='92' opacity='0.17'></line>
			<line x1='1196' y1='0' x2='1288' y2='92' opacity='0.90'></line>
			<line x1='1380' y1='0' x2='1288' y2='92' opacity='0.63'></line>
			<line x1='1472' y1='0' x2='1380' y2='92' opacity='0.58'></line>
			<line x1='0' y1='92' x2='92' y2='184' opacity='0.58'></line>
			<line x1='184' y1='92' x2='92' y2='184' opacity='0.31'></line>
			<line x1='276' y1='92' x2='184' y2='184' opacity='0.38'></line>
			<line x1='276' y1='92' x2='368' y2='184' opacity='0.47'></line>
			<line x1='368' y1='92' x2='460' y2='184' opacity='0.57'></line>
			<line x1='552' y1='92' x2='460' y2='184' opacity='0.30'></line>
			<line x1='552' y1='92' x2='644' y2='184' opacity='0.32'></line>
			<line x1='736' y1='92' x2='644' y2='184' opacity='0.11'></line>
			<line x1='736' y1='92' x2='828' y2='184' opacity='0.07'></line>
			<line x1='828' y1='92' x2='920' y2='184' opacity='0.79'></line>
			<line x1='920' y1='92' x2='1012' y2='184' opacity='0.23'></line>
			<line x1='1104' y1='92' x2='1012' y2='184' opacity='0.70'></line>
			<line x1='1104' y1='92' x2='1196' y2='184' opacity='0.92'></line>
			<line x1='1196' y1='92' x2='1288' y2='184' opacity='0.71'></line>
			<line x1='1288' y1='92' x2='1380' y2='184' opacity='0.68'></line>
			<line x1='1380' y1='92' x2='1472' y2='184' opacity='0.38'></line>
			<line x1='92' y1='184' x2='0' y2='276' opacity='0.35'></line>
			<line x1='92' y1='184' x2='184' y2='276' opacity='0.67'></line>
			<line x1='184' y1='184' x2='276' y2='276' opacity='0.64'></line>
			<line x1='276' y1='184' x2='368' y2='276' opacity='0.34'></line>
			<line x1='460' y1='184' x2='368' y2='276' opacity='0.45'></line>
			<line x1='460' y1='184' x2='552' y2='276' opacity='0.42'></line>
			<line x1='552' y1='184' x2='644' y2='276' opacity='0.54'></line>
			<line x1='644' y1='184' x2='736' y2='276' opacity='0.61'></line>
			<line x1='828' y1='184' x2='736' y2='276' opacity='0.33'></line>
			<line x1='920' y1='184' x2='828' y2='276' opacity='0.20'></line>
			<line x1='920' y1='184' x2='1012' y2='276' opacity='0.28'></line>
			<line x1='1012' y1='184' x2='1104' y2='276' opacity='0.38'></line>
			<line x1='1104' y1='184' x2='1196' y2='276' opacity='0.57'></line>
			<line x1='1196' y1='184' x2='1288' y2='276' opacity='0.18'></line>
			<line x1='1288' y1='184' x2='1380' y2='276' opacity='0.98'></line>
			<line x1='1380' y1='184' x2='1472' y2='276' opacity='0.30'></line>
			<line x1='92' y1='276' x2='0' y2='368' opacity='0.90'></line>
			<line x1='92' y1='276' x2='184' y2='368' opacity='0.17'></line>
			<line x1='184' y1='276' x2='276' y2='368' opacity='0.67'></line>
			<line x1='368' y1='276' x2='276' y2='368' opacity='0.70'></line>
			<line x1='368' y1='276' x2='460' y2='368' opacity='0.21'></line>
			<line x1='460' y1='276' x2='552' y2='368' opacity='0.16'></line>
			<line x1='644' y1='276' x2='552' y2='368' opacity='0.46'></line>
			<line x1='736' y1='276' x2='644' y2='368' opacity='0.70'></line>
			<line x1='736' y1='276' x2='828' y2='368' opacity='0.37'></line>
			<line x1='920' y1='276' x2='828' y2='368' opacity='0.72'></line>
			<line x1='920' y1='276' x2='1012' y2='368' opacity='0.62'></line>
			<line x1='1012' y1='276' x2='1104' y2='368' opacity='0.67'></line>
			<line x1='1104' y1='276' x2='1196' y2='368' opacity='0.52'></line>
			<line x1='1196' y1='276' x2='1288' y2='368' opacity='0.58'></line>
			<line x1='1288' y1='276' x2='1380' y2='368' opacity='0.29'></line>
			<line x1='1472' y1='276' x2='1380' y2='368' opacity='0.27'></line>
			<line x1='0' y1='368' x2='92' y2='460' opacity='1.00'></line>
			<line x1='92' y1='368' x2='184' y2='460' opacity='0.41'></line>
			<line x1='184' y1='368' x2='276' y2='460' opacity='0.76'></line>
			<line x1='368' y1='368' x2='276' y2='460' opacity='0.68'></line>
			<line x1='460' y1='368' x2='368' y2='460' opacity='0.64'></line>
			<line x1='552' y1='368' x2='460' y2='460' opacity='0.25'></line>
			<line x1='552' y1='368' x2='644' y2='460' opacity='0.13'></line>
			<line x1='644' y1='368' x2='736' y2='460' opacity='0.45'></line>
			<line x1='736' y1='368' x2='828' y2='460' opacity='0.31'></line>
			<line x1='828' y1='368' x2='920' y2='460' opacity='0.79'></line>
			<line x1='1012' y1='368' x2='920' y2='460' opacity='0.29'></line>
			<line x1='1012' y1='368' x2='1104' y2='460' opacity='0.83'></line>
			<line x1='1196' y1='368' x2='1104' y2='460' opacity='0.85'></line>
			<line x1='1288' y1='368' x2='1196' y2='460' opacity='0.10'></line>
			<line x1='1380' y1='368' x2='1288' y2='460' opacity='0.82'></line>
			<line x1='1380' y1='368' x2='1472' y2='460' opacity='0.96'></line>
			<line x1='0' y1='460' x2='92' y2='552' opacity='0.33'></line>
			<line x1='92' y1='460' x2='184' y2='552' opacity='0.62'></line>
			<line x1='184' y1='460' x2='276' y2='552' opacity='0.75'></line>
			<line x1='276' y1='460' x2='368' y2='552' opacity='0.75'></line>
			<line x1='368' y1='460' x2='460' y2='552' opacity='0.68'></line>
			<line x1='460' y1='460' x2='552' y2='552' opacity='0.74'></line>
			<line x1='552' y1='460' x2='644' y2='552' opacity='0.81'></line>
			<line x1='736' y1='460' x2='644' y2='552' opacity='0.46'></line>
			<line x1='736' y1='460' x2='828' y2='552' opacity='0.58'></line>
			<line x1='828' y1='460' x2='920' y2='552' opacity='0.37'></line>
			<line x1='920' y1='460' x2='1012' y2='552' opacity='0.84'></line>
			<line x1='1012' y1='460' x2='1104' y2='552' opacity='0.72'></line>
			<line x1='1104' y1='460' x2='1196' y2='552' opacity='0.98'></line>
			<line x1='1196' y1='460' x2='1288' y2='552' opacity='0.74'></line>
			<line x1='1288' y1='460' x2='1380' y2='552' opacity='0.40'></line>
			<line x1='1472' y1='460' x2='1380' y2='552' opacity='0.96'></line>
			<line x1='92' y1='552' x2='0' y2='644' opacity='0.55'></line>
			<line x1='184' y1='552' x2='92' y2='644' opacity='0.83'></line>
			<line x1='184' y1='552' x2='276' y2='644' opacity='0.49'></line>
			<line x1='276' y1='552' x2='368' y2='644' opacity='0.50'></line>
			<line x1='460' y1='552' x2='368' y2='644' opacity='0.83'></line>
			<line x1='460' y1='552' x2='552' y2='644' opacity='0.98'></line>
			<line x1='552' y1='552' x2='644' y2='644' opacity='0.10'></line>
			<line x1='644' y1='552' x2='736' y2='644' opacity='0.62'></line>
			<line x1='736' y1='552' x2='828' y2='644' opacity='0.61'></line>
			<line x1='828' y1='552' x2='920' y2='644' opacity='0.17'></line>
			<line x1='920' y1='552' x2='1012' y2='644' opacity='0.27'></line>
			<line x1='1012' y1='552' x2='1104' y2='644' opacity='0.90'></line>
			<line x1='1196' y1='552' x2='1104' y2='644' opacity='0.98'></line>
			<line x1='1196' y1='552' x2='1288' y2='644' opacity='0.96'></line>
			<line x1='1288' y1='552' x2='1380' y2='644' opacity='0.54'></line>
			<line x1='1472' y1='552' x2='1380' y2='644' opacity='0.16'></line>
			<line x1='0' y1='644' x2='92' y2='736' opacity='0.28'></line>
			<line x1='92' y1='644' x2='184' y2='736' opacity='0.99'></line>
			<line x1='184' y1='644' x2='276' y2='736' opacity='0.22'></line>
			<line x1='368' y1='644' x2='276' y2='736' opacity='0.52'></line>
			<line x1='368' y1='644' x2='460' y2='736' opacity='0.63'></line>
			<line x1='460' y1='644' x2='552' y2='736' opacity='0.27'></line>
			<line x1='552' y1='644' x2='644' y2='736' opacity='0.47'></line>
			<line x1='644' y1='644' x2='736' y2='736' opacity='0.87'></line>
			<line x1='828' y1='644' x2='736' y2='736' opacity='0.43'></line>
			<line x1='828' y1='644' x2='920' y2='736' opacity='0.82'></line>
			<line x1='920' y1='644' x2='1012' y2='736' opacity='0.65'></line>
			<line x1='1104' y1='644' x2='1012' y2='736' opacity='0.46'></line>
			<line x1='1196' y1='644' x2='1104' y2='736' opacity='0.09'></line>
			<line x1='1196' y1='644' x2='1288' y2='736' opacity='0.36'></line>
			<line x1='1288' y1='644' x2='1380' y2='736' opacity='0.46'></line>
			<line x1='1380' y1='644' x2='1472' y2='736' opacity='0.75'></line>
			<line x1='0' y1='736' x2='92' y2='828' opacity='0.72'></line>
			<line x1='184' y1='736' x2='92' y2='828' opacity='0.82'></line>
			<line x1='184' y1='736' x2='276' y2='828' opacity='0.38'></line>
			<line x1='276' y1='736' x2='368' y2='828' opacity='0.66'></line>
			<line x1='460' y1='736' x2='368' y2='828' opacity='0.32'></line>
			<line x1='460' y1='736' x2='552' y2='828' opacity='0.36'></line>
			<line x1='552' y1='736' x2='644' y2='828' opacity='0.29'></line>
			<line x1='644' y1='736' x2='736' y2='828' opacity='0.89'></line>
			<line x1='828' y1='736' x2='736' y2='828' opacity='0.62'></line>
			<line x1='920' y1='736' x2='828' y2='828' opacity='0.33'></line>
			<line x1='1012' y1='736' x2='920' y2='828' opacity='0.52'></line>
			<line x1='1012' y1='736' x2='1104' y2='828' opacity='0.31'></line>
			<line x1='1104' y1='736' x2='1196' y2='828' opacity='0.81'></line>
			<line x1='1288' y1='736' x2='1196' y2='828' opacity='0.12'></line>
			<line x1='1288' y1='736' x2='1380' y2='828' opacity='0.86'></line>
			<line x1='1380' y1='736' x2='1472' y2='828' opacity='0.24'></line>
		</g>
	</svg>
);
interface ParallaxTextItem {
	text: string;
	velocity: number;
}

const ParallaxMessage = () => {
	const t = useTranslations("services");
	const items: ParallaxTextItem[] = [
		{
			text: t("parallax_text_1"),
			velocity: -0.5,
		},
		{
			text: t("parallax_text_2"),
			velocity: 0.5,
		},
	];
	return (
		<section className='relative'>
			<SVGBackground />
			{items.map((item, index) => (
				<ParallaxText baseVelocity={item.velocity} key={index}>
					{item.text}
				</ParallaxText>
			))}
		</section>
	);
};

export default ParallaxMessage;
