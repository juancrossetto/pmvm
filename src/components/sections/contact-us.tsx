import React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ContactUs = () => {
	const t = useTranslations("contact");
	return (
		<section
			id='contact'
			className='w-full py-12 md:py-24  bg-white dark:bg-darkColor'
		>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col lg:flex-row items-center'>
					<div className='w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8'>
						<Image
							alt='Entrenamiento físico'
							className='rounded-xl object-cover w-full h-full'
							height='800'
							src='/placeholder.svg'
							width='800'
							style={{
								aspectRatio: "1/1",
								objectFit: "cover",
							}}
						/>
					</div>
					<div className='w-full lg:w-1/2 space-y-8'>
						<div className='space-y-4'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primaryColor'>
								{t("title")}
							</h2>
							<p className='text-gray-500 dark:text-gray-400'>
								{t("description")}
							</p>
						</div>
						<form className='space-y-4'>
							<Input placeholder={t("name_placeholder")} required />
							<Input type='tel' placeholder={t("phone_placeholder")} required />
							<Input
								type='email'
								placeholder={t("email_placeholder")}
								required
							/>
							<Textarea placeholder={t("message_placeholder")} required />
							<Button
								type='submit'
								className='relative h-[50px] w-full overflow-hidden border border-primaryColor bg-primaryColor text-darkColor shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-primaryColor hover:before:w-2/4 hover:before:bg-darkColor hover:after:w-2/4 hover:after:bg-darkColor
				rounded-lg inline-flex text-[13px] items-center justify-center font-medium'
							>
								<span className='relative z-10 flex'>{t("send_message")}</span>
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
