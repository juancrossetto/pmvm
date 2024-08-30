
'use client'
import Picture1 from '../../public/images/bg.jpg';
import Picture2 from '../../public/images/bg.jpg';
import Picture3 from '../../public/images/bg.jpg';
import Picture4 from '../../public/images/bg.jpg'
import Picture5 from '../../public/images/bg.jpg'
import Picture6 from '../../public/images/bg.jpg'
import Picture7 from '../../public/images/bg.jpg'
import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';

export default function ZoomParallax() {
    
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {
            src: Picture1,
            scale: scale4
        },
        {
            src: Picture2,
            scale: scale5
        },
        {
            src: Picture3,
            scale: scale6
        },
        {
            src: Picture4,
            scale: scale5
        },
        {
            src: Picture5,
            scale: scale6
        },
        {
            src: Picture6,
            scale: scale8
        },
        {
            src: Picture7,
            scale: scale9
        }
    ]

    return (
        <div ref={container} className="relative h-[150vh]">
        <div className="sticky overflow-hidden top-0 h-[100vh]">
            {/* {pictures.map(({ src, scale }, index) => ( */}
                <motion.div 
                    // key={index} 
                    style={{ scale: scale4 }} 
                    className="absolute top-0 w-full h-full flex items-center justify-center"
                >
                    <video
					className='absolute top-0 left-0 w-full h-full object-cover'
					src='/videos/bg-hero.mp4'
					autoPlay
					loop
					muted
					playsInline
				/>
             {/* <Image
                            src={'/placeholder.svg'}
                            fill
                            alt="image"
                            placeholder="blur"
                            className="object-cover"
                            blurDataURL='asd'
                        /> */}
                    {/* <div className={`relative ${index === 1 ? 'top-[-30vh] left-[5vw] w-[35vw] h-[30vh]' : ''}
                                                  ${index === 2 ? 'top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]' : ''}
                                                  ${index === 3 ? 'left-[27.5vw] w-[25vw] h-[25vh]' : ''}
                                                  ${index === 4 ? 'top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]' : ''}
                                                  ${index === 5 ? 'top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]' : ''}
                                                  ${index === 6 ? 'top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]' : ''}
                                                  w-[25vw] h-[25vh]'`}
                    >
                        <Image
                            src={src}
                            fill
                            alt="image"
                            placeholder="blur"
                            className="object-cover"
                        />
                    </div> */}
                </motion.div>
            {/* ))} */}
        </div>
    </div>
    )
}