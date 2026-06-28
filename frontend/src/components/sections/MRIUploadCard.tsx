import { useState } from "react";
import type {ChangeEvent, DragEvent,} from "react";
import { motion } from "framer-motion";
import {
  FileImage,
  Upload,
  X,
} from "lucide-react";

type Props = {
  onFileChange: (file: File | null) => void;
};

export default function MRIUploadCard({ onFileChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload a valid MRI image.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    onFileChange(selectedFile);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    handleFileSelect(selectedFile);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files?.[0];

    if (!selectedFile) return;

    handleFileSelect(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileChange(null);
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="
        mx-auto
        mt-20
        max-w-5xl
        px-6
      "
    >
      <div
        className="
          rounded-[36px]
          border
          border-white/20
          bg-white/10
          p-8
          backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(31,38,135,0.18)]
        "
      >
        <div className="mb-8">
          <h2
            className="
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Upload MRI Scan
          </h2>

          <p
            className="
              mt-2
              text-slate-600
              dark:text-slate-400
            "
          >
            Upload an MRI image for AI-powered tumor analysis.
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="
            flex
            min-h-70
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-cyan-400/40
            bg-cyan-500/5
            p-8
            transition-all
            duration-300
            hover:bg-cyan-500/10
          "
        >
          {!previewUrl ? (
            <>
              <Upload
                className="
                  mb-4
                  h-14
                  w-14
                  text-cyan-500
                "
              />

              <h3
                className="
                  text-xl
                  font-semibold
                  dark:text-white
                "
              >
                Drag & Drop MRI Image
              </h3>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                or click below to browse
              </p>

              <label
                className="
                  mt-6
                  cursor-pointer
                  rounded-2xl
                  bg-cyan-500
                  px-6
                  py-3
                  font-medium
                  text-white
                "
              >
                Choose File

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <div className="w-full">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                "
              >
                <img
                  src={previewUrl}
                  alt="MRI Preview"
                  className="
                    h-87.5
                    w-full
                    object-cover
                  "
                />

                <button
                  onClick={removeFile}
                  className="
                    absolute
                    right-4
                    top-4
                    rounded-full
                    bg-red-500
                    p-2
                    text-white
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-3
                "
              >
                <FileImage className="text-cyan-500" />

                <span className="dark:text-white">
                  {file?.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
