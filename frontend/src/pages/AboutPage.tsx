import { motion } from "framer-motion";
import {
  BrainCircuit,
  Cpu,
  FileText,
  Globe,
  Layers,
  Microscope,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const MODEL_STATS = [
  { label: "Model Architecture", value: "EfficientNetV2B0" },
  { label: "Training Accuracy", value: "81.68%" },
  { label: "Dataset", value: "Brain MRI (Kaggle)" },
  { label: "Tumor Classes", value: "4 Types" },
];

const TUMOR_CLASSES = [
  {
    name: "Glioma",
    description:
      "Tumors arising from glial cells in the brain or spine. One of the most common and aggressive types.",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    name: "Meningioma",
    description:
      "Tumors that form on membranes covering the brain and spinal cord. Often benign but can be problematic.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    name: "Pituitary",
    description:
      "Tumors in the pituitary gland that can affect hormone production and vision.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    name: "No Tumor",
    description:
      "Normal MRI scan with no detected tumor. Used to train the model's negative classification.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

const TECH_STACK = [
  { name: "React + TypeScript", icon: Layers, desc: "Frontend framework" },
  { name: "FastAPI", icon: Zap, desc: "Backend API" },
  { name: "TensorFlow / Keras", icon: Cpu, desc: "Deep learning" },
  { name: "Grad-CAM", icon: ScanSearch, desc: "AI explainability" },
  { name: "ReportLab", icon: FileText, desc: "PDF generation" },
  { name: "Tailwind CSS", icon: Sparkles, desc: "UI styling" },
];

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "MRI Upload",
    description:
      "User uploads a brain MRI scan (JPEG/PNG). The image is validated and sent to the FastAPI backend.",
    icon: Globe,
  },
  {
    step: "02",
    title: "Preprocessing",
    description:
      "The image is resized to 224×224 pixels and normalized for EfficientNetV2B0 input requirements.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Prediction",
    description:
      "The CNN model classifies the MRI into one of four classes with a confidence score.",
    icon: BrainCircuit,
  },
  {
    step: "04",
    title: "Grad-CAM Heatmap",
    description:
      "Gradient-weighted Class Activation Mapping highlights the regions that most influenced the prediction.",
    icon: ScanSearch,
  },
  {
    step: "05",
    title: "Report Generation",
    description:
      "A structured PDF diagnostic report is generated containing prediction, confidence, and heatmap.",
    icon: FileText,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 backdrop-blur-xl dark:text-cyan-400">
            <Microscope className="h-4 w-4" />
            AI-Powered Medical Imaging
          </div>

          <h1 className="text-5xl font-black leading-tight text-slate-900 dark:text-white md:text-6xl">
            About{" "}
            <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              NeuroVision AI
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            An end-to-end deep learning platform for brain tumor detection from
            MRI scans, combining EfficientNetV2B0 classification with Grad-CAM
            explainability and automated PDF report generation.
          </p>
        </motion.div>

        {/* ── Model Stats ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {MODEL_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="rounded-3xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)]"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tumor Classes ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div
            className="rounded-[36px] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)]"
          >
            <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
              <BrainCircuit className="h-6 w-6 text-cyan-500" />
              Detectable Tumor Classes
            </h2>
            <p className="mb-8 text-slate-600 dark:text-slate-400">
              The model is trained to classify MRI scans into four categories.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {TUMOR_CLASSES.map((tumor) => (
                <div
                  key={tumor.name}
                  className={`rounded-2xl border ${tumor.border} ${tumor.bg} p-5`}
                >
                  <h3 className={`mb-2 text-lg font-bold ${tumor.color}`}>
                    {tumor.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {tumor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Analysis Pipeline ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="rounded-[36px] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)]">
            <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
              <Zap className="h-6 w-6 text-cyan-500" />
              Analysis Pipeline
            </h2>
            <p className="mb-8 text-slate-600 dark:text-slate-400">
              How NeuroVision AI processes your MRI scan from upload to report.
            </p>

            <div className="relative flex flex-col gap-0">
              {PIPELINE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === PIPELINE_STEPS.length - 1;

                return (
                  <div key={step.step} className="flex gap-5">
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20">
                        <Icon className="h-5 w-5 text-cyan-500" />
                      </div>
                      {!isLast && (
                        <div className="my-1 w-px flex-1 bg-cyan-500/20" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold tracking-widest text-cyan-500">
                          {step.step}
                        </span>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ── Tech Stack ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="rounded-[36px] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)]">
            <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
              <Layers className="h-6 w-6 text-cyan-500" />
              Technology Stack
            </h2>
            <p className="mb-8 text-slate-600 dark:text-slate-400">
              Built with modern tools for reliability and performance.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TECH_STACK.map(({ name, icon: Icon, desc }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15">
                    <Icon className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Disclaimer ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="rounded-[36px] border border-amber-500/20 bg-amber-500/5 p-8 backdrop-blur-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
                <ShieldCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  Medical Disclaimer
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  NeuroVision AI is a research and educational tool. It is{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    not intended for clinical diagnosis
                  </strong>
                  . All predictions should be reviewed by a qualified medical
                  professional. The model's accuracy of 81.68% means it can and
                  does make mistakes. Do not use this tool as a substitute for
                  professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
