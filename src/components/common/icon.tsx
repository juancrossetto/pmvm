import React from "react";
import {
	FaBrain,
	FaDumbbell,
	FaVideo,
	FaAppleAlt,
	FaShoppingCart,
	FaMobileAlt,
	FaHeadset,
	FaUsers,
	FaBlog,
	FaCalendarCheck,
	FaUserTie,
	FaHeartbeat,
	FaUtensils,
	FaClipboardCheck,
} from "react-icons/fa";

const DynamicIcon = ({
	icon,
    className = '',
	size = 24,
}: {
	icon: string;
    className?: string;
	size?: number;
}) => {
	const iconMap = {
		FaBrain: FaBrain,
		FaDumbbell: FaDumbbell,
		FaVideo: FaVideo,
		FaAppleAlt: FaAppleAlt,
		FaShoppingCart: FaShoppingCart,
		FaMobileAlt: FaMobileAlt,
		FaHeadset: FaHeadset,
		FaUsers: FaUsers,
		FaBlog: FaBlog,
		FaCalendarCheck: FaCalendarCheck,
		FaUserTie: FaUserTie,
		FaHeartbeat: FaHeartbeat,
		FaUtensils: FaUtensils,
		FaClipboardCheck: FaClipboardCheck,
	} as any;
	const Icon = iconMap[icon];

	return Icon ? <Icon size={size} className={className} /> : null;
};

export default DynamicIcon


// import * as bsIcons from "react-icons/bs";
// import * as aiIcons from "react-icons/ai";
// import * as biIcons from "react-icons/bi";
// import * as giIcons from "react-icons/gi";
// import * as faIcons from "react-icons/fa";
// import * as tbIcons from "react-icons/tb";
// import { IconType } from "react-icons";

// interface IconProps {
//   icon: string;
//   className?: string;
// }

// const DynamicIcon = ({ icon, className }: IconProps) => {
//   const getIcon = (iconName: string): IconType | undefined => {
//     const iconsMap = new Map<string, any>([
//       ["Bs", bsIcons],
//       ["Ai", aiIcons],
//       ["Bi", biIcons],
//       ["Gi", giIcons],
//       ["Fa", faIcons],
//       ["Tb", tbIcons],
//     ]);

//     const prefix = iconName.substring(0, 2); // Obtiene el prefijo como "Fa", "Bs", etc.
//     const iconPack = iconsMap.get(prefix); // Obtiene el paquete de íconos correspondiente
//     return iconPack ? iconPack[iconName] : undefined; // Retorna el ícono si existe
//   };

//   const TheIcon = getIcon(icon);

//   if (!TheIcon) {
//     return null; // Si no se encuentra el ícono, retorna null o podrías mostrar un ícono por defecto
//   }

//   return <TheIcon className={className} />;
// };

// export default DynamicIcon;
