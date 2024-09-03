import { useTranslations } from "next-intl";
import ParallaxText from "../common/parallax-text";

interface ParallaxTextItem {
	text: string;
	velocity: number;
}
//   interface Props {
//     items: ParallaxTextItem[];
//   }
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
		<section>
			{items.map((item, index) => (
				<ParallaxText baseVelocity={item.velocity} key={index}>
					{item.text}
				</ParallaxText>
			))}
		</section>
	);
};

export default ParallaxMessage;
