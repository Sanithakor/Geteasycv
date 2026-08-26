"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import Navigation from "@/components/Navigation";

type Draft = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  date: string;
  hiringManager: string;
  company: string;
  jobTitle: string;
  tone: string;
  content: string;
};

const initialDraft: Draft = {
  fullName: "Jessica Williams",
  email: "jessica.williams@email.com",
  phone: "(555) 123-4567",
  linkedin: "linkedin.com/in/jessicawilliams",
  date: "May 21, 2025",
  hiringManager: "Robert Johnson",
  company: "TechNova Solutions",
  jobTitle: "Senior Marketing Manager",
  tone: "Professional",
  content: `Dear Robert Johnson,\n\nI am writing to express my strong interest in the Senior Marketing Manager position at TechNova Solutions. With over 6 years of experience in driving successful marketing strategies and leading high-performing teams, I am confident in my ability to contribute to your company's growth and success.\n\nIn my current role at BrightWave Digital, I led a team of 8 marketers and managed campaigns that increased brand visibility by 45% and generated over $2M in revenue. I am passionate about data-driven marketing and enjoy turning insights into impactful strategies.\n\nI am excited about the opportunity to bring my skills and experience to TechNova Solutions and help drive meaningful results. I look forward to the possibility of discussing how I can contribute to your team.\n\nSincerely,\nJessica Williams`,
};

const tabs = ["Content", "Style", "Tone", "Settings"];

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-[10px] font-semibold text-slate-600">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded border border-slate-200 px-2.5 text-[11px] font-normal outline-none focus:border-[#7755ed] focus:ring-2 focus:ring-[#7755ed]/15"
      />
    </label>
  );
}

function Preview({
  draft,
  mode,
}: {
  draft: Draft;
  mode: "desktop" | "tablet" | "mobile";
}) {
  return (
    <div className="flex min-h-[620px] justify-center bg-[#fafafa] p-4 sm:p-7">
      <article
        className={`min-h-[680px] w-full bg-white p-6 text-[10px] leading-[1.65] text-slate-800 shadow-sm sm:p-8 ${mode === "mobile" ? "max-w-[300px]" : mode === "tablet" ? "max-w-[470px]" : "max-w-[620px]"}`}
      >
        <header className="border-b border-[#d7c9ff] pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                {draft.fullName || "Your Name"}
              </h1>
              <p className="mt-1 text-[10px]">
                {draft.jobTitle || "Your Job Title"}
              </p>
            </div>
            <div className="space-y-1 text-right text-[8px] text-slate-600">
              <p>{draft.email}</p>
              <p>{draft.phone}</p>
              <p>{draft.linkedin}</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </header>
        <div className="mt-5 space-y-4">
          <p>{draft.date}</p>
          <p>
            {draft.hiringManager}
            <br />
            {draft.jobTitle}
            <br />
            {draft.company}
            <br />
            San Francisco, CA
          </p>
          {draft.content.split("\n\n").map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default function CoverLetterEditorPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [tab, setTab] = useState("Content");
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mobileEditor, setMobileEditor] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("geteasycv-cover-letter-draft");
    if (stored) {
      const restoreTimer = window.setTimeout(() => {
        try {
          setDraft({ ...initialDraft, ...JSON.parse(stored) });
        } catch {}
      }, 0);
      return () => window.clearTimeout(restoreTimer);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem(
      "geteasycv-cover-letter-draft",
      JSON.stringify(draft),
    );
  }, [draft]);
  const update = (key: keyof Draft, value: string) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const save = () => {
    setSavedAt(
      new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
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
          companyName: draft.company,
          tone: draft.tone,
          jobDescription: draft.content,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.coverLetter)
        throw new Error(data.error || "Could not generate a draft");
      update("content", data.coverLetter);
      toast.success("AI draft generated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not generate a draft",
      );
    } finally {
      setGenerating(false);
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([draft.content], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${draft.fullName.replace(/\s+/g, "_")}_Cover_Letter.txt`;
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
  const format = (command: string) => document.execCommand(command);

  return (
    <>
      <Navigation />
      <Toaster position="bottom-right" />
      <main className="home-design min-h-[calc(100vh-64px)] bg-[#faf9fd] text-slate-900">
        <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-6 sm:px-8 lg:pt-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Cover Letter <span className="text-[#7755ed]">Editor</span>
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Craft a compelling cover letter with AI assistance.
              </p>
              <button
                type="button"
                onClick={() => router.push("/cover-letter")}
                className="mt-3 inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold shadow-sm"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Cover Letters
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={generate}
                disabled={generating}
                className="inline-flex items-center gap-2 rounded border border-[#ddd2ff] bg-white px-3 py-2.5 text-[10px] font-bold text-[#6844df] shadow-sm disabled:opacity-60"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {generating ? "Writing..." : "AI Write Cover Letter"}
              </button>
              <button
                type="button"
                onClick={save}
                className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                Save
              </button>
              <button
                type="button"
                onClick={download}
                className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded bg-slate-900 px-4 py-2.5 text-[10px] font-bold text-white"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <section
              className={`${mobileEditor ? "" : "hidden lg:block"} rounded-lg border border-slate-200 bg-white shadow-sm`}
            >
              <div className="flex border-b border-slate-100">
                {tabs.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setTab(item)}
                    className={`flex-1 border-b-2 px-2 py-4 text-[10px] font-semibold ${tab === item ? "border-[#7755ed] text-[#7755ed]" : "border-transparent text-slate-500"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="max-h-[680px] overflow-y-auto p-4 sm:p-6">
                {tab === "Content" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-3 text-xs font-bold">
                        Your Information
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Field
                          label="Full Name"
                          value={draft.fullName}
                          onChange={(value) => update("fullName", value)}
                        />
                        <Field
                          label="Email"
                          value={draft.email}
                          onChange={(value) => update("email", value)}
                        />
                        <Field
                          label="Phone"
                          value={draft.phone}
                          onChange={(value) => update("phone", value)}
                        />
                        <Field
                          label="LinkedIn (Optional)"
                          value={draft.linkedin}
                          onChange={(value) => update("linkedin", value)}
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-3 text-xs font-bold">
                        Recipient Information
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Field
                          label="Hiring Manager Name"
                          value={draft.hiringManager}
                          onChange={(value) => update("hiringManager", value)}
                        />
                        <Field
                          label="Company Name"
                          value={draft.company}
                          onChange={(value) => update("company", value)}
                        />
                        <Field
                          label="Job Title"
                          value={draft.jobTitle}
                          onChange={(value) => update("jobTitle", value)}
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-3 text-xs font-bold">
                        Cover Letter Content
                      </h2>
                      <div className="overflow-hidden rounded border border-slate-200">
                        <div className="flex gap-1 border-b border-slate-200 bg-slate-50 p-2">
                          <button
                            type="button"
                            title="Bold"
                            onClick={() => format("bold")}
                            className="p-1.5"
                          >
                            <Bold className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Italic"
                            onClick={() => format("italic")}
                            className="p-1.5"
                          >
                            <Italic className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Underline"
                            onClick={() => format("underline")}
                            className="p-1.5"
                          >
                            <Underline className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Insert link"
                            onClick={() => {
                              const url = window.prompt("Enter a URL");
                              if (url)
                                document.execCommand("createLink", false, url);
                            }}
                            className="p-1.5"
                          >
                            <LinkIcon className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={generate}
                            className="ml-auto inline-flex items-center gap-1 rounded bg-[#f2edff] px-2 py-1 text-[9px] font-bold text-[#6844df]"
                          >
                            <Sparkles className="h-3 w-3" />
                            AI Assist
                          </button>
                        </div>
                        <textarea
                          value={draft.content}
                          onChange={(event) =>
                            update("content", event.target.value)
                          }
                          className="min-h-[270px] w-full resize-y p-3 text-[11px] leading-5 outline-none"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[9px] text-slate-500">
                        <button
                          type="button"
                          onClick={generate}
                          className="inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1.5 font-semibold"
                        >
                          <Sparkles className="h-3 w-3 text-[#7755ed]" />
                          AI Suggestions
                        </button>
                        <span>
                          Words:{" "}
                          {draft.content.trim()
                            ? draft.content.trim().split(/\s+/).length
                            : 0}{" "}
                          &nbsp; Characters: {draft.content.length}{" "}
                          <Check className="ml-1 inline h-3.5 w-3.5 rounded-full bg-emerald-500 p-0.5 text-white" />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {tab === "Style" && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-bold">Template Style</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {["Modern Minimal", "Creative Edge", "Executive"].map(
                        (style, index) => (
                          <button
                            type="button"
                            key={style}
                            className={`rounded border p-3 text-left text-[10px] font-semibold ${index === 1 ? "border-[#7755ed] ring-2 ring-[#7755ed]/15" : "border-slate-200"}`}
                          >
                            <div
                              className={`mb-3 h-20 rounded-sm ${index === 1 ? "bg-[#293950]" : "bg-slate-100"}`}
                            />
                            {style}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )}
                {tab === "Tone" && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold">Writing Tone</h2>
                    {["Professional", "Confident", "Friendly", "Creative"].map(
                      (tone) => (
                        <label
                          key={tone}
                          className="flex items-center gap-3 rounded border border-slate-200 p-3 text-xs"
                        >
                          <input
                            type="radio"
                            name="tone"
                            checked={draft.tone === tone}
                            onChange={() => update("tone", tone)}
                          />
                          {tone}
                        </label>
                      ),
                    )}
                  </div>
                )}
                {tab === "Settings" && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-bold">Editor Settings</h2>
                    <label className="flex items-center justify-between rounded border border-slate-200 p-3 text-xs">
                      Auto-save drafts
                      <input type="checkbox" defaultChecked />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(initialDraft);
                        toast.success("Draft reset");
                      }}
                      className="w-full rounded border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600"
                    >
                      Reset Draft
                    </button>
                  </div>
                )}
              </div>
            </section>
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h2 className="text-xs font-bold">Live Preview</h2>
                <div className="flex gap-1">
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
                      className={`rounded p-1.5 ${mode === item ? "bg-[#f2edff] text-[#7755ed]" : "text-slate-400"}`}
                      title={`${item} preview`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
              <Preview draft={draft} mode={mode} />
            </section>
          </div>
          <button
            type="button"
            onClick={() => setMobileEditor((open) => !open)}
            className="fixed bottom-5 left-5 z-30 rounded-full bg-[#7755ed] px-4 py-3 text-xs font-bold text-white shadow-lg lg:hidden"
          >
            {mobileEditor ? "Close editor" : "Edit content"}
          </button>
          <div className="mt-5 flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[10px] shadow-sm sm:flex-row">
            <div className="flex items-center gap-3">
              <b>
                AI Cover Letter
                <br />
                Score
              </b>
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-emerald-500 text-sm font-bold text-emerald-600">
                92
              </span>
              <span className="hidden text-emerald-600 sm:block">
                <b>Great job!</b> Your cover letter is well-written and
                structured.
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                toast("Your letter is tailored to the job description")
              }
              className="rounded border border-slate-200 px-3 py-2 font-semibold"
            >
              View Suggestions
            </button>
            <div className="hidden flex-1 gap-5 border-l border-slate-100 pl-5 md:flex">
              <span>
                <b className="block">Personalized Content</b>
                <small className="text-slate-500">
                  Tailored to the job description
                </small>
              </span>
              <span>
                <b className="block">ATS Friendly</b>
                <small className="text-slate-500">
                  Optimized for ATS systems
                </small>
              </span>
              <span>
                <b className="block">Professional Tone</b>
                <small className="text-slate-500">
                  Clear and professional language
                </small>
              </span>
            </div>
          </div>
          {savedAt && (
            <p className="mt-2 text-right text-[9px] text-slate-400">
              Saved at {savedAt}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
