"use client";

"use client";
import React, { useState, useEffect, useId } from "react";
import { getFeatures, getFeatureHeading } from "@/sanity/sanity-utils";
import { Feature, FeatureHeading } from "@/types/Feature";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { recaptchaSiteKey } from "@/sanity/env";
import { motion } from "motion/react";
import { getContacts, getContactPageBanner } from "@/sanity/sanity-utils";
import { Contact } from "@/types/Contact";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from "lucide-react";
const SITE_KEY = recaptchaSiteKey;

const ContactPage = () => {
  const [Features, setFeatures] = useState<Feature[]>([]);
  const [featureHeading, setFeatureHeading] = useState<FeatureHeading | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresRes, headingRes] = await Promise.all([
          getFeatures(),
          getFeatureHeading(),
        ]);
        setFeatures(featuresRes);
        setFeatureHeading(headingRes[0] || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const words = [
    {
      text: "Expert",
    },
  ];

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const [bannerDescription, setBannerDescription] = useState<string>("");
  const [bannerLoading, setBannerLoading] = useState<boolean>(true);
  const [cta, setCta] = useState<{ note?: string }>({});
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formStartTs, setFormStartTs] = useState<number>(() => Date.now());

  useEffect(() => {
    const fetchData = async () => {
      const bannerRes = await getContactPageBanner();
      if (bannerRes?.title) setBannerTitle(bannerRes.title);
      if (bannerRes?.description) setBannerDescription(bannerRes.description);
      if (bannerRes?.cta) setCta(bannerRes.cta as any);
      if (bannerRes?.contacts && bannerRes.contacts.length > 0) {
        setContacts(bannerRes.contacts);
      } else {
        const fallbackContacts = await getContacts();
        setContacts(fallbackContacts || []);
      }
      setBannerLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setFormStartTs(Date.now());
  }, []);

  // Auto-hide success message after 60 seconds
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 2000);
    return () => clearTimeout(timer);
  }, [success]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      purpose: [] as string[],
      role: "",
      honeypot: "",
      privacyConsent: false,
      marketingConsent: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      company: Yup.string().required("Required"),
      message: Yup.string(),
      purpose: Yup.array().min(1, "Select at least one purpose"),
      privacyConsent: Yup.boolean().oneOf(
        [true],
        "You must agree to the Privacy Notice to proceed"
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        if (typeof window.grecaptcha === "undefined") {
          setError(
            "reCAPTCHA not loaded. Please refresh the page and try again."
          );
          setLoading(false);
          return;
        }

        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, {
              action: "submit",
            });

            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...values,
                recaptchaToken: token,
                elapsedMs: Math.max(0, Date.now() - formStartTs),
              }),
            });

            const result = await res.json();

            if (res.ok && result.success) {
              setSuccess(true);
              formik.resetForm();
              setLoading(false);
              if (result.warning) {
                console.warn("Email delivery warning:", result.warning);
              }
              // Stay on page after success
            } else {
              setError(
                result.error || "Something went wrong. Please try again."
              );
              setLoading(false);
            }
          } catch (err) {
            console.error("reCAPTCHA or fetch error:", err);
            setError(
              "Network error. Please check your connection and try again."
            );
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
      <div className="mx-auto grid w-full container grid-cols-1 gap-2 md:gap-10 py-20 px-[16px] md:py-32 lg:grid-cols-2">
        <div className="relative flex flex-col items-center md:items-center overflow-hidden lg:items-start">
          {bannerLoading ? (
            <div className="w-full animate-pulse">
              <div className="h-8 md:h-10 lg:h-12 w-2/3 bg-neutral-200 rounded-md dark:bg-neutral-800" />
              <div className="mt-6 space-y-3">
                <div className="h-4 w-full bg-neutral-200 rounded-md dark:bg-neutral-800" />
                <div className="h-4 w-11/12 bg-neutral-200 rounded-md dark:bg-neutral-800" />
              </div>
            </div>
          ) : (
            <>
              <h2 className="  block text-center md:text-left text-xl font-bold  md:text-3xl lg:text-5xl text-black">
                {bannerTitle}
              </h2>
              {bannerDescription && (
                <p className="mt-[20px] md:mt-8 text-center text-[14px] md:text-base text-neutral-600 md:text-left dark:text-neutral-400 mb-[24px]">
                  {bannerDescription}
                </p>
              )}
              <div className="hidden md:grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto relative z-10">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="animate-pulse bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg"
                      >
                        <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      </div>
                    ))
                  : Features.map((feature, index) => (
                      <motion.div
                        key={feature._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 * index,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <Grid size={20} />
                        <div className="relative z-20">
                          <p className="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                            {feature.title}
                          </p>
                          <p className="text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 mt-2 md:mt-4 font-normal">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
              </div>
           <div className="hidden md:block">
               {/* CTA note */}
              {cta?.note && (
                <p className="mt-[40px] italic text-sm text-neutral-600 dark:text-neutral-400 mb-[20px]">
                  {cta?.note}
                </p>
              )}
              <a
                href="https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled"
                target="_blank"
                className="relative flex items-center justify-between px-6 md:px-6 py-1 md:py-2 rounded-full border border-black group overflow-hidden max-w-[400px] h-[fit-content]"
              >
                <span className="flex items-center">
                  <span className="text-[20px] md:text-[32px] font-bold text-black mr-[7px]">
                    Talk to an
                  </span>
                  <TypewriterEffect words={words} />
                </span>

                <span className="relative z-10 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full  text-white bg-[#484AB7]">
                  <ArrowRight className="w-3 h-3 md:w-6 md:h-6" />
                </span>
              </a>
           </div>
            </>
          )}

          {!bannerLoading &&
            (contacts || []).length > 0 &&
            (contacts || []).map((contact, index) => (
              <div
                key={contact.email || index}
                className="my-10 hidden flex-col items-center justify-between w-full gap-4 md:flex-row lg:flex"
              >
                <div>
                  <h5 className="text-black font-semibold">
                    {" "}
                    Also available here:
                  </h5>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {contact.email}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {contact.phone}
                  </p>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-full md:max-w-[250px]">
                  {contact.address}
                </p>
              </div>
            ))}
          {/* <Image
            src="/assets/images/UpdatedMap.png"
            alt="Map"
            width={500}
            height={300}
            className="mt-10 w-full"
          /> */}
          {/* <WorldMapDemo /> */}
        </div>

        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 pt-[30px] pb-[40px] px-[20px] md:px-[40px] dark:from-neutral-900 dark:to-neutral-950">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Honeypot field for bots */}
            <div className="hidden" aria-hidden="true">
              <label>
                Do not fill this field
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formik.values.honeypot}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
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
                <p className="text-red-500 text-sm">{formik.errors.company}</p>
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
                <p className="text-red-500 text-sm">{formik.errors.purpose}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-black mb-[8px]">
                Message (Optional)
              </label>
              <textarea
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
                rows={4}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your message (optional)"
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm">{formik.errors.message}</p>
              )}
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-3 text-black text-[15px]">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formik.values.privacyConsent}
                  onChange={formik.handleChange}
                  className="mt-1 flex-shrink-0"
                />
                <span>
                  I agree to the processing of my data as described in the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="underline hover:no-underline text-[#484AB7]"
                  >
                    Privacy Notice
                  </a>
                  . <span className="text-[#ff0000]">*</span>
                </span>
              </label>
              {formik.touched.privacyConsent &&
                formik.errors.privacyConsent && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.privacyConsent}
                  </p>
                )}
            </div>

            {/* Marketing Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 text-black text-[15px]">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formik.values.marketingConsent}
                  onChange={formik.handleChange}
                  className="mt-1 flex-shrink-0"
                />
                <span>
                  Send me updates about tools and resources (optional)
                </span>
              </label>
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
              className="w-full bg-[#484AB7] text-white border-neutral-200 px-2 rounded-xl max-w-[185px] h-[45px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          {success && (
            <div className="bg-green-100 p-4 rounded text-black mt-4">
              Thanks — we will reply within one business day.
            </div>
          )}
        </div>
         <div className=" md:hidden flex flex-col items-center">
               {/* CTA note */}
              {cta?.note && (
                <p className="mt-[40px] italic text-[14px] md:text-sm text-center md:text-left text-neutral-600 dark:text-neutral-400 mb-[20px]">
                  {cta?.note}
                </p>
              )}
              <a
                href="https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled"
                target="_blank"
                className="relative flex items-center justify-between px-6 md:px-6 py-1 md:py-2 rounded-full border border-black group overflow-hidden max-w-[270px] h-[fit-content]"
              >
                <span className="flex items-center">
                  <span className="text-[20px] md:text-[32px] font-bold text-black mr-[7px]">
                    Talk to an
                  </span>
                  <TypewriterEffect words={words} />
                </span>

                <span className="relative z-10 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full  text-white bg-[#484AB7]">
                  <ArrowRight className="w-3 h-3 md:w-6 md:h-6" />
                </span>
              </a>
           </div>
      </div>
    </div>
  );
};
const Grid = ({ pattern, size }: { pattern?: number[][]; size?: number }) => {
  // Use deterministic coordinates instead of random ones to prevent hydration mismatch
  const p = pattern ?? [
    [7, 1],
    [8, 2],
    [9, 3],
    [7, 4],
    [8, 5],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]: any) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}`}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
export default ContactPage;
