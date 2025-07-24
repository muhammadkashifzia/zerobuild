// schemas/index.ts or service0schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType],
} 
