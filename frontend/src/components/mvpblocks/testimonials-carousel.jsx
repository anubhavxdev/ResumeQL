"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const defaultTestimonials = [
  {
    text: "ResumeQL completely changed my job search. My interview rate went up 4x in just two weeks.",
    imageSrc: "https://i.pravatar.cc",
    name: "Arjun Mehta",
    username: "@arjdev",
    role: "Full Stack Developer",
  },
  {
    text: "The ATS scoring is so accurate. I finally understand why my previous resumes were being rejected.",
    imageSrc: "https://i.pravatar.cc",
    name: "Sara Lin",
    username: "@sara.pm",
    role: "Product Manager",
  },
  {
    text: "The LaTeX templates are clean and professional. Recruiter feedback has been amazing.",
    imageSrc: "https://i.pravatar.cc",
    name: "Devon Carter",
    username: "@dev_designer",
    role: "UI/UX Designer",
  },
  {
    text: "Generating tailored resumes for every role used to take hours. Now it takes 30 seconds.",
    imageSrc: "https://i.pravatar.cc",
    name: "Priya Shah",
    username: "@priyatech",
    role: "Data Scientist",
  },
  {
    text: "Vastly superior to other resume builders. The AI suggestions are actually smart.",
    imageSrc: "https://i.pravatar.cc",
    name: "Leo Martin",
    username: "@leobuilds",
    role: "DevOps Engineer",
  },
  {
    text: "I landed my dream job at Google thanks to the optimization tips from ResumeQL.",
    imageSrc: "https://i.pravatar.cc",
    name: "Chloe Winters",
    username: "@chloewinters",
    role: "Software Engineer",
  },
];

export default function TestimonialsCarousel({
  testimonials = defaultTestimonials,
  title = "Trusted by Professionals",
  subtitle = "Join thousands of job seekers who landed their dream roles at top companies using ResumeQL.",
  autoplaySpeed = 3000,
  className,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplaySpeed);
    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, autoplaySpeed]);

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className={cn("relative overflow-hidden py-16 md:py-24 bg-neutral-950", className)}>
      <div className="absolute top-0 z-[0] h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px] top-0 left-0">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:120px_120px] [background-repeat:repeat]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center md:mb-16">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <motion.p
            className="text-gray-400 mx-auto max-w-2xl text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}>
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex justify-center px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-white/10 bg-black/20 backdrop-blur-sm relative h-full w-fit rounded-2xl border p-6 shadow-md">
                  {/* Enhanced decorative gradients */}
                  <div className="from-primary/10 to-transparent absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b blur-md opacity-50" />
                  <div className="from-primary/5 absolute -right-10 -bottom-10 -z-10 h-32 w-32 rounded-full bg-gradient-to-t to-transparent opacity-50 blur-xl" />

                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-primary mb-4">
                    <div className="relative">
                      <Quote className="h-10 w-10 -rotate-180" />
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-gray-300 relative mb-6 text-base leading-relaxed">
                    <span className="relative">{testimonial.text}</span>
                  </motion.p>

                  {/* User info */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-white/10 mt-auto flex items-center gap-3 border-t pt-2">
                    <Avatar className="border-white/10 ring-primary/10 ring-offset-transparent h-10 w-10 border ring-2 ring-offset-1">
                      <AvatarImage
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-neutral-800 text-white">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="text-white font-medium whitespace-nowrap">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <p className="text-primary/90 text-sm whitespace-nowrap">
                          {testimonial.username}
                        </p>
                        {testimonial.role && (
                          <>
                            <span className="text-gray-600 flex-shrink-0">
                              •
                            </span>
                            <p className="text-gray-500 text-sm whitespace-nowrap">
                              {testimonial.role}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}