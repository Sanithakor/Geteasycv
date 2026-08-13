"use client";

import { useState } from "react";
import Image from "next/image";
import templates from "@/data/templates.json";

type Props = {
  selected: string;
  setSelected: (value: string) => void;
};

const FALLBACK_IMAGE = "/images/templates/preview-placeholder.svg";

export default function TemplateSelector({
  selected,
  setSelected,
}: Props) {
  const [erroredThumbnails, setErroredThumbnails] = useState<Record<string, boolean>>({});

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Choose Template</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const thumbnail = erroredThumbnails[template.id]
            ? FALLBACK_IMAGE
            : template.thumbnail || FALLBACK_IMAGE;

          return (
            <div
              key={template.id}
              onClick={() => setSelected(template.id)}
              className={`group relative cursor-pointer rounded-md overflow-hidden border bg-white transition hover:shadow-2xl ${
                selected === template.id
                  ? "border-indigo-500 ring-2 ring-indigo-400"
                  : "border-gray-200"
              }`}
            >
            {/* IMAGE + OVERLAY WRAPPER */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <Image
                  src={thumbnail}
                  alt={template.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  onError={() => setErroredThumbnails((prev) => ({ ...prev, [template.id]: true }))}
                />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                  <span className="text-white text-sm font-medium">Preview</span>
                </div>

                {selected === template.id && (
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[11px] px-2 py-1 rounded-full shadow-lg">
                    Selected
                  </div>
                )}
              </div>

              {/* CONTENT */}
            <div className="p-3">
              <h3 className="text-sm font-medium">
                {template.name}
              </h3>

              <p className="text-xs text-gray-500">
                {template.category}
              </p>

              {/* FEATURES */}
              <div className="flex flex-wrap gap-1 mt-2">
                {template.features?.slice(0, 2).map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-gray-100 px-2 py-0.5 rounded"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}