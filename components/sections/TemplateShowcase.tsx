"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Star, Download } from "lucide-react";

// Mock popular templates
const POPULAR_TEMPLATES = [
  {
    id: 1,
    name: "Modern Professional",
    category: "Professional",
    thumbnail: "/templates/modern-professional.png",
    isPremium: false,
    isATS: true,
    downloads: 1500,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Executive Bold",
    category: "Executive",
    thumbnail: "/templates/executive-bold.png",
    isPremium: true,
    isATS: true,
    downloads: 980,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Creative Designer",
    category: "Creative",
    thumbnail: "/templates/creative-designer.png",
    isPremium: false,
    isATS: true,
    downloads: 1200,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Tech Minimalist",
    category: "Technology",
    thumbnail: "/templates/tech-minimal.png",
    isPremium: true,
    isATS: true,
    downloads: 1100,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Classic Elegant",
    category: "Professional",
    thumbnail: "/templates/classic-elegant.png",
    isPremium: false,
    isATS: true,
    downloads: 1350,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Marketing Pro",
    category: "Marketing",
    thumbnail: "/templates/marketing-pro.png",
    isPremium: false,
    isATS: true,
    downloads: 890,
    rating: 4.8,
  },
];

const CATEGORIES = [
  "All",
  "Professional",
  "Executive",
  "Creative",
  "Technology",
  "Marketing",
  "Entry Level",
];

export default function TemplateShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = POPULAR_TEMPLATES.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 rounded-full mb-4">
            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
              Popular Templates
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start with our most popular, professionally designed templates
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Template Thumbnail */}
              <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                {/* Placeholder for actual thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="text-slate-400 text-sm font-medium">
                    {template.name}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {template.isATS && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                      ATS
                    </span>
                  )}
                  {template.isPremium && (
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded">
                      PRO
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <Link
                    href={`/templates/${template.id}`}
                    className="px-6 py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Use Template
                  </Link>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-500 mb-3">
                  {template.category}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-700">
                      {template.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl group"
          >
            View All Templates
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            150+ professional templates available
          </p>
        </div>
      </div>
    </section>
  );
}
