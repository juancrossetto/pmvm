"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DumbbellIcon, Menu, X } from "lucide-react";
import LanguageSelector from "./language-selector";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useParallax } from "react-scroll-parallax";

const Parallax = () => {
	// useEffect(() => {
	//     const script = document.createElement('script');
	//     script.src = '/script.js';
	//     script.async = true;
	//     document.body.appendChild(script);

	//     return () => {
	//       document.body.removeChild(script);
	//     };
	//   }, []);

	const sectionRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLHeadingElement>(null);
	const leafRef = useRef<HTMLImageElement>(null);
	const hill1Ref = useRef<HTMLImageElement>(null);
	const hill4Ref = useRef<HTMLImageElement>(null);
	const hill5Ref = useRef<HTMLImageElement>(null);

    const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		// const handleScroll = () => {
		// 	if (!sectionRef.current) return;

		// 	const sectionTop = sectionRef.current.offsetTop;
		// 	const sectionHeight = sectionRef.current.offsetHeight;
		// 	const scrollY = window.scrollY;

		// 	if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
		// 		const value = scrollY - sectionTop;

		// 		if (textRef.current) {
		// 			textRef.current.style.marginTop = value * 2.5 + "px";
		// 		}
		// 		if (leafRef.current) {
		// 			leafRef.current.style.top = value * -1.5 + "px";
		// 			leafRef.current.style.left = value * 1.5 + "px";
		// 		}
		// 		if (hill1Ref.current) {
		// 			hill1Ref.current.style.top = value * 1 + "px";
		// 		}
		// 		if (hill4Ref.current) {
		// 			hill4Ref.current.style.left = value * -1.5 + "px";
		// 		}
		// 		if (hill5Ref.current) {
		// 			hill5Ref.current.style.left = value * 1.5 + "px";
		// 		}
		// 	}
		// };

		// window.addEventListener("scroll", handleScroll);

		// // Limpieza del evento de scroll al desmontar el componente
		// return () => {
		// 	window.removeEventListener("scroll", handleScroll);
		// };
        const handleScroll = () => {
            setScrollY(window.scrollY);
            };
            window.addEventListener('scroll', handleScroll);
            return () => {
            window.removeEventListener('scroll', handleScroll);
            };
	}, []);

    const scaleCParallax = useParallax<any>({
        scaleX: [0, 3, "easeInQuad"],
      });
      const parallaxRotateY = useParallax<any>({
        rotateY: [0, 360],
      });
      const parallaxRotateY2 = useParallax<any>({
        rotateY: [0, 360],
      });
      const parallaxRotateY3 = useParallax<any>({
        rotateY: [0, 360],
      });
      const parallaxEasing = useParallax<any>({
        easing: "easeOutQuad",
        translateX: [-340, 100],
      });
      const parallaxEasingLeft = useParallax<any>({
        easing: [1, -0.75, 0.5, 1.34],
        translateX: [0, -260],
        translateY: [1100] as any,
      });

	return (
		<>
          <div>
      <header>
        <div className="logo">
          <img src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-m-design_460848-10168.jpg" />
        </div>
        <nav>
          <li>Home</li>
          <li>About</li>
          <li>Team</li>
          <li>Services</li>
          <li>Learn more</li>
        </nav>
      </header>
      <section className="bg-container">
        <img
          ref={parallaxRotateY.ref}
          src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <div className="absolute-text">
          <h1 ref={parallaxEasing.ref}>MEMBERSHIP WEBSITE</h1>
          <h2 ref={parallaxEasingLeft.ref}>For members only non profitable</h2>
        </div>
      </section>
      <br />
      <section className="card-container" ref={scaleCParallax.ref}>
        <div className="card">
          <img src="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </div>
        <div className="card">
          <img src="https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </div>
      </section>

      <br />
      <br />
      <section className="card-container">
        <div className="card" ref={parallaxRotateY2.ref}>
          <img src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800" />
        </div>
        <div ref={parallaxRotateY3.ref} className="card">
          <img src="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </div>
      </section>
      <br />

      <section className="subscribe">
        <h1>Subscribe to our news letter</h1>
        <br />
        <input type="email" placeholder="youremail@gmail.com" />
        <button>Subscribe</button>
      </section>
    </div>
			{/* <header>
                <h2 className="logo">
                    Logo
                </h2>
                <nav className="navigation">

                </nav>
            </header> */}
			{/* <section className='parallax'>
				<img src='/images/parallax/hill1.png' id='hill1' ref={hill1Ref} />
				<img src='/images/parallax/hill2.png' id='hill2' />
				<img src='/images/parallax/hill3.png' id='hill3' />
				<img src='/images/parallax/hill4.png' id='hill4' ref={hill4Ref} />
				<img src='/images/parallax/hill5.png' id='hill5' ref={hill5Ref} />
				<img src='/images/parallax/tree.png' id='tree' />
				<h2 id='text' ref={textRef}>
					Parallax Website
				</h2>
				<img src='/images/parallax/leaf.png' id='leaf' ref={leafRef} />
				<img src='/images/parallax/plant.png' id='plant' />
			</section>
			<section className='sec'>
				<h2>Parallax Scrolling Website</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
					deserunt cumque nulla corporis, explicabo obcaecati iusto architecto
					placeat quaerat, quam magnam cum aut laudantium iste voluptatibus
					facere! Sunt quas vel deserunt ipsum eum explicabo dolor mollitia,
					velit soluta, voluptatibus similique laborum possimus enim, molestiae
					sapiente assumenda reprehenderit veniam? Quisquam nam ipsam quos
					exercitationem, quas quia reiciendis maiores aut hic esse expedita
					temporibus molestiae voluptate consequatur accusamus consequuntur
					sequi architecto veniam in dolor iusto? Id enim asperiores suscipit
					omnis, modi ipsam obcaecati doloremque laboriosam ea quaerat. Nemo
					eligendi repellendus, delectus inventore, quia aspernatur sapiente
					odio atque eius ullam corporis soluta illo fugiat ipsam unde commodi,
					beatae impedit? Officia obcaecati perspiciatis nihil ipsa fuga?
					Obcaecati autem perferendis quaerat! Explicabo aut minus rem sunt vel
					nostrum perferendis fuga aliquid aliquam molestias, voluptatum
					ducimus!
				</p>
				<br></br>
				<br></br>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
					deserunt cumque nulla corporis, explicabo obcaecati iusto architecto
					placeat quaerat, quam magnam cum aut laudantium iste voluptatibus
					facere! Sunt quas vel deserunt ipsum eum explicabo dolor mollitia,
					velit soluta, voluptatibus similique laborum possimus enim, molestiae
					sapiente assumenda reprehenderit veniam? Quisquam nam ipsam quos
					exercitationem, quas quia reiciendis maiores aut hic esse expedita
					temporibus molestiae voluptate consequatur accusamus consequuntur
					sequi architecto veniam in dolor iusto? Id enim asperiores suscipit
					omnis, modi ipsam obcaecati doloremque laboriosam ea quaerat. Nemo
					eligendi repellendus, delectus inventore, quia aspernatur sapiente
					odio atque eius ullam corporis soluta illo fugiat ipsam unde commodi,
					beatae impedit? Officia obcaecati perspiciatis nihil ipsa fuga?
					Obcaecati autem perferendis quaerat! Explicabo aut minus rem sunt vel
					nostrum perferendis fuga aliquid aliquam molestias, voluptatum
					ducimus!
				</p>
				<br></br>
				<br></br>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
					deserunt cumque nulla corporis, explicabo obcaecati iusto architecto
					placeat quaerat, quam magnam cum aut laudantium iste voluptatibus
					facere! Sunt quas vel deserunt ipsum eum explicabo dolor mollitia,
					velit soluta, voluptatibus similique laborum possimus enim, molestiae
					sapiente assumenda reprehenderit veniam? Quisquam nam ipsam quos
					exercitationem, quas quia reiciendis maiores aut hic esse expedita
					temporibus molestiae voluptate consequatur accusamus consequuntur
					sequi architecto veniam in dolor iusto? Id enim asperiores suscipit
					omnis, modi ipsam obcaecati doloremque laboriosam ea quaerat. Nemo
					eligendi repellendus, delectus inventore, quia aspernatur sapiente
					odio atque eius ullam corporis soluta illo fugiat ipsam unde commodi,
					beatae impedit? Officia obcaecati perspiciatis nihil ipsa fuga?
					Obcaecati autem perferendis quaerat! Explicabo aut minus rem sunt vel
					nostrum perferendis fuga aliquid aliquam molestias, voluptatum
					ducimus!
				</p>
				<br></br>
				<br></br>
			</section> */}
		{/* </div> */}
        
        </>
	);
};

export default Parallax;
