"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  Bold,
  Check,
  Download,
  Italic,
  Link as LinkIcon,
  Monitor,
  Save,
  Share2,
  Smartphone,
  Sparkles,
  Tablet,
  Underline,
  Palette,
  Layers,
  FileText,
  ShieldCheck,
  RefreshCw,
  Pencil,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import CoverLetterRenderer from "@/components/cover-letter/CoverLetterRenderer";
import {
  coverLetterTemplates,
  CoverLetterTemplate,
  CoverLetterData,
} from "@/data/coverLetterTemplates";

type Draft = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  date: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  salutation: string;
  jobTitle: string;
  tone: string;
  content: string;
  templateId: string;
  accentColor: string;
};

const initialDefaultTemplate = coverLetterTemplates[0];

const defaultDraft: Draft = {
  fullName: initialDefaultTemplate.sampleData.fullName,
  email: initialDefaultTemplate.sampleData.email,
  phone: initialDefaultTemplate.sampleData.phone,
  location: initialDefaultTemplate.sampleData.location,
  linkedin: initialDefaultTemplate.sampleData.linkedin || "",
  website: initialDefaultTemplate.sampleData.website || "",
  date: initialDefaultTemplate.sampleData.date,
  recipientName: initialDefaultTemplate.sampleData.recipientName,
  recipientTitle: initialDefaultTemplate.sampleData.recipientTitle,
  companyName: initialDefaultTemplate.sampleData.companyName,
  companyAddress: initialDefaultTemplate.sampleData.companyAddress,
  salutation: initialDefaultTemplate.sampleData.salutation,
  jobTitle: initialDefaultTemplate.sampleData.jobTitle,
  tone: "Professional",
  content: [
    initialDefaultTemplate.sampleData.openingParagraph,
    ...initialDefaultTemplate.sampleData.bodyParagraphs,
    initialDefaultTemplate.sampleData.closingParagraph,
  ].join("\n\n"),
  templateId: initialDefaultTemplate.id,
  accentColor: initialDefaultTemplate.accentColor,
};

const tabs = ["Content", "Style", "Tone", "Settings"];

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1 text-xs font-semibold text-slate-700">
      <span>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-normal text-slate-900 outline-none transition-all focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/20 shadow-2xs"
      />
    </label>
  );
}

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [tab, setTab] = useState("Content");
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mobileEditor, setMobileEditor] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [savedAt, setSavedAt] = useState("");

  // Initialize from searchParams if provided
  useEffect(() => {
    const templateParam = searchParams.get("template");
    const colorParam = searchParams.get("color");

    if (templateParam) {
      const foundTemplate = coverLetterTemplates.find(
        (t) => t.id === templateParam
      );
      if (foundTemplate) {
        setDraft((prev) => ({
          ...prev,
          fullName: foundTemplate.sampleData.fullName,
          email: foundTemplate.sampleData.email,
          phone: foundTemplate.sampleData.phone,
          location: foundTemplate.sampleData.location,
          linkedin: foundTemplate.sampleData.linkedin || "",
          website: foundTemplate.sampleData.website || "",
          date: foundTemplate.sampleData.date,
          recipientName: foundTemplate.sampleData.recipientName,
          recipientTitle: foundTemplate.sampleData.recipientTitle,
          companyName: foundTemplate.sampleData.companyName,
          companyAddress: foundTemplate.sampleData.companyAddress,
          salutation: foundTemplate.sampleData.salutation,
          jobTitle: foundTemplate.sampleData.jobTitle,
          templateId: foundTemplate.id,
          accentColor: colorParam || foundTemplate.accentColor,
          content: [
            foundTemplate.sampleData.openingParagraph,
            ...foundTemplate.sampleData.bodyParagraphs,
            foundTemplate.sampleData.closingParagraph,
          ].join("\n\n"),
        }));
        return;
      }
    }

    // Otherwise check local storage
    const stored = window.localStorage.getItem("geteasycv-cover-letter-draft");
    if (stored) {
      try {
        setDraft((prev) => ({ ...prev, ...JSON.parse(stored) }));
      } catch {}
    }
  }, [searchParams]);

  // Persist to local storage
  useEffect(() => {
    window.localStorage.setItem(
      "geteasycv-cover-letter-draft",
      JSON.stringify(draft)
    );
  }, [draft]);

  const update = (key: keyof Draft, value: string) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const activeTemplate: CoverLetterTemplate =
    coverLetterTemplates.find((t) => t.id === draft.templateId) ||
    initialDefaultTemplate;

  // Convert draft state to CoverLetterData for renderer
  const paragraphs = draft.content.split("\n\n").filter((p) => p.trim() !== "");
  const rendererData: CoverLetterData = {
    fullName: draft.fullName || "Your Full Name",
    jobTitle: draft.jobTitle || "Your Job Title",
    email: draft.email || "email@example.com",
    phone: draft.phone || "(555) 000-0000",
    location: draft.location || "City, State",
    linkedin: draft.linkedin,
    website: draft.website,
    date: draft.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    recipientName: draft.recipientName || "Hiring Manager",
    recipientTitle: draft.recipientTitle || "Department Lead",
    companyName: draft.companyName || "Company Name",
    companyAddress: draft.companyAddress || "Company Location",
    salutation: draft.salutation || `Dear ${draft.recipientName || "Hiring Manager"},`,
    openingParagraph: paragraphs[0] || "I am writing to express my strong interest in the open position...",
    bodyParagraphs: paragraphs.slice(1, -1).length > 0 ? paragraphs.slice(1, -1) : (paragraphs[1] ? [paragraphs[1]] : []),
    closingParagraph: paragraphs.length > 2 ? paragraphs[paragraphs.length - 1] : (paragraphs[1] || "Thank you for your time and consideration."),
    signoff: "Sincerely,",
  };

  const save = () => {
    setSavedAt(
      new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    );
    toast.success("Cover letter saved");
  };

  const generate = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: draft.fullName,
          jobTitle: draft.jobTitle,
          companyName: draft.companyName,
          tone: draft.tone,
          jobDescription: draft.content,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.coverLetter) {
        throw new Error(data.error || "Could not generate a draft");
      }
      update("content", data.coverLetter);
      toast.success("AI draft generated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not generate a draft"
      );
    } finally {
      setGenerating(false);
    }
  };

  const download = () => {
    const fullText = [
      draft.fullName,
      draft.jobTitle,
      `${draft.email} | ${draft.phone} | ${draft.location}`,
      draft.linkedin,
      "",
      draft.date,
      "",
      draft.recipientName,
      draft.recipientTitle,
      draft.companyName,
      draft.companyAddress,
      "",
      draft.salutation,
      "",
      draft.content,
      "",
      "Sincerely,",
      draft.fullName,
    ]
      .filter((line) => line !== undefined)
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([fullText], { type: "text/plain;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(draft.fullName || "Candidate").replace(/\s+/g, "_")}_Cover_Letter.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded cover letter");
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(draft.content);
      toast.success("Cover letter copied to clipboard");
    } catch {
      toast.error("Clipboard access is unavailable");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      {/* Top Header & Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <button
            type="button"
            onClick={() => router.push("/cover-letter")}
            className="mb-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Templates
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Cover Letter <span className="text-[#F3645C]">Editor</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Editing with template: <strong className="text-slate-800">{activeTemplate.name}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={generate}
            disabled={generating}
            className="inline-flex items-center gap-2 rounded-xl border border-[#FFD4C2] bg-[#FFF0EB] px-4 py-2.5 text-xs font-bold text-[#F3645C] shadow-2xs hover:bg-[#FFE5DC] transition-all disabled:opacity-60 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            {generating ? "Writing with AI..." : "AI Write"}
          </button>
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Save className="h-4 w-4 text-slate-600" />
            Save
          </button>
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4 text-slate-600" />
            Download
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F0F0F] hover:bg-black px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            Copy Text
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Form Controls & Tabs */}
        <section
          className={`${mobileEditor ? "" : "hidden lg:block"} lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden`}
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-100 bg-slate-50/70">
            {tabs.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setTab(item)}
                className={`flex-1 py-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  tab === item
                    ? "border-[#F3645C] text-[#F3645C] bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="max-h-[750px] overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* CONTENT TAB */}
            {tab === "Content" && (
              <div className="space-y-6">
                {/* 1. Candidate Info */}
                <div className="space-y-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Your Information
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      value={draft.fullName}
                      onChange={(val) => update("fullName", val)}
                    />
                    <Field
                      label="Job Title"
                      value={draft.jobTitle}
                      onChange={(val) => update("jobTitle", val)}
                    />
                    <Field
                      label="Email"
                      value={draft.email}
                      onChange={(val) => update("email", val)}
                    />
                    <Field
                      label="Phone"
                      value={draft.phone}
                      onChange={(val) => update("phone", val)}
                    />
                    <Field
                      label="Location (City, State)"
                      value={draft.location}
                      onChange={(val) => update("location", val)}
                    />
                    <Field
                      label="LinkedIn (Optional)"
                      value={draft.linkedin}
                      onChange={(val) => update("linkedin", val)}
                    />
                  </div>
                </div>

                {/* 2. Recipient Info */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Recipient Information
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Hiring Manager Name"
                      value={draft.recipientName}
                      onChange={(val) => update("recipientName", val)}
                    />
                    <Field
                      label="Recipient Title"
                      value={draft.recipientTitle}
                      onChange={(val) => update("recipientTitle", val)}
                    />
                    <Field
                      label="Company Name"
                      value={draft.companyName}
                      onChange={(val) => update("companyName", val)}
                    />
                    <Field
                      label="Company Location / Address"
                      value={draft.companyAddress}
                      onChange={(val) => update("companyAddress", val)}
                    />
                    <div className="sm:col-span-2">
                      <Field
                        label="Date"
                        value={draft.date}
                        onChange={(val) => update("date", val)}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Cover Letter Body */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      Letter Body & Paragraphs
                    </h2>
                    <button
                      type="button"
                      onClick={generate}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F3645C] hover:underline"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Assist
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-200 shadow-2xs">
                    <textarea
                      value={draft.content}
                      onChange={(event) => update("content", event.target.value)}
                      rows={12}
                      placeholder="Write your cover letter here (separate paragraphs with blank lines)..."
                      className="w-full p-4 text-xs font-normal leading-relaxed text-slate-800 outline-none resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Words: {draft.content.trim() ? draft.content.trim().split(/\s+/).length : 0} • Characters: {draft.content.length}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Live Synced
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STYLE TAB */}
            {tab === "Style" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                    Choose Template Design
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {coverLetterTemplates.map((template) => {
                      const isSelected = draft.templateId === template.id;
                      return (
                        <button
                          type="button"
                          key={template.id}
                          onClick={() => {
                            update("templateId", template.id);
                            update("accentColor", template.accentColor);
                          }}
                          className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#0F0F0F] bg-white shadow-md ring-2 ring-[#0F0F0F]/10"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">
                              {template.name}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#F3645C]" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {template.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Scheme Picker */}
                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Accent Color Theme
                  </h2>
                  <div className="flex items-center gap-3">
                    {activeTemplate.colorOptions.map((color) => {
                      const isSelected = draft.accentColor === color.hex;
                      return (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => update("accentColor", color.hex)}
                          title={color.name}
                          className={`group relative h-9 w-9 rounded-full border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#0F0F0F] scale-110 shadow-sm"
                              : "border-white hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <Check className="mx-auto h-4 w-4 text-white drop-shadow-sm" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TONE TAB */}
            {tab === "Tone" && (
              <div className="space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  AI Writing Tone
                </h2>
                <div className="space-y-2.5">
                  {[
                    { id: "Professional", desc: "Formal, respectful, and authoritative phrasing." },
                    { id: "Confident", desc: "Bold, achievement-focused, and dynamic energy." },
                    { id: "Friendly", desc: "Approachable, conversational, and culture-oriented." },
                    { id: "Creative", desc: "Expressive, narrative-driven, and engaging hooks." },
                  ].map((t) => (
                    <label
                      key={t.id}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all cursor-pointer ${
                        draft.tone === t.id
                          ? "border-[#0F0F0F] bg-white shadow-xs"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tone"
                        checked={draft.tone === t.id}
                        onChange={() => update("tone", t.id)}
                        className="mt-0.5 text-[#F3645C] focus:ring-[#F3645C]"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{t.id}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{t.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {tab === "Settings" && (
              <div className="space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Editor Actions
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(defaultDraft);
                    toast.success("Draft reset to default");
                  }}
                  className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-all cursor-pointer"
                >
                  Reset All to Default Template
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Live Document Preview */}
        <section className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-[#FAFAF9] shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-5 py-3.5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <span className="text-xs font-bold text-slate-900">Live Preview</span>
            </div>

            {/* Device Preview Mode Toggles */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              {(
                [
                  ["desktop", Monitor],
                  ["tablet", Tablet],
                  ["mobile", Smartphone],
                ] as const
              ).map(([item, Icon]) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setMode(item)}
                  className={`rounded-md p-1.5 transition-all cursor-pointer ${
                    mode === item ? "bg-white text-slate-900 shadow-2xs" : "text-slate-400 hover:text-slate-700"
                  }`}
                  title={`${item} preview`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Rendered Canvas */}
          <div className="flex min-h-[600px] justify-center p-4 sm:p-8 overflow-y-auto">
            <div
              className={`w-full bg-white rounded-xl shadow-lg border border-slate-200/80 overflow-hidden transition-all duration-300 ${
                mode === "mobile"
                  ? "max-w-[320px]"
                  : mode === "tablet"
                  ? "max-w-[480px]"
                  : "max-w-[620px]"
              }`}
            >
              <CoverLetterRenderer
                template={activeTemplate}
                data={rendererData}
                accentColor={draft.accentColor}
                isCompact={false}
              />
            </div>
          </div>

          {savedAt && (
            <div className="bg-white border-t border-slate-200/60 px-5 py-2.5 text-right text-[11px] text-slate-400 font-medium">
              Saved at {savedAt}
            </div>
          )}
        </section>
      </div>

      {/* Mobile Floating Toggle */}
      <button
        type="button"
        onClick={() => setMobileEditor((open) => !open)}
        className="fixed bottom-5 left-5 z-30 rounded-full bg-[#0F0F0F] px-5 py-3 text-xs font-bold text-white shadow-xl lg:hidden flex items-center gap-2"
      >
        <Pencil className="w-4 h-4" />
        <span>{mobileEditor ? "View Preview" : "Edit Content"}</span>
      </button>
    </div>
  );
}

export default function CoverLetterEditorPage() {
  return (
    <>
      <Navigation />
      <Toaster position="bottom-right" />
      <main className="min-h-[calc(100vh-64px)] bg-[#F8F8F6] text-slate-900 font-sans">
        <Suspense fallback={<div className="p-12 text-center text-xs font-bold">Loading Editor...</div>}>
          <EditorContent />
        </Suspense>
      </main>
    </>
  );
}
