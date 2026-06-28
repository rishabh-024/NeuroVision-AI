import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  FileText,
  Server,
  ScanSearch,
} from "lucide-react";

const stats = [
  {
    title: "Model Accuracy",
    value: "81.68%",
    icon: Brain,
  },
  {
    title: "Total Analyses",
    value: "1,248",
    icon: ScanSearch,
  },
  {
    title: "Grad-CAM",
    value: "Enabled",
    icon: Activity,
  },
  {
    title: "Reports",
    value: "Ready",
    icon: FileText,
  },
  {
    title: "API Status",
    value: "Online",
    icon: Server,
  },
];

export default function SystemStatusCards() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)]"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-cyan-500" />

                <span
                  className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-50"
                >
                  Live
                </span>
              </div>

              <h3
                className="mt-6 text-sm text-slate-500 dark:text-slate-400"
              >
                {item.title}
              </h3>

              <p
                className="mt-2 text-2xl font-bold text-slate-900 dark:text-white"
              >
                {item.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}