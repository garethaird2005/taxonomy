"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  contactBudgets,
  contactSchema,
  contactServices,
  type ContactFormData,
} from "@/lib/validations/contact"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const fieldClassName =
  "h-12 rounded-xl border-foreground/15 bg-background/70 px-4 text-[15px] transition-colors duration-500 ease-smooth hover:border-foreground/30"

const selectClassName = cn(
  "flex w-full border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  fieldClassName
)

const labelClassName =
  "font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground"

const errorMessages: Record<number, string> = {
  422: "Some details look off. Please check the form and try again.",
  429: "Too many messages from your connection. Please try again later.",
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  )
}

export function ContactForm() {
  const [sent, setSent] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "Not sure yet", budget: contactBudgets[1] },
  })

  async function onSubmit(data: ContactFormData) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return toast({
        title: "Your message was not sent.",
        description:
          errorMessages[response.status] ??
          "Something went wrong on our side. Please email us instead.",
        variant: "destructive",
      })
    }

    reset()
    setSent(true)
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 py-16 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight/10 text-highlight">
          <Icons.check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-2 font-heading text-2xl font-light tracking-[-0.02em]">
          Thanks, message received.
        </h3>
        <p className="text-sm text-muted-foreground">
          You will get a reply within one working day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name" className={labelClassName}>
            Name
          </Label>
          <Input
            id="name"
            className={fieldClassName}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className={labelClassName}>
            Email
          </Label>
          <Input
            id="email"
            className={fieldClassName}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company" className={labelClassName}>
          Company <span className="opacity-60">(optional)</span>
        </Label>
        <Input
          id="company"
          className={fieldClassName}
          autoComplete="organization"
          {...register("company")}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="service" className={labelClassName}>
            What do you need?
          </Label>
          <select
            id="service"
            className={selectClassName}
            {...register("service")}
          >
            {contactServices.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="budget" className={labelClassName}>
            Budget
          </Label>
          <select
            id="budget"
            className={selectClassName}
            {...register("budget")}
          >
            {contactBudgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message" className={labelClassName}>
          Tell us about the project
        </Label>
        <Textarea
          id="message"
          rows={5}
          className={cn(fieldClassName, "h-auto py-3")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>
      {/* Honeypot: invisible to people and screen readers, tempting to bots. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex h-12 w-full items-center justify-between gap-3 rounded-full bg-primary pl-6 pr-2 text-sm font-medium text-primary-foreground transition-colors duration-500 ease-smooth hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
      >
        Send enquiry
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary">
          {isSubmitting ? (
            <Icons.spinner className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Icons.arrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5" />
          )}
        </span>
      </button>
    </form>
  )
}
