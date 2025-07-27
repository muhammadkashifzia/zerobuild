"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { recaptchaSiteKey } from "@/sanity/env";

const SITE_KEY = recaptchaSiteKey;

const ContactPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

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
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      company: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
      purpose: Yup.array().min(1, "Select at least one purpose"),
    }),
    onSubmit: async (values) => {
      if (values.honeypot !== "") return;
      setLoading(true);

      try {
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(SITE_KEY, { action: "submit" });

          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values, recaptchaToken: token }),
          });

          if (res.ok) {
            setSuccess(true);
            formik.resetForm();
            setTimeout(() => router.push("/resources"), 3000);
          } else {
            setLoading(false);
          }
        });
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
  });

  const roleOptions = [
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
  ];

  const purposeOptions = [
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
  ];

  return (
    <div className="max-w-3xl mx-auto pt-[100px]">
      <h1 className="text-3xl font-bold mb-6 text-black">Contact Us</h1>

      {success ? (
        <div className="bg-green-100  p-4 rounded text-black">Thank you! Your submission has been received.</div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input type="hidden" name="honeypot" value={formik.values.honeypot} onChange={formik.handleChange} />

          <div>
            <label className="block font-semibold text-black">Name *</label>
            <input name="name" type="text" onChange={formik.handleChange} value={formik.values.name} className="w-full border rounded p-2" placeholder="Enter your name"/>
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
          </div>

          <div>
            <label className="block font-semibold text-black">Email *</label>
            <input name="email" type="email" onChange={formik.handleChange} value={formik.values.email} className="text-black w-full border rounded p-2" placeholder="Enter your email"/>
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>

          <div>
            <label className="block font-semibold text-black">Company *</label>
            <input name="company" type="text" onChange={formik.handleChange} value={formik.values.company} className="text-black w-full border rounded p-2" placeholder="Enter your company"/>
            {formik.touched.company && formik.errors.company && <p className="text-red-500 text-sm">{formik.errors.company}</p>}
          </div>

          <div>
           <label className="block font-semibold text-black">I&apos;m contacting you as a...</label>

            <select name="role" onChange={formik.handleChange} value={formik.values.role} className="text-black w-full border rounded p-2">
              <option value="">Select Role (Optional)</option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-black">What brings you to Zero Build today? *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {purposeOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 text-black">
                  <input
                    type="checkbox"
                    name="purpose"
                    value={option}
                    checked={formik.values.purpose.includes(option)}
                    onChange={formik.handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            {formik.touched.purpose && formik.errors.purpose && <p className="text-red-500 text-sm">{formik.errors.purpose}</p>}
          </div>

          <div>
            <label className="block font-semibold text-black">Message *</label>
            <textarea name="message" onChange={formik.handleChange} value={formik.values.message} rows={4} className="w-full border rounded p-2" placeholder="Enter your message"/>
            {formik.touched.message && formik.errors.message && <p className="text-red-500 text-sm">{formik.errors.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded disabled:opacity-50">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
