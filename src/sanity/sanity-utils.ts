import { createClient, groq } from "next-sanity";
import { AboutPage } from "@/types/aboutPage";
import { Service, CtaBox } from "@/types/Service";
import { Project } from "@/types/Project";
import { Resource } from "@/types/Resource";
import { Contact } from "@/types/Contact";
import { Feature } from "@/types/Feature";
import { FeatureHeading } from "@/types/Feature";
import { Company } from "@/types/Company";
import { ContactPageBanner } from "@/types/Contact";
import { ResourcesPageBanner } from "@/types/resourcesPage";
import { CopyRight } from "@/types/Footer"
import { ProjectsBanner } from "@/types/Project"
import clientConfig from "./config/client-config";
import { projectsPageQuery } from "./lib/queries";
import { WorldMapHeader, TestimonialSlider, CTAButton } from "@/types/home";

const createSanityClient = () => {
  return createClient({
    ...clientConfig,
    useCdn: false,
    perspective: 'published' as const, 
  });
};

const defaultFetchOptions = {
  cache: 'no-store' as const,
  next: { 
    revalidate: 0,
    tags: [] 
  }
};

/* ---------------- About ---------------- */
export async function getAbout(): Promise<AboutPage[]> {
  const startTime = Date.now();
  
  try {
    console.log('🔄 [getAbout] Starting fetch from Sanity...');
    console.log('🔧 [getAbout] Client config:', {
      projectId: clientConfig.projectId,
      dataset: clientConfig.dataset,
      useCdn: clientConfig.useCdn,
      hasToken: !!clientConfig.token,
      apiVersion: clientConfig.apiVersion
    });

    const client = createSanityClient();
    
    const result = await client.fetch(
      groq`*[_type == "about"] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        description,
          introContent[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata { 
            dimensions { width, height }
          }
        }
      }
    },
        mainHeading,
        newBuildButtonText,
        retrofitSelectorButtonText,
        retrofitButtonText,
        newBuildIntroText,
        newBuildSummaryText,
        newBuildResultText,
        newBuildResultCta { 
          text, 
          link 
        },
        retrofitIntroText,
        retrofitContent,
        retrofitSlider[] {
          image {
            asset-> {
              _id,
              url,
              metadata { 
                dimensions { 
                  width, 
                  height 
                } 
              }
            }
          },
          altText
        },
        retrofitResultText,
        retrofitButtonText,
        retrofitButtonUrl,
        profileImage {
          asset-> {
            _id,
            url,
            metadata { 
              dimensions { 
                width, 
                height 
              } 
            }
          },
          alt
        },
        profileName,
        profileTitle,
        profileBio,
        contactButtonText,
        contactButtonUrl,
        linkedinUrl,
        linkedinButtonText,
        globallyTitle,
        globallyDescription
      }`,
      {},
      {
        ...defaultFetchOptions,
        perspective: 'published',
      }
    );

    const duration = Date.now() - startTime;
    
    console.log('✅ [getAbout] Data fetched successfully:', {
      count: result?.length || 0,
      duration: `${duration}ms`,
      lastUpdated: result?.[0]?._updatedAt,
      timestamp: new Date().toISOString()
    });

    if (!result || result.length === 0) {
      console.warn('⚠️ [getAbout] No data returned from Sanity');
      return [];
    }

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ [getAbout] Error fetching About data:', {
      error: error instanceof Error ? error.message : error,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

/* ---------------- SERVICES ---------------- */
export async function getServices(): Promise<Service[]> {
  try {
    console.log('🔄 [getServices] Fetching services...');
    
    const result = await createSanityClient().fetch(
      groq`*[_type == "service"] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
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
      }`,
      {},
      defaultFetchOptions
    );

    console.log('✅ [getServices] Services fetched:', result?.length || 0);
    return result || [];
  } catch (error) {
    console.error('❌ [getServices] Error:', error);
    return [];
  }
}

export async function getServicesPageBanner() {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "servicesBanner" && isActive == true] | order(_updatedAt desc) [0] {
        _id,
        _updatedAt,
        title,
        description,
      }`,
      {},
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getServicesPageBanner] Error:', error);
    return null;
  }
}

export async function getServicesCTABox(): Promise<CtaBox[]> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "ctaSidebarBox"] | order(_updatedAt desc) {
        _updatedAt,
        ctaTitle,
        ctaButtonText,
        ctaButtonLink,
      }`,
      {},
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getServicesCTABox] Error:', error);
    return [];
  }
}

export async function getFooterServices(): Promise<
  Pick<Service, "_id" | "title" | "slug" | "publishedAt">[]
> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "service"] | order(publishedAt desc)[0...6] {
        _id,
        title,
        slug,
        publishedAt
      }`,
      {},
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getFooterServices] Error:', error);
    return [];
  }
}

export async function getService(slug: string): Promise<Service> {
  try {
    const result = await createSanityClient().fetch(
      groq`
      *[_type == "service" && slug.current == $slug][0] {
        _updatedAt,
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
      { slug },
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getService] Error:', error);
    throw error;
  }
}

/* ---------------- PROJECTS ---------------- */
export async function getProjects(): Promise<Project[]> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "project"] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        "slug": slug.current,
        publishedAt,
        image { asset->{url} },
        description,
        location,
        categories,
        "gallery": gallery[].asset->url,
        body
      }`,
      {},
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getProjects] Error:', error);
    return [];
  }
}


export async function getProjectsBanner(): Promise<ProjectsBanner | null> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "projectsPage" && isActive == true] | order(_updatedAt desc) [0] {
        _id,
        _updatedAt,
        title,
        description,
      }`,
      {},
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getProjectsBanner] Error:', error);
    return null;
  }
}

export async function getProject(slug: string): Promise<Project> {
  try {
    const result = await createSanityClient().fetch(
      groq`
      *[_type == "project" && slug.current == $slug][0] {
        _updatedAt,
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
      { slug },
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getProject] Error:', error);
    throw error;
  }
}

export async function getRelatedProjects(
  currentSlug: string,
  categories?: string[]
): Promise<Project[]> {
  if (!categories || categories.length === 0) {
    return [];
  }

  try {
    const result = await createSanityClient().fetch(
      groq`
      *[_type == "project" && slug.current != $currentSlug && count(categories[@ in $categories]) > 0] 
      | order(publishedAt desc)[0...4] {
        _id,
        _updatedAt,
        title,
        "slug": slug.current,
        publishedAt,
        image { asset->{url} },
        description,
        categories
      }
    `,
      { currentSlug, categories },
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getRelatedProjects] Error:', error);
    return [];
  }
}

/* ---------------- RESOURCES ---------------- */
export async function getResources(): Promise<Resource[]> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "resource"] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        publishedAt,
        image { asset->{url} },
        description,
        purpose,
        focusArea,
        gallery[]{ asset->{url} },
        body
      }`,
      {},
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getResources] Error:', error);
    return [];
  }
}

export async function getResource(slug: string): Promise<Resource> {
  try {
    const result = await createSanityClient().fetch(
      groq`
      *[_type == "resource" && slug.current == $slug][0] {
        _updatedAt,
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
      { slug },
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getResource] Error:', error);
    throw error;
  }
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

  try {
    const result = await createSanityClient().fetch(
      groq`
        *[_type == "resource" && slug.current != $currentSlug && (
          count(purpose[@ in $purpose]) > 0 || count(focusArea[@ in $focusArea]) > 0
        )] | order(publishedAt desc)[0...4] {
          _id,
          _updatedAt,
          title,
          "slug": slug.current,
          publishedAt,
          image { asset->{url} },
          description,
          purpose,
          focusArea
        }
      `,
      { currentSlug, purpose, focusArea },
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getRelatedResources] Error:', error);
    return [];
  }
}

export async function getResourcesPageBanner(): Promise<ResourcesPageBanner | null> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "resourcesPage" && isActive == true] | order(_updatedAt desc) [0] {
        _id,
        _updatedAt,
        title,
        description,
        ctaTitle,
        ctaButtonText,
        ctaButtonLink
      }`,
      {},
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getResourcesPageBanner] Error:', error);
    return null;
  }
}

/* ---------------- CONTACT ---------------- */
export async function getContacts(): Promise<Contact[]> {
  try {
    const result = await createSanityClient().fetch(
      groq`coalesce(
        *[_type == "contactPage" && isActive == true][0].contacts[]{ address, phone, email },
        *[_type == "contact"][]{ address, phone, email }
      )`,
      {},
      defaultFetchOptions
    );
    return result || [];
  } catch (error) {
    console.error('❌ [getContacts] Error:', error);
    return [];
  }
}

export async function getContactPageBanner(): Promise<ContactPageBanner | null> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "contactPage" && isActive == true] | order(_updatedAt desc) [0] {
        _id,
        _updatedAt,
        title,
        description,
        cta{ note },
        "contacts": coalesce(contacts[] {
          address,
          phone,
          email,
        }, []),
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getContactPageBanner] Error:', error);
    return null;
  }
}

/* ---------------- FEATURES ---------------- */
export async function getFeatureHeading(): Promise<FeatureHeading[]> {
  try {
    console.log("🔄 [getFeatureHeading] Fetching feature headings from Sanity...");
    const result = await createSanityClient().fetch(
      groq`*[_type == "featureMainHeading"] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        heading,
        description,  
        highlightText,
        order,
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    console.log("✅ [getFeatureHeading] Feature headings fetched:", result?.length || 0);
    return result || [];
  } catch (error) {
    console.error("❌ [getFeatureHeading] Error:", error);
    return [];
  }
}

export async function getFeatures(): Promise<Feature[]> {
  try {
    console.log("🔄 [getFeatures] Fetching features from Sanity...");
    const result = await createSanityClient().fetch(
      groq`*[_type == "feature"] | order(order asc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        description,  
        order,
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    console.log("✅ [getFeatures] Features fetched:", result?.length || 0);
    return result || [];
  } catch (error) {
    console.error("❌ [getFeatures] Error:", error);
    return [];
  }
}

/* ---------------- COMPANY ---------------- */
export async function getCompanyInfo(): Promise<Company | null> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "company" && isActive == true] | order(_updatedAt desc) [0] {
        _id,
        _updatedAt,
        name,
        footerDescription,
        tagline,
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    return result;
  } catch (error) {
    console.error('❌ [getCompanyInfo] Error:', error);
    return null;
  }
}

/* ---------------- World Map  ---------------- */
export async function getWorldMapHeading(): Promise<WorldMapHeader[]> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "worldMapHeading" && isActive == true] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        mainheading,
        bluehighlight,
        subtext,  
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    console.log("✅ [getWorldMapHeading] World map heading fetched:", result?.length || 0);
    return result || [];
  } catch (error) {
    console.error("❌ [getWorldMapHeading] Error:", error);
    return [];
  }
}

/* ---------------- Testimonial ---------------- */
export async function getTestimonialSlider(): Promise<TestimonialSlider[]> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "testimonialSlider" && isActive == true] | order(_updatedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
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
      }`,
      {},
      defaultFetchOptions
    );
    console.log("✅ [getTestimonialSlider] Testimonial Slider fetched:", result?.length || 0);
    return result || [];
  } catch (error) {
    console.error("❌ [getTestimonialSlider] Error:", error);
    return [];
  }
}

export async function getCTA(): Promise<CTAButton | null> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "cta" && isActive == true] | order(_updatedAt desc) [0]{
        _id,
        _createdAt,
        _updatedAt,
        title,
        subtext,
        ctabtntext,
        ctabtntextanimation,
        ctabtnurl,
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    return result || null;
  } catch (error) {
    console.error("❌ [getCTA] Error:", error);
    return null;
  }
}



export async function getCopyRight(): Promise<CopyRight | null> {
  try {
    const result = await createSanityClient().fetch(
      groq`*[_type == "copyright" && isActive == true]{
        _id,
        _createdAt,
        _updatedAt,
        text,
        isActive
      }`,
      {},
      defaultFetchOptions
    );
    return result || null;
  } catch (error) {
    console.error("❌ [getCopyRight] Error:", error);
    return null;
  }
}





