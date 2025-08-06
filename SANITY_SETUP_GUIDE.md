# Sanity CMS Setup Guide for Dynamic Hero and Performance Sections

## Overview
I've successfully made your hero section and performance section dynamic using Sanity CMS. Here's how to set up and manage the content.

## New Sanity Schemas Added

### 1. Hero Section Schema (`hero-schema.ts`)
- **Title**: Main heading text
- **Title Highlight Words**: Array of words that rotate in the title (e.g., "faster", "smarter", "simpler", "better")
- **Description**: Subtitle text below the main heading
- **Primary Button**: Text and link for the main CTA button
- **Secondary Button**: Text and link for the secondary button
- **Is Active**: Boolean to control which hero section is displayed

### 2. Performance Section Schema (`performance-schema.ts`)
- **Main Title**: Large heading text above the graph
- **Description**: Descriptive text below the main title
- **Is Active**: Boolean to control which performance section is displayed
- **Note**: Chart buttons are static and cannot be modified through Sanity

## How to Add Content in Sanity Studio

### Step 1: Access Sanity Studio
1. Navigate to your Sanity Studio (usually at `/studio` on your site)
2. Log in with your Sanity credentials

### Step 2: Create Hero Section Content
1. In the left sidebar, click on "Hero Section"
2. Click "Create new document"
3. Fill in the fields:
   - **Title**: "Building decarbonisation is complex<br/>We make it 10×"
   - **Title Highlight Words**: Add array items: "faster", "smarter", "simpler", "better"
   - **Description**: "Take the guesswork out of Net Zero. We give you the clarity and tools to design high-performing, low-carbon buildings with confidence."
   - **Primary Button**:
     - Text: "Get a Demo"
     - Link: "/contact" (or your preferred demo page)
   - **Secondary Button**:
     - Text: "Accelerate Your Project"
     - Link: "/services" (or your preferred services page)
   - **Is Active**: Check this box to make it the active hero section
4. Click "Publish"

### Step 3: Create Performance Section Content
1. In the left sidebar, click on "Performance Section"
2. Click "Create new document"
3. Fill in the fields:
   - **Main Title**: "Designing a whole life Net Zero option has never been easier. Explore how our client used our Five C Zero Framework to evaluate 1000+ design options in under 24 hours, unlocking smarter decisions from day one."
   - **Description**: "Choose what matters most and let us the rest. Whether new build or retrofit, we help you prioritise what drives your project: Compliance, Comfort, Cost. Carbon. Circularity."
   - **Is Active**: Check this box to make it the active performance section
4. Click "Publish"

## Features

### Skeleton Loading
- Beautiful animated skeleton loading states while content is being fetched from Sanity
- Smooth transitions from skeleton to actual content
- Provides excellent user experience during loading

### Error Handling
- Graceful error handling if Sanity is unavailable
- Components show skeleton loading instead of breaking
- Console logging for debugging purposes

### Multiple Content Versions
- You can create multiple hero and performance sections
- Only the one marked as "Is Active" will be displayed
- This allows for A/B testing or seasonal content changes

### Static Chart Buttons
- Chart buttons are now static and cannot be modified through Sanity
- Cost and Carbon buttons remain locked and non-clickable
- Other buttons (Comfort, Compliance, Circularity) are fully interactive

## Code Changes Made

### New Files Created:
- `src/sanity/schemaTypes/hero-schema.ts`
- `src/sanity/schemaTypes/performance-schema.ts`
- `src/types/hero.ts`
- `src/types/performance.ts`
- `src/utils/hero.ts`
- `src/utils/performance.ts`
- `src/components/shimmer/HeroSkeleton.tsx`
- `src/components/shimmer/PerformanceSkeleton.tsx`

### Files Modified:
- `src/sanity/schemaTypes/index.ts` - Added new schemas
- `src/sanity/lib/queries.ts` - Added GROQ queries
- `src/components/HeroSection.tsx` - Made dynamic
- `src/components/PerformanceSection.tsx` - Made dynamic
- `src/app/page.tsx` - Added data fetching

## Benefits

1. **Content Management**: Non-technical users can update hero and performance content without touching code
2. **Flexibility**: Easy to test different messaging and CTAs
3. **Scalability**: Can create multiple versions for different campaigns or seasons
4. **Performance**: Content is fetched at build time for optimal performance
5. **Fallback Safety**: Original content remains as fallback if Sanity is unavailable

## Next Steps

1. Deploy your changes
2. Access Sanity Studio and add the content as described above
3. Test that the dynamic content displays correctly
4. Consider making other sections dynamic (ServiceSection, CtaSection, etc.) using the same pattern

## Troubleshooting

- If content doesn't appear, check that you've marked a document as "Is Active"
- If you see the fallback content, verify your Sanity connection and that content exists
- Check the browser console for any Sanity-related errors 