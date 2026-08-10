import { motion } from "motion/react"
import { Code, Database, LayoutTemplate, Server, Wrench } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

const CATEGORIES = [
  {
    icon: LayoutTemplate,
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Responsive Design",
      "DOM Manipulation",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    skills: [
      "C#",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "REST APIs",
      "MVC Architecture",
    ],
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["SQL Server", "MySQL"],
  },
  {
    icon: Code,
    title: "Languages",
    skills: ["C#", "JavaScript", "Java", "C++", "Python"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "GitHub", "Visual Studio", "VS Code"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">
            Skills
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Tech stack I work with
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/10 bg-zinc-900 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
