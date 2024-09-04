import React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
	const t = useTranslations("contact");
	return (
		<section id="contact" className='w-full py-12 sm:py-24 lg:py-32 relative bg-white dark:bg-darkColor'>
			<div className='container px-4 md:px-6 space-y-12'>
				<div className='flex flex-col items-center justify-center text-center'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-primaryColor'>
							{t('title')}
						</h2>
						<p className='max-w-[900px] text-g dark:text-lightColor md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
							{t('description')}
						</p>
					</div>
				</div>
				<div className='mx-auto w-full max-w-md space-y-2'>
					<form className='flex flex-col gap-4 text-darkColor dark:text-white'>
						<Input type='text' placeholder={t('name_placeholder')} className='max-w-lg flex-1' />
						<Input
							type='email'
							placeholder={t('email_placeholder')}
							className='max-w-lg flex-1 text-darkColor dark:text-white'
						/>
						<Textarea
							placeholder={t('message_placeholder')}
							className='max-w-lg flex-1'
						/>
						<Button type='submit' className="bg-primaryColor">{t('submit_button')}</Button>
					</form>
					{/* <a
						href='https://calendar.google.com/calendar/u/0/r/eventedit?text=Consulta+Gratis&dates=20240824T100000Z/20240824T110000Z&details=Habla+con+nuestro+entrenador+sobre+tus+objetivos+de+fitness&location=Tu+Ubicación&sf=true'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex mt-4 h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
					>
						{t('calendar_link')}
					</a> */}
				</div>
				{/* <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 z-[-1]" /> */}
			</div>
		</section>
	);
};

export default ContactUs;
