// import React, { useState, useEffect, useRef } from "react";

// interface Props {
//   text: string;
//   delay: number;
//   as?: React.ElementType;
//   className?: string;
// }

// const Typewriter = ({ text, delay, as: Tag = "span", className }: Props) => {
//   const [currentText, setCurrentText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const elementRef = useRef<HTMLSpanElement | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         } else {
//           setIsVisible(false);
//         }
//       },
//       {
//         threshold: 0.1, // El umbral define el porcentaje de visibilidad del componente para activar el efecto
//       }
//     );

//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible && currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setCurrentText((prevText) => prevText + text[currentIndex]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }, delay);

//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, delay, text, isVisible]);

//   return (
//     <Tag className={className} ref={elementRef}>
//       {currentText}
//     </Tag>
//   );
// };

// export default Typewriter;

import React, { useState, useEffect, ElementType } from "react";

interface Props {
  text: string;
  delay: number;
  as?: ElementType; // Prop para especificar el tipo de etiqueta
  className?: string; // Prop para añadir clases CSS
}

const Typewriter = ({ text, delay, as: Tag = "span", className }: Props) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  // Renderiza el componente usando el tipo de etiqueta especificado en el prop "as" y añade la clase CSS
  return <Tag className={className}>{currentText}</Tag>;
};

export default Typewriter;