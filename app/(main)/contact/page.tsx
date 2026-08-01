"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import TextAreaField from "@/components/dashboard/Fields/TextAreaField/TextAreaField";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { useForm } from "react-hook-form";

const contactMethods = [
  {
    title: "Email Us",
    description: "support@gearup.com",
    detail: "Replies within 24 hours",
    icon: Mail,
    href: "mailto:support@gearup.com",
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Call Us",
    description: "+1 (800) 123-4567",
    detail: "Toll-free, 9 AM – 9 PM, 7 days a week",
    icon: Phone,
    href: "tel:+18001234567",
    accent: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Visit Us",
    description: "123 Gear Street, Outdoor City",
    detail: "Walk-ins welcome by appointment",
    icon: MapPin,
    href: "#",
    accent: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Live Chat",
    description: "Chat with our team",
    detail: "Available during business hours",
    icon: Headphones,
    href: "#",
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <MessageSquare className="h-3.5 w-3.5" />
            Contact Us
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            We would love to{" "}
            <span className="text-emerald-400">hear from you</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Have a question, feedback, or partnership idea? Our team is ready
            to help.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Get in touch
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Fill out the form and we will get back to you as soon as
                possible.
              </p>
            </div>

            <div className="space-y-3">
              {contactMethods.map((method) => (
                <Link
                  key={method.title}
                  href={method.href}
                  className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${method.accent}`}
                  >
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{method.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {method.description}
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {method.detail}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-emerald-500 bg-emerald-500/10 border-emerald-500/20">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Business Hours</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Monday – Friday, 9 AM – 6 PM EST
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight">
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. We will get back to you within
                  24 hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    name="firstName"
                    control={control}
                    placeholder="John"
                    required
                    error={errors.firstName?.message}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    control={control}
                    placeholder="Doe"
                    required
                    error={errors.lastName?.message}
                  />
                </div>

                <InputField
                  label="Email"
                  name="email"
                  control={control}
                  type="email"
                  placeholder="john@example.com"
                  required
                  error={errors.email?.message}
                />

                <InputField
                  label="Subject"
                  name="subject"
                  control={control}
                  placeholder="How can we help?"
                  required
                  error={errors.subject?.message}
                />

                <TextAreaField
                  label="Message"
                  name="message"
                  control={control}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  required
                  error={errors.message?.message}
                />

                <DynamicActionButton
                  label="Send Message"
                  type="submit"
                  disabled={submitting}
                  isLoading={submitting}
                  icon={Send}
                  iconPosition="right"
                  className="w-full h-11"
                />
              </form>
            )}
          </div>
        </div>

        <div className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              FAQ
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
              Quick answers
            </h2>
            <p className="mt-3 text-muted-foreground">
              Common questions we get asked.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {[
              {
                q: "How quickly do you respond?",
                a: "We aim to reply to all inquiries within 24 hours during business days.",
              },
              {
                q: "Can I rent gear for an event?",
                a: "Yes! We offer event rentals with custom packages. Contact us with your requirements.",
              },
              {
                q: "Do you offer corporate rentals?",
                a: "Absolutely. We have dedicated corporate plans for teams and organizations.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm list-none">
                  {faq.q}
                  <span className="ml-2 text-muted-foreground transition-transform group-open:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}