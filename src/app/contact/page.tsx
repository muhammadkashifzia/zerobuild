"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { recaptchaSiteKey } from "@/sanity/env";
import Image from "next/image";
import { getContacts } from "@/sanity/sanity-utils";
import { Contact } from "@/types/Contact";
const SITE_KEY = recaptchaSiteKey;

const ContactPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getContacts();
      setContacts(res);
    };
    fetchData();
  }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      company: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
      purpose: Yup.array().min(1, "Select at least one purpose"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(SITE_KEY, {
            action: "submit",
          });

          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values, recaptchaToken: token }),
          });

          const result = await res.json();

          if (res.ok && result.success) {
            setSuccess(true);
            formik.resetForm();
            setTimeout(() => router.push("/resources"), 6000);
          } else {
            setError(result.error || "Something went wrong. Please try again.");
            setLoading(false);
          }
        });
      } catch (err) {
        console.error(err);
        setError("Network error. Please check your connection and try again.");
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
    <div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-20 md:px-6 md:py-32 lg:grid-cols-2">
        <div className="relative flex flex-col items-center overflow-hidden lg:items-start">
          <h2 className="bg-gradient-to-b from-neutral-800 to-neutral-900 bg-clip-text text-left text-xl font-bold text-transparent md:text-3xl lg:text-5xl dark:from-neutral-200 dark:to-neutral-300">
            Contact us
          </h2>
          <p className="mt-8 text-center text-base text-neutral-600 md:text-left dark:text-neutral-400">
            We are always looking for ways to improve our products and services.
            Contact us and let us know how we can help you.
          </p>
          {contacts.map((contact, index) => (
            <div
              key={contact.email || index}
              className="mt-10 hidden flex-col items-center gap-4 md:flex-row lg:flex"
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {contact.address}
              </p>
              <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400"></div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {contact.phone}
              </p>
              <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400"></div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {contact.email}
              </p>
            </div>
          ))}
          <Image
            src="/assets/images/UpdatedMap.png"
            alt="Map"
            width={500}
            height={300}
            className="mt-10 w-full"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 pt-[30px] pb-[40px] px-[40px]  dark:from-neutral-900 dark:to-neutral-950">
          {success ? (
            <div className="bg-green-100  p-4 rounded text-black">
              Thank you! Your submission has been received.
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-black mb-[8px]">
                  Name <span className="text-[#ff0000]">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="w-full border rounded p-2 text-black"
                  placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-black mb-[8px]">
                  Email <span className="text-[#ff0000]">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="text-black w-full border rounded p-2"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-black mb-[8px]">
                  Company <span className="text-[#ff0000]">*</span>
                </label>
                <input
                  name="company"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.company}
                  className="text-black w-full border rounded p-2"
                  placeholder="Enter your company"
                />
                {formik.touched.company && formik.errors.company && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.company}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-black mb-[8px]">
                  I&apos;m contacting you as a...
                </label>

                <select
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  className="text-black w-full border rounded p-2"
                >
                  <option value="">Select Role (Optional)</option>
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-black mb-[8px]">
                  What brings you to Zero Build today?{" "}
                  <span className="text-[#ff0000]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {purposeOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-black text-[15px]"
                    >
                      <input
                        type="checkbox"
                        name="purpose"
                        value={option}
                        checked={formik.values.purpose.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formik.setFieldValue("purpose", [
                              ...formik.values.purpose,
                              option,
                            ]);
                          } else {
                            formik.setFieldValue(
                              "purpose",
                              formik.values.purpose.filter(
                                (item) => item !== option
                              )
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {formik.touched.purpose && formik.errors.purpose && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.purpose}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-black mb-[8px]">
                  Message
                </label>
                <textarea
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  rows={4}
                  className="w-full border rounded p-2 text-black"
                  placeholder="Enter your message"
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#484AB7] text-white border-neutral-200 px-2 rounded-xl max-w-[185px] h-[45px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
