import { motion } from "motion/react"
import { ExternalLink, FolderGit } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

const PROJECTS = [
  {
    name: "LapAdvisor",
    year: "2025 – 2026",
    tagline: "Graduation project",
    description:
      "Full-stack graduation project built with ASP.NET Core MVC, Entity Framework Core, and SQL Server.",
    tags: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "C#"],
    github: "https://github.com/ahmadony/LapAdvisor",
    live: null,
  },
  {
    name: "Real Estate",
    year: "2026",
    tagline: "Responsive real estate website",
    description:
      "Responsive real estate website built with React and Tailwind CSS, with a contact form powered by the Web3Forms API.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Web3Forms"],
    github: "https://github.com/ahmadony/Real-Estate",
    live: "https://real-estate-ahmadony.vercel.app",
  },
  {
    name: "To-Do App",
    year: "2026",
    tagline: "Task manager",
    description:
      "Responsive task manager with add, edit, and delete functionality, built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/ahmadony/To-Do-App",
    live: "https://to-do-app-ahmadony.netlify.app/",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-zinc-900 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">
            Projects
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Featured work
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-xl border border-white/10 bg-zinc-950 p-6"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">
                  {project.name}
                </h3>
                <span className="shrink-0 text-xs font-medium text-zinc-500">
                  {project.year}
                </span>
              </div>

              <p className="text-sm font-medium text-amber-400">
                {project.tagline}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                >
                  <FolderGit className="h-4 w-4" />
                  Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
