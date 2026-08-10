import { useState } from "react"
import { motion } from "motion/react"
import { CheckCircle, AlertCircle, FolderGit, Mail, Phone, Send, User } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: "ahmadalsmadi2004@gmail.com",
    href: "mailto:ahmadalsmadi2004@gmail.com",
  },
  {
    icon: FolderGit,
    label: "GitHub",
    value: "github.com/ahmadony",
    href: "https://github.com/ahmadony",
  },
  {
    icon: User,
    label: "LinkedIn",
    value: "linkedin.com/in/ahmadalsmadi-dev",
    href: "https://www.linkedin.com/in/ahmadalsmadi-dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0777144399",
    href: "tel:+962777144399",
  },
]

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio contact from ${form.name}`,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus("success")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
        setErrorMsg(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Network error. Please check your connection and try again.")
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/50"

  return (
    <section id="contact" className="bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Get in touch
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Have a project in mind, or just want to say hi? My inbox is always
            open — I'll get back to you as soon as I can.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={
                contact.href.startsWith("http") ? "_blank" : undefined
              }
              rel={
                contact.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-xl border border-white/10 bg-zinc-900 p-6 transition-colors duration-200 hover:border-white/25 hover:bg-zinc-800"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400 transition-colors duration-200 group-hover:bg-amber-400 group-hover:text-zinc-950">
                <contact.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-white">
                {contact.label}
              </p>
              <p className="mt-1 break-all text-sm text-zinc-400">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Contact form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Status feedback */}
            {status === "success" && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                <CheckCircle className="h-4 w-4 shrink-0" />
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors duration-200 hover:bg-zinc-200 active:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
