// schemas/contactSubmission.ts
import { defineType } from 'sanity';

const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'purpose',
      title: 'Purpose',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'role',
      title: 'Contacting As',
      type: 'string',
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    },
  ],
});

export default contactSubmission;
