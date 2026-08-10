import { motion } from "motion/react"
import { Briefcase, Code, GraduationCap } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

const CARDS = [
  {
    icon: GraduationCap,
    title: "Education",
    text: "BSc Computer Science at WISE University, Amman (2022–2026).",
  },
  {
    icon: Briefcase,
    title: "Field Training",
    text: "Front-end web development field training at Clever Mind POB, Amman (2026).",
  },
  {
    icon: Code,
    title: "Current Focus",
    text: "React, Tailwind CSS, and ASP.NET Core — building full-stack projects from front end to back end.",
  },
]

export default function Aboutme() {
  return (
    <section id="about" className="bg-zinc-900 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">
            About Me
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Full-Stack Web Developer building clean, responsive web applications.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-base leading-relaxed text-zinc-400">
            I'm a Full-Stack Web Developer based in Amman, Jordan, with a BSc in Computer Science 
            from WISE University. I focus on building clean, responsive, 
            and maintainable web applications — 
            from the user interface with React and Tailwind CSS to the backend 
            with ASP.NET Core and SQL Server.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
            My projects include LapAdvisor, 
            a laptop recommendation system developed as my graduation project, 
            along with web applications built with React and modern frontend technologies.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Beyond coding, I bring strong problem-solving, 
            time management, and teamwork skills to every project I work on. 
            I'm always looking to improve my skills, 
            explore new technologies, and build better software.
            </p>
          </motion.div>

          {/* Info cards */}
          <div className="space-y-4">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-white/10 bg-zinc-950 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
