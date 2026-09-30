"use client"

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Public by design: Web3Forms keys only allow sending to the inbox they were created for.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
const ENDPOINT = "https://api.web3forms.com/submit"

export const CONTACT_TOPICS = [
  "Booking a tour",
  "A custom trip",
  "Prints & licensing",
  "Something else",
] as const

type Topic = (typeof CONTACT_TOPICS)[number]
type Status = "idle" | "sending" | "sent" | "error"
type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>

const ContactContext = createContext<((topic?: Topic) => void) | null>(null)

export function useContactDialog() {
  const open = useContext(ContactContext)
  if (!open) throw new Error("useContactDialog must be used inside <ContactProvider>")
  return open
}

/**
 * Opens the contact form. It's a real link to the footer's #contact band, so it still
 * lands somewhere useful before hydration.
 */
export function ContactButton({
  topic,
  className,
  children,
}: {
  topic?: Topic
  className?: string
  children: ReactNode
}) {
  const open = useContactDialog()
  return (
    <a
      href="#contact"
      aria-haspopup="dialog"
      onClick={(e) => {
        e.preventDefault()
        open(topic)
      }}
      className={className}
    >
      {children}
    </a>
  )
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [topic, setTopic] = useState<Topic>(CONTACT_TOPICS[0])
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<FieldErrors>({})

  const open = useCallback((next?: Topic) => {
    if (next) setTopic(next)
    // Start fresh after a successful send; keep a half-written message otherwise.
    setStatus((s) => (s === "sent" ? "idle" : s))
    dialogRef.current?.showModal()
  }, [])

  const close = () => dialogRef.current?.close()

  // Clicks on the ::backdrop land on the <dialog> itself.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close()
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      const next: FieldErrors = {}
      for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input[name], textarea[name]"
      )) {
        if (!el.validity.valid) next[el.name as keyof FieldErrors] = el.validationMessage
      }
      setErrors(next)
      form.querySelector<HTMLElement>(":invalid")?.focus()
      return
    }

    if (!ACCESS_KEY) {
      console.error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set.")
      setStatus("error")
      return
    }

    // Leave out blank optional fields so they don't show as empty rows in the email.
    const data = Object.fromEntries(
      [...new FormData(form)].filter(([, value]) => typeof value !== "string" || value.trim())
    )
    setStatus("sending")
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: ACCESS_KEY,
          subject: `${data.topic} — enquiry from ${data.name}`,
          from_name: "The Nature Club website",
        }),
      })
      const json = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`)
      form.reset()
      setTopic(CONTACT_TOPICS[0])
      setStatus("sent")
    } catch (err) {
      console.error("Contact form submission failed:", err)
      setStatus("error")
    }
  }

  const clearError = (name: keyof FieldErrors) =>
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))

  return (
    <ContactContext.Provider value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        onClick={onDialogClick}
        className={cn(
          "m-auto w-[min(100%-2rem,36rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-sm bg-cream text-ink shadow-2xl",
          // Enter/exit: fade and lift; the backdrop fades with it.
          "opacity-0 transition-[opacity,translate,overlay,display] transition-discrete duration-300 ease-out-strong motion-safe:translate-y-4",
          "open:translate-y-0 open:opacity-100 starting:open:opacity-0 motion-safe:starting:open:translate-y-4",
          "backdrop:bg-ink/0 backdrop:backdrop-blur-none backdrop:transition-[background-color,backdrop-filter,overlay,display] backdrop:transition-discrete backdrop:duration-300",
          "open:backdrop:bg-ink/70 open:backdrop:backdrop-blur-sm starting:open:backdrop:bg-ink/0 starting:open:backdrop:backdrop-blur-none"
        )}
      >
        <div className="relative px-[clamp(1.25rem,5vw,2.75rem)] py-[clamp(1.75rem,5vw,2.75rem)]">
          <button
            type="button"
            onClick={close}
            aria-label="Close contact form"
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full text-stone transition-[color,background-color,scale] duration-150 ease-out hover:bg-ink/5 hover:text-ink active:scale-[0.97]"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <header className="text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-stone uppercase">Contact Me</p>
            <h2
              id="contact-dialog-title"
              className="mt-2 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.1rem)] leading-tight"
            >
              {status === "sent" ? "Thank you" : "Let’s plan your next frame"}
            </h2>
            <div aria-hidden="true" className="mx-auto mt-4 h-px w-12 bg-gold" />
          </header>

          {status === "sent" ? (
            <div className="mt-6 text-center" role="status">
              <p className="font-serif text-ink/80">
                Your message is on its way. We usually reply within a working day.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-8 inline-flex items-center rounded-full border border-ink px-6 py-2 text-sm transition-[color,background-color,scale] duration-150 ease-out hover:bg-ink hover:text-cream active:scale-[0.97]"
              >
                Close
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
              {/* Web3Forms honeypot: bots tick it, people never see it. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    autoFocus
                    onInput={() => clearError("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onInput={() => clearError("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" optional error={errors.phone}>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    pattern="[+0-9 ()\-]{7,}"
                    onInput={() => clearError("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="About" name="topic">
                  <select
                    id="contact-topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as Topic)}
                    className={cn(inputClass, "cursor-pointer")}
                  >
                    {CONTACT_TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Message" name="message" error={errors.message}>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Where would you like to go, and when?"
                  onInput={() => clearError("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={cn(inputClass, "resize-y placeholder:text-stone/70")}
                />
              </Field>

              {status === "error" && (
                <p role="alert" className="text-center text-sm text-red-700">
                  Sorry, that didn’t go through. Please try again, or write to us directly.
                </p>
              )}

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-w-40 items-center justify-center rounded-full bg-ink px-7 py-2.5 text-sm tracking-wide text-cream transition-[background-color,scale,opacity] duration-150 ease-out hover:bg-navy active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </ContactContext.Provider>
  )
}

const inputClass =
  "block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-2 text-base text-ink outline-none transition-colors focus:border-gold aria-invalid:border-red-700"

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: string
  name: string
  optional?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={`contact-${name}`}
        className="text-xs font-bold tracking-[0.18em] text-navy/80 uppercase"
      >
        {label}
        {optional && <span className="ml-1.5 font-normal tracking-normal text-stone normal-case">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
