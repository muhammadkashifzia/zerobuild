"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactSubmission } from "@/types/ContactSubmission";
import { BackgroundBeams } from "@/components/ui/background-beams";

const ContactPage = () => {
  const [form, setForm] = useState<ContactSubmission>({
    name: "",
    email: "",
    company: "",
    message: "",
    purpose: [],
    role: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (value: string) => {
    setForm((prev) => ({
      ...prev,
      purpose: prev.purpose.includes(value)
        ? prev.purpose.filter((p) => p !== value)
        : [...prev.purpose, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
        purpose: [],
        role: "",
        honeypot: "",
      });

      setTimeout(() => {
        router.push("/resources");
      }, 4000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-6">
          Contact Us
        </h1>

        {success ? (
          <p className="text-center text-green-600 font-semibold">
            Thanks for reaching out! We’ll be in touch soon.
            <br />
            <a href="/resources" className="underline text-teal-500">
              Check out our latest tools
            </a>
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              className="hidden"
            />

            <input
              required
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-4 border rounded"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 border rounded"
            />
            <input
              required
              type="text"
              name="company"
              placeholder="Company name"
              value={form.company}
              onChange={handleChange}
              className="w-full p-4 border rounded"
            />

            <label className="block font-medium text-sm">
              What brings you to Zero Build today?
            </label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                "General Enquiry",
                "Retrofit",
                "New Build Design",
                "Digital Twins",
                "Building Performance Evaluation",
                "Post-Occupancy Monitoring",
                "Data Tool Feedback or Demo Request",
                "QA Tool Support",
                "Life Cycle or Circularity Assessments",
                "Carbon Cost Comparison",
                "Daylight or IAQ Analysis",
                "Partnership or Collaboration",
                "Training & Workshops",
                "Press or Speaking Request",
                "Something Else",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.purpose.includes(option)}
                    onChange={() => handleCheckbox(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <label className="block font-medium text-sm">
              I&apos;m contacting you as a...
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded text-sm"
            >
              <option value="">Select role (optional)</option>
              {[
                "Developer or Contractor",
                "Local Authority Representative",
                "Housing Association / PRP",
                "Architect or Architectural Assistant",
                "Engineer (MEP, Structural, Building Physics, etc.)",
                "Planner or Urban Designer",
                "Sustainability Consultant",
                "Academic or Researcher",
                "Policy or Government Team",
                "Student",
                "Product Manufacturer / Supplier",
                "Investor or Fund Representative",
                "Tech / Software Partner",
                "Press or Media Contact",
                "Other",
              ].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <textarea
              required
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-4 border rounded"
            />

            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
