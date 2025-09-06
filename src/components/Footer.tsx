"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  getContacts,
  getFooterServices,
  getCompanyInfo,
  getCopyRight,
} from "@/sanity/sanity-utils";
import { Contact } from "@/types/Contact";
import { Service } from "@/types/Service";
import { Company } from "@/types/Company";
import { CopyRight } from "@/types/Footer";

import {
  IconBrandGithub,
  IconBrandX,
  IconBrandFacebook,
  IconBrandBluesky,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
} from "@tabler/icons-react";

// ✅ Reusable Skeleton component (span inside <p>, div elsewhere)
const Skeleton = ({
  className,
  inline = false,
}: {
  className: string;
  inline?: boolean;
}) =>
  inline ? (
    <span
      className={`inline-block animate-pulse bg-gray-200 rounded-md ${className}`}
    />
  ) : (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );

function Footer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [copyright, setCopyright] = useState<CopyRight | null>(null);
  const [services, setServices] = useState<
    Pick<Service, "_id" | "title" | "slug" | "publishedAt">[]
  >([]);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const links = [
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com/zerobuild.io",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/company/zero-build/",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/zerobuild.io/",
    },
    {
      title: "Twitter / X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/zerobuild_io",
    },
    {
      title: "YouTube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.youtube.com/@ZeroBuild-io",
    },
    {
      title: "Bluesky",
      icon: (
        <IconBrandBluesky className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://bsky.app/profile/zerobuild.bsky.social",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Zero-Build",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [contactsRes, servicesRes, companyRes, copyrightRes] =
          await Promise.all([
            getContacts(),
            getFooterServices(),
            getCompanyInfo(),
            getCopyRight(),
          ]);
        setContacts(contactsRes || []);
        setServices(servicesRes || []);
        setCompanyInfo(companyRes || null);
        setCopyright(copyrightRes || null);
      } catch (error) {
        console.error("Error fetching footer data:", error);
        setError("Failed to load footer data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-[#fafafa] text-[#332f2f] pt-12 border-t border-gray-200">
      <div className="mx-auto flex container px-[16px] flex-col items-start justify-between text-sm text-neutral-500 md:flex-row">
        {/* Company Info */}
        <div>
          <h2 className="text-black text-lg font-semibold mb-4 flex gap-2 items-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            <Image
              src="/assets/images/5CZLogo.png"
              width={22}
              height={22}
              alt="ZeroBuild logo"
              className="w-[22px] h-[22px] object-contain"
            />
            {isLoading ? (
              <Skeleton className="h-5 w-28" inline />
            ) : (
              companyInfo?.name || "ZeroBuild"
            )}
          </h2>
          <p className="max-w-full md:max-w-[350px]">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-full mb-2" inline />
                <Skeleton className="h-4 w-[80%]" inline />
              </>
            ) : (
              companyInfo?.footerDescription ||
              "ZeroBuild accelerates the decarbonisation of the built environment by empowering architects, engineers, developers, local authorities, and housing associations to achieve Net Zero faster."
            )}
          </p>
          <ul className="text-sm mt-4 flex flex-col justify-center space-y-4">
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility Statement</Link>
            </li>
          </ul>
        </div>

        {/* Links + Services + Contact */}
        <div className="max-w-full md:max-w-[520px]">
          <div className="mt-10 flex items-start gap-5 md:mt-0 flex-wrap md:flex-nowrap">
            {/* Quick Links */}
            <div className="w-[47%] md:w-[22%]">
              <h2 className="text-black text-lg font-semibold mb-4">
                Quick Links
              </h2>
              <ul className="text-sm mt-4 flex flex-col justify-center space-y-4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="w-[47%] md:w-[26%]">
              <h2 className="text-black text-lg font-semibold mb-4">
                Our Services
              </h2>
              <ul className="text-sm mt-4 flex flex-col justify-center space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[60%]" />
                  </>
                ) : error ? (
                  <li>
                    <span className="text-red-400">{error}</span>
                  </li>
                ) : services.length > 0 ? (
                  services.slice(0, 4).map((service) => (
                    <li key={service._id}>
                      <Link
                        href={`/services/${service.slug.current}`}
                        className="hover:text-black transition-colors duration-300"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="text-gray-400">No services available</span>
                  </li>
                )}
                <li>
                  <Link
                    href="/services"
                    className="hover:text-black transition-colors duration-300"
                  >
                    View all Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="w-full md:w-[46%]">
              <h2 className="text-black text-lg font-semibold mb-4">
                Contact Us
              </h2>
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-[90%] mb-2" />
                  <Skeleton className="h-4 w-[70%] mb-2" />
                  <Skeleton className="h-4 w-[50%]" />
                </>
              ) : contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <div
                    key={`contact-${index}`}
                    className="text-sm mt-4 flex flex-col justify-center space-y-2"
                  >
                    {contact.address && <p>{contact.address}</p>}
                    {contact.email && <p>Email: {contact.email}</p>}
                    {contact.phone && <p>Phone: {contact.phone}</p>}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  No contact information available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-14 pb-4">
        <FloatingDock mobileClassName="translate-y-20" items={links} />
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs pb-10">
        <p className="text-black">
          {isLoading ? (
            <Skeleton className="h-3 w-48 mx-auto" inline />
          ) : (
            copyright?.name ||
            `© ${new Date().getFullYear()} ZeroBuild. All rights reserved.`
          )}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
