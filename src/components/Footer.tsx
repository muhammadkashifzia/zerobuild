"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import { getContacts, getFooterServices, getCompanyInfo } from "@/sanity/sanity-utils";
import { Contact } from "@/types/Contact";
import { Service } from "@/types/Service";
import { Company } from "@/types/Company";

import {
  IconBrandGithub,
  IconBrandX,
  IconBrandFacebook,
  IconBrandBluesky,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
} from "@tabler/icons-react";

function Footer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [services, setServices] = useState<Pick<Service, '_id' | 'title' | 'slug' | 'publishedAt'>[]>([]);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const links = [
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Youtube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Bluesky",
      icon: (
        <IconBrandBluesky className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [contactsRes, servicesRes, companyRes] = await Promise.all([
          getContacts(),
          getFooterServices(),
          getCompanyInfo()
        ]);
        setContacts(contactsRes);
        setServices(servicesRes);
        setCompanyInfo(companyRes);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <footer className="bg-[#fafafa] text-[#332f2f] pt-12 border-t border-gray-200">
      <div className="mx-auto flex container px-[16px] flex-col items-start justify-between text-sm text-neutral-500 md:flex-row">
        <div>
          <h2 className="text-black text-lg font-semibold mb-4 flex gap-2 items-center">
            <Image
              src="/assets/images/5CZLogo.png"
              width={22}
              height={22}
              alt="logo"
              className="w-[22px] h-[22px] object-contain"
            />
            {isLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              companyInfo?.name || "ZeroBuild"
            )}{" "}
          </h2>
          <p className="max-w-full md:max-w-[350px]">
            {isLoading ? (
              <span className="text-gray-400">Loading company description...</span>
            ) : (
              companyInfo?.footerDescription || "ZeroBuild accelerates the decarbonisation of the built environment by empowering architects, engineers, developers, local authorities, and housing associations to achieve Net Zero faster."
            )}
          </p>
        </div>
        <div className="max-w-full md:max-w-[520px]">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 items-start gap-5 md:mt-0">
            <div>
              <h2 className="text-black text-lg font-semibold mb-4">
                Quick Links
              </h2>
              <ul className="text-sm mt-4 flex flex-col justify-center space-y-4">
                <li>
                  <Link
                    href="/"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-black transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-black text-lg font-semibold mb-4">
                Our Services
              </h2>
              <ul className="text-sm mt-4 flex flex-col justify-center space-y-4">
                {isLoading ? (
                  <li>
                    <span className="text-gray-400">Loading services...</span>
                  </li>
                ) : error ? (
                  <li>
                    <span className="text-red-400">{error}</span>
                  </li>
                ) : services.length > 0 ? (
                  services.map((service) => (
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
              </ul>
            </div>

            <div>
              <h2 className="text-black text-lg font-semibold mb-4">
                Contact Us
              </h2>
              {contacts.map((contact, index) => (
                <div
                  key={contact.email || index}
                  className="text-sm mt-4 flex flex-col justify-center space-y-4"
                >
                  <p>{contact.address}</p>
                  <p>Email: {contact.email}</p>
                  <p>Phone: {contact.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-14 pb-4">
        {" "}
        <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        />
      </div>
      {/* Footer Bottom */}
      <p className="text-center text-xs pb-10">
        © 2025 {isLoading ? "Loading..." : companyInfo?.name || "ZeroBuild"} Ltd. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
