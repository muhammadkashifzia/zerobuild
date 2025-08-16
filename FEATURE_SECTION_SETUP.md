# Dynamic FeatureSection Setup with Sanity CMS

## Overview
The FeatureSection component has been updated to be dynamic using Sanity CMS. Instead of hardcoded features, you can now manage all your features through the Sanity Studio.

## What's New

### 1. Sanity Schema
- **File**: `src/sanity/schemaTypes/feature-schema.ts`
- **Fields**:
  - `title`: Feature title (required)
  - `description`: Feature description (required)
  - `icon`: Optional icon identifier
  - `order`: Display order (lower numbers appear first)
  - `isActive`: Toggle to show/hide features

### 2. TypeScript Types
- **File**: `src/types/Feature.ts`
- **Interface**: `Feature` with all Sanity fields

### 3. Data Fetching
- **File**: `src/sanity/sanity-utils.ts`
- **Function**: `getFeatures()` - fetches active features ordered by display order

### 4. Updated Components
- **`FeaturesSectionDemo`**: Async server component that fetches data from Sanity
- **`FeaturesSectionClient`**: Client component that accepts features as props

## Usage

### Server Component (Recommended)
```tsx
import { FeaturesSectionDemo } from "@/components/FeatureSection";

export default function Page() {
  return <FeaturesSectionDemo />;
}
```

### Client Component
```tsx
import { FeaturesSectionClient } from "@/components/FeatureSection";
import { getFeatures } from "@/sanity/sanity-utils";

export default async function Page() {
  const features = await getFeatures();
  
  return <FeaturesSectionClient features={features} />;
}
```

## Setting Up Features in Sanity

1. **Access Sanity Studio**: Navigate to `/studio` in your app
2. **Create Features**: Go to the "Feature" section and create new features
3. **Set Order**: Use the `order` field to control display sequence
4. **Toggle Active**: Use `isActive` to show/hide features without deleting them

## Sample Data
Use the `sample-features.json` file to import initial features into Sanity:
1. In Sanity Studio, go to the Feature collection
2. Use the import functionality or manually create features using the sample data

## Benefits

- **Content Management**: Non-developers can update features through Sanity Studio
- **Flexibility**: Easy to add, remove, or reorder features
- **Performance**: Server-side rendering with Sanity's optimized queries
- **Scalability**: No need to redeploy for content changes
- **Version Control**: Sanity provides content versioning and rollback

## Migration Notes

- The hardcoded `grid` array has been removed
- The component is now async and fetches data from Sanity
- All existing functionality (Grid patterns, styling) remains the same
- Features are automatically ordered by the `order` field

## Troubleshooting

- **No Features Displaying**: Check if features are marked as `isActive: true`
- **Wrong Order**: Verify the `order` field values in Sanity
- **Build Errors**: Ensure the Sanity schema is properly imported in `schemaTypes/index.ts`
