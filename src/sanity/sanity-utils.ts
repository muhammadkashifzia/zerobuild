import { createClient, groq } from "next-sanity";
import { Service } from "@/types/Service";
import { Project } from "@/types/Project";
import { Resource } from "@/types/Resource";
import { Contact } from "@/types/Contact";
import { Feature } from "@/types/Feature";
import { Company } from "@/types/Company";
import { ContactPageBanner } from "@/types/Contact";
import { ResourcesPageBanner } from "@/types/resourcesPage";
import clientConfig from "./config/client-config";
import { projectsPageQuery } from "./lib/queries";

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
  accordion[]{
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
    groq`*[_type == "servicesPage" && isActive == true][0] {
      _id,
      title,
      description,
      ctaTitle,
      ctaButtonText,
      ctaButtonLink
    }`
  );
}

export async function getFooterServices(): Promise<Pick<Service, '_id' | 'title' | 'slug' | 'publishedAt'>[]> {
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
      accordion[]{
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

export async function getProjectsPageBanner(): Promise<{ _id: string; title: string; description: string } | null> {
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
      body
    }
  `,
    { slug }
  );
}

export async function getRelatedProjects(currentSlug: string, categories?: string[]): Promise<Project[]> {
  if (!categories || categories.length === 0) {
    return [];
  }

  return createClient(clientConfig).fetch(
    groq`
    *[_type == "project" && slug.current != $currentSlug && count(categories[@ in $categories]) > 0] | order(publishedAt desc)[0...4] {
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

/* Resources */
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
      body
    }
  `,
    { slug }
  );
}

export async function getRelatedResources(currentSlug: string, purpose?: string[], focusArea?: string[]): Promise<Resource[]> {
  if ((!purpose || purpose.length === 0) && (!focusArea || focusArea.length === 0)) {
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

/* Contact */
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
      "contacts": coalesce(contacts[]{
        address,
        phone,
        email,
      }, []),
      isActive
    }`
  );
}

/* Features */
export async function getFeatures(): Promise<Feature[]> {
  try {
    console.log('Fetching features from Sanity...');
    const features = await createClient(clientConfig).fetch(
      groq`*[_type == "feature"] | order(order asc) {
        _id,
        _createdAt,
        title,
        description,
        icon,
        logoColors{
          primaryColor,
          secondaryColor,
          gradientDirection
        },
        order,
        isActive
      }`
    );
    console.log('Features fetched:', features);
    return features;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
}

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
