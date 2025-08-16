# Company Information Setup Guide

This guide explains how to set up dynamic company information in the footer using Sanity Studio.

## What's Been Added

1. **Company Schema** (`src/sanity/schemaTypes/company-schema.ts`)
   - Company name
   - Footer description
   - Company tagline
   - Active status

2. **Company Type** (`src/types/Company.ts`)
   - TypeScript interface for company data

3. **Sanity Utils** (`src/sanity/sanity-utils.ts`)
   - `getCompanyInfo()` function to fetch company data

4. **Dynamic Footer** (`src/components/Footer.tsx`)
   - Company name in header
   - Dynamic footer description
   - Dynamic copyright notice

## Setup Instructions

### 1. Access Sanity Studio

Navigate to your Sanity Studio at `/studio` in your application.

### 2. Create Company Document

1. In Sanity Studio, you'll see a new "Company Information" document type
2. Click "Create new" and select "Company Information"
3. Fill in the following fields:
   - **Company Name**: `ZeroBuild`
   - **Footer Description**: `ZeroBuild accelerates the decarbonisation of the built environment by empowering architects, engineers, developers, local authorities, and housing associations to achieve Net Zero faster.`
   - **Company Tagline**: `Accelerating Net Zero in the Built Environment` (optional)
   - **Active**: Check this box to enable the company information

### 3. Save and Publish

1. Click "Publish" to make the changes live
2. The footer will now display the dynamic company information

## Sample Data

You can also import the sample data from `sample-company-data.json`:

```json
{
  "_type": "company",
  "name": "ZeroBuild",
  "footerDescription": "ZeroBuild accelerates the decarbonisation of the built environment by empowering architects, engineers, developers, local authorities, and housing associations to achieve Net Zero faster.",
  "tagline": "Accelerating Net Zero in the Built Environment",
  "isActive": true
}
```

## Features

- **Dynamic Company Name**: Updates in both the header and copyright
- **Dynamic Footer Description**: Customizable company description
- **Fallback Content**: Shows default content if no company data is available
- **Loading States**: Smooth loading experience while fetching data
- **Error Handling**: Graceful error handling if data fails to load

## Benefits

1. **Content Management**: Non-technical users can update company information
2. **Consistency**: Company information is managed in one place
3. **Flexibility**: Easy to update company details without code changes
4. **Performance**: Optimized queries fetch only necessary data
5. **SEO**: Dynamic content can be updated for different markets or campaigns

## Troubleshooting

- **No company data showing**: Check if the company document is published and `isActive` is checked
- **Loading stuck**: Check browser console for any API errors
- **Schema not visible**: Restart your development server after adding the new schema

