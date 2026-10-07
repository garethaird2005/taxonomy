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
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const selectClassName =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const errorMessages: Record<number, string> = {
  422: "Some details look off. Please check the form and try again.",
  429: "Too many messages from your connection. Please try again later.",
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm text-red-600 dark:text-red-400">
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
        className="flex flex-col items-center gap-3 rounded-2xl border bg-background/60 p-10 text-center backdrop-blur-sm"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Icons.check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Thanks, message received.</h3>
        <p className="text-sm text-muted-foreground">
          You will get a reply within one working day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 rounded-2xl border bg-background/60 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
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
        <Label htmlFor="company">
          Company <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="company"
          autoComplete="organization"
          {...register("company")}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="service">What do you need?</Label>
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
          <Label htmlFor="budget">Budget</Label>
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
        <Label htmlFor="message">Tell us about the project</Label>
        <Textarea
          id="message"
          rows={5}
          className="h-auto"
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
        className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
      >
        {isSubmitting ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Send enquiry
      </button>
    </form>
  )
}
