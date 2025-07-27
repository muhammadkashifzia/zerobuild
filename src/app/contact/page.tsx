"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BackgroundBeams } from "@/components/ui/background-beams";

const ContactPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      purpose: [] as string[],
      role: "",
      honeypot: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      company: Yup.string().required("Company is required"),
      message: Yup.string().required("Message is required"),
      honeypot: Yup.string().max(0),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSuccess(true);
        formik.resetForm();
        setTimeout(() => router.push("/resources"), 4000);
      }
      setLoading(false);
    },
  });

  const toggleCheckbox = (value: string) => {
    const current = formik.values.purpose;
    if (current.includes(value)) {
      formik.setFieldValue(
        "purpose",
        current.filter((v) => v !== value)
      );
    } else {
      formik.setFieldValue("purpose", [...current, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold text-center text-black mb-6">
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
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              name="honeypot"
              value={formik.values.honeypot}
              onChange={formik.handleChange}
              className="hidden text-black"
            />

            <input
              name="name"
              placeholder="Your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-4 border rounded text-black"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-4 border rounded text-black"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}

            <input
              name="company"
              placeholder="Company name"
              value={formik.values.company}
              onChange={formik.handleChange}
              className="w-full p-4 border rounded text-black"
            />
            {formik.touched.company && formik.errors.company && (
              <div className="text-red-500 text-sm">{formik.errors.company}</div>
            )}

            <label className="block font-medium text-sm text-black">
              What brings you to Zero Build today?
            </label>
            <div className="grid grid-cols-2 gap-2 text-sm text-black">
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
                    checked={formik.values.purpose.includes(option)}
                    onChange={() => toggleCheckbox(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <label className="block font-medium text-sm text-black">
              I&apos;m contacting you as a...
            </label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded text-sm text-black"
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
              name="message"
              placeholder="Your message"
              value={formik.values.message}
              onChange={formik.handleChange}
              rows={5}
              className="w-full p-4 border rounded text-black"
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-red-500 text-sm">{formik.errors.message}</div>
            )}

            <button
              type="submit"
              className="bg-teal-600 text-black px-6 py-3 rounded hover:bg-teal-700"
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
