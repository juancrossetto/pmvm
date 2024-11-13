"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EMAIL_ADDRESS, PHONE_NUMBER } from "@/lib/data";

const ContactUs = () => {
	const t = useTranslations("contact");
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		message: "",
	});

	const handleSendEmail = () => {
		window.location.href = `mailto:${EMAIL_ADDRESS}?subject=Envío de formulario de contacto PMVM&body=Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
	};

	const handleSendWhatsApp = () => {
		const { name, phone, email, message } = formData;
		const formattedMessage = `Hola, me llamo ${name}. Mi número de teléfono es ${phone} y mi correo electrónico es ${email}. Aquí está mi mensaje: ${message}`;
		const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
			formattedMessage
		)}`;

		window.open(whatsappUrl, "_blank");
	};

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
							className='rounded-xl object-cover w-full h-full max-w-[700px] mx-auto'
							height='600'
							// src='/placeholder.svg'
							src='/images/icon-yellow.png'
							width='600'
							style={{
								// aspectRatio: "1/1",
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
							<Input
								placeholder={t("name_placeholder")}
								required
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
							/>
							<Input
								type='tel'
								placeholder={t("phone_placeholder")}
								required
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
							/>
							<Input
								type='email'
								placeholder={t("email_placeholder")}
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
							/>
							<Textarea
								placeholder={t("message_placeholder")}
								required
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
							/>
							<Button
								// onClick={handleSendEmail}
								onClick={() => {
									handleSendEmail();
									handleSendWhatsApp();
								}}
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
