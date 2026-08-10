import { FolderGit, Mail, User } from "lucide-react"

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/ahmadony",
    icon: FolderGit,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmadalsmadi-dev",
    icon: User,
  },
  {
    label: "Email",
    href: "mailto:ahmadalsmadi2004@gmail.com",
    icon: Mail,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-zinc-500">
          © {year} Ahmad Al-Smadi. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-500 transition-colors duration-200 hover:bg-white/5 hover:text-white active:bg-white/10"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
