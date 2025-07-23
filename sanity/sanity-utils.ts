import { createClient, groq } from "next-sanity";
import { Service } from "@/types/Service";
import clientConfig from './config/client-config'


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
  )
}

export async function getService(slug: string): Promise<Service> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "service" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
    { slug }
  )
}




