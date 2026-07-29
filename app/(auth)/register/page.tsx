/* eslint-disable react-hooks/incompatible-library */
"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Dumbbell,
  UserCheck,
  Store,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
}

export default function RegisterPage() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: { name: "", email: "", password: "", role: "CUSTOMER" },
  });

  const selectedRole = watch("role");

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Hero Visual Banner */}
      <div className="hidden lg:flex relative bg-zinc-900 text-white p-12 flex-col justify-between overflow-hidden order-last lg:order-first">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1200')] bg-cover bg-center opacity-35" />
        <div className="relative z-10 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-semibold tracking-wider text-emerald-300 uppercase">
            Join The Community
          </span>
        </div>
        <div className="relative z-10 max-w-md space-y-4">
          <blockquote className="text-2xl font-semibold leading-snug">
            &ldquo;List your gear to start earning passive revenue, or rent
            equipment in seconds.&rdquo;
          </blockquote>
          <p className="text-sm text-zinc-300">
            Over 5,000+ rental items ready for adventure.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-between p-8 lg:p-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-emerald-600"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span>GearUp</span>
          </Link>
          <span className="text-xs text-muted-foreground">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose your platform role to get started.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Role Selection Selector */}
            <div className="space-y-2">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 cursor-pointer text-center transition-colors ${
                    selectedRole === "CUSTOMER"
                      ? "border-emerald-600 bg-emerald-50/30"
                      : "border-zinc-200 hover:border-emerald-600"
                  }`}
                >
                  <input
                    type="radio"
                    value="CUSTOMER"
                    {...register("role")}
                    className="sr-only"
                  />
                  <UserCheck className="h-6 w-6 text-emerald-600 mb-1" />
                  <span className="text-xs font-semibold text-zinc-900">
                    Rent Gear
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Customer Role
                  </span>
                </label>

                <label
                  className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 cursor-pointer text-center transition-colors ${
                    selectedRole === "PROVIDER"
                      ? "border-emerald-600 bg-emerald-50/30"
                      : "border-zinc-200 hover:border-emerald-600"
                  }`}
                >
                  <input
                    type="radio"
                    value="PROVIDER"
                    {...register("role")}
                    className="sr-only"
                  />
                  <Store className="h-6 w-6 text-zinc-600 mb-1" />
                  <span className="text-xs font-semibold text-zinc-900">
                    List My Gear
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Provider Role
                  </span>
                </label>
              </div>
            </div>

            <InputField
              label="Full Name"
              name="name"
              control={control}
              placeholder="Alex Morgan"
              required
              error={errors.name?.message}
            />

            <InputField
              label="Email address"
              name="email"
              control={control}
              type="email"
              placeholder="alex@example.com"
              required
              error={errors.email?.message}
            />

            <InputField
              label="Password"
              name="password"
              control={control}
              type="password"
              placeholder="••••••••"
              required
              error={errors.password?.message}
            />

            <DynamicActionButton
              type="submit"
              label="Create Account"
              className="h-11! w-full"
              icon={ArrowRight}
              // isLoading={isLoading}
              // disabled={isLoading}
            />
          </form>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Protected by GearUp verification protocols.
        </p>
      </div>
    </div>
  );
}
