import { createClient, groq } from "next-sanity";
import { Service, CtaBox } from "@/types/Service";
import { Project } from "@/types/Project";
import { Resource } from "@/types/Resource";
import { Contact } from "@/types/Contact";
import { Feature } from "@/types/Feature";
import { FeatureHeading } from "@/types/Feature";
import { Company } from "@/types/Company";
import { ContactPageBanner } from "@/types/Contact";
import { ResourcesPageBanner } from "@/types/resourcesPage";
import clientConfig from "./config/client-config";
import { projectsPageQuery, aboutPageQuery } from "./lib/queries";
import { WorldMapHeader, TestimonialSlider, CTAButton } from "@/types/home";


/* ---------------- SERVICES ---------------- */
export async function getServices(): Promise<Service[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "service"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      "image": image.asset->url,
      description,
      disciplines,
      projectStage,
      "gallery": gallery[].asset->url,
      body,
      accordion[] {
        _key,
        title,
        content,
        isOpen
      }
    }`
  );
}

export async function getServicesPageBanner() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "servicesBanner" && isActive == true][0] {
      _id,
      title,
      description,
    }`
  );
}
export async function getServicesCTABox(): Promise<CtaBox[]> {
  return createClient(clientConfig).fetch(
    `*[_type == "ctaSidebarBox"]{
      ctaTitle,
      ctaButtonText,
      ctaButtonLink,
    }`
  );
}
export async function getFooterServices(): Promise<
  Pick<Service, "_id" | "title" | "slug" | "publishedAt">[]
> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "service"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      slug,
      publishedAt
    }`
  );
}

export async function getService(slug: string): Promise<Service> {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "service" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      image { asset->{url} },
      description,
      disciplines,
      projectStage,
      gallery[]{ asset->{url} },
      body,
      accordion[] {
        _key,
        title,
        content,
        isOpen
      }
    }
  `,
    { slug }
  );
}

/* ---------------- PROJECTS ---------------- */
export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      image { asset->{url} },
      description,
      location,
      categories,
      "gallery": gallery[].asset->url,
      body
    }`
  );
}

export async function getProjectsPageBanner(): Promise<{
  _id: string;
  title: string;
  description: string;
} | null> {
  return createClient(clientConfig).fetch(projectsPageQuery);
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "project" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      image { asset->{url} },
      description,
      location,
      categories,
      gallery[]{ asset->{url} },
      body,
      accordion[] {
        _key,
        title,
        content,
        isOpen
      }
    }
  `,
    { slug }
  );
}

export async function getRelatedProjects(
  currentSlug: string,
  categories?: string[]
): Promise<Project[]> {
  if (!categories || categories.length === 0) {
    return [];
  }

  return createClient(clientConfig).fetch(
    groq`
    *[_type == "project" && slug.current != $currentSlug && count(categories[@ in $categories]) > 0] 
    | order(publishedAt desc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      image { asset->{url} },
      description,
      categories
    }
  `,
    { currentSlug, categories }
  );
}

/* ---------------- RESOURCES ---------------- */
export async function getResources(): Promise<Resource[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "resource"]{
      _id,
      _createdAt,
      title,
      slug,
      publishedAt,
      image { asset->{url} },
      description,
      purpose,
      focusArea,
      gallery[]{ asset->{url} },
      body
    }`
  );
}

export async function getResource(slug: string): Promise<Resource> {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "resource" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      image { asset->{url} },
      description,
      purpose,
      focusArea,
      gallery[]{ asset->{url} },
      body,
      accordion[] {
        _key,
        title,
        content,
        isOpen
      }
    }
  `,
    { slug }
  );
}

export async function getRelatedResources(
  currentSlug: string,
  purpose?: string[],
  focusArea?: string[]
): Promise<Resource[]> {
  if (
    (!purpose || purpose.length === 0) &&
    (!focusArea || focusArea.length === 0)
  ) {
    return [];
  }

  return createClient(clientConfig).fetch(
    groq`
      *[_type == "resource" && slug.current != $currentSlug && (
        count(purpose[@ in $purpose]) > 0 || count(focusArea[@ in $focusArea]) > 0
      )] | order(publishedAt desc)[0...4] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        image { asset->{url} },
        description,
        purpose,
        focusArea
      }
    `,
    { currentSlug, purpose, focusArea }
  );
}

export async function getResourcesPageBanner(): Promise<ResourcesPageBanner | null> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "resourcesPage" && isActive == true][0] {
      _id,
      title,
      description,
      ctaTitle,
      ctaButtonText,
      ctaButtonLink
    }`
  );
}

/* ---------------- CONTACT ---------------- */
export async function getContacts(): Promise<Contact[]> {
  return createClient(clientConfig).fetch(
    groq`coalesce(
      *[_type == "contactPage" && isActive == true][0].contacts[]{ address, phone, email },
      *[_type == "contact"][]{ address, phone, email }
    )`
  );
}

export async function getContactPageBanner(): Promise<ContactPageBanner | null> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "contactPage" && isActive == true][0] {
      _id,
      title,
      description,
      cta{ note },
      "contacts": coalesce(contacts[] {
        address,
        phone,
        email,
      }, []),
      isActive
    }`
  );
}

/* ---------------- FEATURES ---------------- */

export async function getFeatureHeading(): Promise<FeatureHeading[]> {
  try {
    console.log("Fetching features from Sanity...");
    const featureHeading = await createClient(clientConfig).fetch(
      groq`*[_type == "featureMainHeading"] {
        _id,
        _createdAt,
        heading,
        description,  
        highlightText,
        order,
        isActive
      }`
    );
    console.log("Features fetched:", featureHeading);
    return featureHeading;
  } catch (error) {
    console.error("Error fetching features:", error);
    throw error;
  }
}
export async function getFeatures(): Promise<Feature[]> {
  try {
    console.log("Fetching features from Sanity...");
    const features = await createClient(clientConfig).fetch(
      groq`*[_type == "feature"] | order(order asc) {
        _id,
        _createdAt,
        title,
        description,  
        order,
        isActive
      }`
    );
    console.log("Features fetched:", features);
    return features;
  } catch (error) {
    console.error("Error fetching features:", error);
    throw error;
  }
}

/* ---------------- COMPANY ---------------- */
export async function getCompanyInfo(): Promise<Company | null> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "company" && isActive == true][0] {
      _id,
      name,
      footerDescription,
      tagline,
      isActive
    }`
  );
}

/* ---------------- ABOUT PAGE ---------------- */
export async function getAboutPage() {
  return createClient(clientConfig).fetch(aboutPageQuery);
}

/* ---------------- World Map  ---------------- */
export async function getWorldMapHeading(): Promise<WorldMapHeader[]> {
  try {
    const mapHeading = await createClient(clientConfig).fetch(
      groq`*[_type == "worldMapHeading" && isActive == true] {
        _id,
        _createdAt,
        mainheading,
        bluehighlight,
        subtext,  
        isActive
      }`
    );
    console.log("worldMap fetched:", mapHeading);
    return mapHeading;
  } catch (error) {
    console.error("Error fetching worldMap:", error);
    throw error;
  }
}

/* ---------------- Testimonial ---------------- */
export async function getTestimonialSlider(): Promise<TestimonialSlider[]> {
  try {
    const sliders = await createClient(clientConfig).fetch(
      groq`*[_type == "testimonialSlider" && isActive == true] {
        _id,
        _createdAt,
        title,
        address,
        description,  
        isActive,
        image {
          asset->{
            _id,
            url,
            metadata { 
              dimensions, 
              lqip 
            }
          },
          alt
        }
      }`
    );
    console.log("✅ Testimonial Slider fetched:", sliders);
    return sliders;
  } catch (error) {
    console.error("❌ Error fetching Testimonial Slider:", error);
    throw error;
  }
}

export async function getCTA(): Promise<CTAButton | null> {
  try {
    const data = await createClient(clientConfig).fetch(
      `*[_type == "cta" && isActive == true][0]{
        _id,
        _createdAt,
        title,
        subtext,
        ctabtntext,
        ctabtntextanimation,
        ctabtnurl,
        isActive
      }`
    );
    return data || null;
  } catch (error) {
    console.error("Error fetching CTA:", error);
    return null;
  }
}