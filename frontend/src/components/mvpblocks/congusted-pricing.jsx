"use client";
import { buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

const plans = [
  {
    name: "CANDIDATE",
    price: "0",
    yearlyPrice: "0",
    period: "forever",
    features: [
      "100 Free Coins",
      "5 AI Resume Analyses",
      "Standard LaTeX Templates",
      "Community Support",
      "PDF Export",
    ],
    description: "Perfect for students applying to their first jobs.",
    buttonText: "Start Free",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "19",
    yearlyPrice: "15",
    period: "per user/month",
    features: [
      "Unlimited Coins",
      "Unlimited AI Generations",
      "Advanced ATS Insights",
      "Premium LaTeX Templates",
      "Priority AI Processing",
      "Full API Access",
      "Direct Download",
    ],
    description: "For serious job seekers looking for an edge.",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "RECRUITER",
    price: "99",
    yearlyPrice: "79",
    period: "contact us",
    features: [
      "Everything in Professional",
      "Batch Resume Analysis",
      "Custom Brand Style",
      "Corporate Accounts",
      "Advanced Dashboard",
      "Priority 24/7 Support",
      "Detailed Analytics",
      "Dedicated Representative",
    ],
    description: "For agencies and high-volume recruiting teams.",
    buttonText: "Contact Us",
    href: "/contact",
    isPopular: false,
  },
];

export default function CongestedPricing() {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef(null);

  const handleToggle = (checked) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="relative w-full bg-neutral-950">
      <div className="absolute top-0 z-[0] h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px] top-0 left-0">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:120px_120px] [background-repeat:repeat]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div>
      </div>

      <div className="container relative z-10 py-20 mx-auto">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="text-gray-400 text-lg whitespace-pre-line">
            Accelerate your career with a plan that fits your ambition.
          </p>
        </div>

        <div className="mb-10 flex justify-center text-white">
          <label className="relative inline-flex cursor-pointer items-center">
            <Label>
              <Switch
                ref={switchRef}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="relative"
              />
            </Label>
          </label>
          <span className="ml-2 font-semibold">
            Annual billing <span className="text-primary">(Save 20%)</span>
          </span>
        </div>

        <div className="sm:2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 1 }}
              whileInView={
                isDesktop
                  ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                  : {}
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                `relative rounded-2xl border p-6 text-center lg:flex lg:flex-col lg:justify-center backdrop-blur-sm`,
                plan.isPopular ? "border-primary border-2 bg-black/40" : "border-white/10 bg-black/20",
                "flex flex-col",
                !plan.isPopular && "mt-5",
                index === 0 || index === 2
                  ? "z-0 translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg] transform"
                  : "z-10",
                index === 0 && "origin-right",
                index === 2 && "origin-left",
              )}>
              {plan.isPopular && (
                <div className="bg-primary absolute top-0 right-0 flex items-center rounded-tr-xl rounded-bl-xl px-2 py-0.5">
                  <Star className="text-primary-foreground h-4 w-4 fill-current" />
                  <span className="text-primary-foreground ml-1 font-sans font-semibold">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <p className="text-gray-300 text-base font-semibold">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2 text-white">
                  <span className="text-5xl font-bold tracking-tight">
                    <NumberFlow
                      value={
                        isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                      }
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="font-variant-numeric: tabular-nums"
                    />
                  </span>
                  {plan.period !== "Next 3 months" && (
                    <span className="text-gray-400 text-sm leading-6 font-semibold tracking-wide">
                      / {plan.period}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-xs leading-5">
                  {isMonthly ? "billed monthly" : "billed annually"}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <Check className="text-primary mt-1 h-4 w-4 flex-shrink-0" />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-4 w-full border-white/10" />

                <a
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "hover:bg-primary hover:text-primary-foreground hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-1",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-white border-white/20 hover:bg-white/10",
                  )}>
                  {plan.buttonText}
                </a>
                <p className="text-gray-400 mt-6 text-xs leading-5">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}