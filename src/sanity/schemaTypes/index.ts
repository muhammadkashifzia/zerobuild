// schemas/index.ts or service0schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service-schema'
import { projectType } from './project-schema'
import { resourceType } from './resource-schema'
import { contactType } from './contact-schema'
import contactSubmission from './contactSubmission-schema';
import { youtubeVideoType } from './youtube-video-schema';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, projectType, resourceType, contactType, contactSubmission, youtubeVideoType],
} 
