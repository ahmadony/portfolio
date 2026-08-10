import { motion } from "motion/react"
import { ArrowDown, Download } from "lucide-react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function Header() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-zinc-950 pb-20 pt-28 md:pb-28 md:pt-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-7 lg:gap-16">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-4"
          >
            <motion.p
              variants={item}
              className="mb-5 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-amber-400"
            >
              <span className="h-px w-8 bg-amber-400" aria-hidden="true" />
              Full-Stack Web Developer
            </motion.p>

            <motion.h1
              variants={item}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Ahmad
              <br />
              Al-Smadi
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              Computer Science graduate from WISE University, Amman. 
              I build responsive web applications using React and Tailwind CSS on the front end, 
              with ASP.NET Core on the back end.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors duration-200 hover:bg-zinc-200 active:bg-zinc-300"
              >
                View Projects
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="/cv/Ahmad_CV_Alsmadi.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/5 active:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src="/Images/Profile.JPG"
                  alt="Portrait of Ahmad Al-Smadi"
                  className="aspect-[2/3] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
