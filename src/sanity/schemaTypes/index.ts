// schemas/index.ts or service0schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service-schema'
import { projectType } from './project-schema'
import { resourceType } from './resource-schema'
import contactSubmission from './contactSubmission-schema';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, projectType, resourceType, contactSubmission],
} 
