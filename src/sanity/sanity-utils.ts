import { createClient, groq } from "next-sanity";
import { Service } from "@/types/Service";
import { Project } from "@/types/Project";
import { Resource } from "@/types/Resource";
import clientConfig from "./config/client-config";

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
  categories,
  "gallery": gallery[].asset->url,
  body
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
      categories,
      gallery[]{ asset->{url} },
      body
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
  categories,
  "gallery": gallery[].asset->url,
  body
    }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "service" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      image { asset->{url} },
      description,
      categories,
      gallery[]{ asset->{url} },
      body
    }
  `,
    { slug }
  );
}

/* Resources */
export async function getResources(): Promise<Resource[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "resource"]{
  _id,
  _createdAt,
  title,
  publishedAt,
  image { asset->{url} },
  description,
    }`
  );
}
