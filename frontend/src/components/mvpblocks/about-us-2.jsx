"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NumberTicker } from "@/components/ui/counter";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Sparkles,
  Building,
  CheckCircle,
  Zap,
  LineChart,
} from "lucide-react";

const StatItem = ({
  value,
  label,
  icon,
  delay = 0,
  decimalPlaces = 0,
  color = "from-primary to-primary/70",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={cn(
        "group border-white/10 bg-black/20 backdrop-blur-sm relative overflow-hidden rounded-xl border p-6 shadow-xl shadow-black/5"
      )}>
      <div
        className={cn(
          "absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-3xl",
          color,
        )}
      />

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white",
            color,
          )}>
          {icon}
        </div>

        <div className="flex flex-col">
          <h3 className="flex items-baseline text-3xl font-bold tracking-tight text-white">
            <NumberTicker
              value={value}
              decimalPlaces={decimalPlaces}
              className="tabular-nums text-white"
            />
            <span className="ml-1 text-sm font-medium opacity-70 text-gray-400">+</span>
          </h3>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutUs2() {
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  const stats = [
    {
      value: 5000,
      label: "Resumes Optimized",
      icon: <FileText className="h-5 w-5" />,
      delay: 0,
      color: "from-rose-500 to-orange-500",
      decimalPlaces: 0,
    },
    {
      value: 98,
      label: "User Satisfaction",
      icon: <Sparkles className="h-5 w-5" />,
      delay: 0.1,
      color: "from-blue-500 to-cyan-500",
      decimalPlaces: 0,
    },
    {
      value: 1200,
      label: "Interviews Landed",
      icon: <CheckCircle className="h-5 w-5" />,
      delay: 0.2,
      color: "from-green-500 to-emerald-500",
      decimalPlaces: 0,
    },
    {
      value: 120,
      label: "Countries Reached",
      icon: <Building className="h-5 w-5" />,
      delay: 0.3,
      color: "from-purple-500 to-violet-500",
      decimalPlaces: 0,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 bg-neutral-950">
      <div className="absolute top-0 z-[0] h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px] top-0 left-0">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:120px_120px] [background-repeat:repeat]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4 flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
              <Sparkles className="text-primary mr-1 h-3.5 w-3.5" />
              About Us
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Engineering the Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-gray-400 mt-4 text-xl">
            Optimizing your most critical professional asset
          </motion.p>
        </div>

        <div ref={statsRef} className="mb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={stat.delay || index * 0.1}
                decimalPlaces={stat.decimalPlaces}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        <div ref={aboutRef} className="relative mx-auto mb-20">
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="relative space-y-6">
              <div className="from-primary/80 to-primary/60 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg">
                <Zap className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white">Our Mission</h2>

              <p className="text-gray-400 text-base leading-relaxed">
                To build the world's most intelligent resume optimization platform, empowering professionals to land their dream jobs with ease.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="relative space-y-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/80 to-blue-500/60 text-white shadow-lg">
                <LineChart className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white">Our Vision</h2>

              <p className="text-gray-400 text-base leading-relaxed">
                A world where every candidate has an equal chance at their dream role, powered by AI that understands what recruiters truly look for.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-16 flex items-start gap-4">
            <div className="from-primary/20 to-primary/5 text-primary inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br">
              <Building className="h-5 w-5" />
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              We are a team of career experts, data scientists, and engineers dedicated to setting the new standard for resume engineering. Trusted by job seekers at companies like Google, Meta, and Netflix.
            </p>
          </motion.div>
        </div>

        <div ref={timelineRef} className="relative mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl text-white">
            Our Journey
          </motion.h2>

          <div className="border-white/10 relative ml-4 border-l pl-8 md:ml-0 md:border-none md:pl-0">
            {[
              {
                year: "2022",
                title: "Founded",
                description:
                  "ResumeQL was born to solve the mismatch between great talent and automated filters.",
              },
              {
                year: "2023",
                title: "Beta Launch",
                description:
                  "Helped 1,000+ early adopters land interviews at top tech companies.",
              },
              {
                year: "2024",
                title: "AI 2.0",
                description:
                  "Integrated state-of-the-art LLMs for hyper-tailored resume suggestions.",
              },
              {
                year: "2025",
                title: "Global Reach",
                description:
                  "Expanding our platform to support job seekers in over 100 countries.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
                className="relative mb-10 md:grid md:grid-cols-5 md:gap-8">
                <div className="md:col-span-1">
                  <div className="border-white/10 bg-black/20 text-white backdrop-blur-sm absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold md:static md:h-auto md:w-auto md:rounded-none md:border-none md:bg-transparent md:text-xl">
                    {item.year}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-bold md:text-xl text-white">{item.title}</h3>
                  <p className="text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}