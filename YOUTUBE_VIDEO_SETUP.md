# YouTube Video Feature Setup Guide

This guide explains how to set up and manage the "Featured by popular YouTubers" section on the ZeroBuild home page using Sanity CMS.

## Overview

The YouTube video feature allows you to:
- Display featured YouTube videos on the home page
- Manage video content through Sanity CMS
- Customize video appearance with different gradient backgrounds
- Control the order and visibility of videos
- Add custom thumbnails for videos

## Features

### 🎥 Video Management
- **YouTube URL Support**: Supports various YouTube URL formats (watch, youtu.be, embed)
- **Automatic Embed Conversion**: Converts YouTube URLs to embed URLs automatically
- **Custom Thumbnails**: Option to upload custom thumbnail images
- **Order Control**: Set display order for videos
- **Active/Inactive Toggle**: Control which videos are displayed

### 🎨 Visual Customization
- **Gradient Backgrounds**: Choose from 8 different gradient color schemes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Hover Effects**: Interactive play button overlay on thumbnails
- **Modern UI**: Clean, professional appearance

### 📱 Responsive Features
- **Mobile-First Design**: Optimized for all screen sizes
- **Aspect Ratio Maintenance**: Videos maintain 16:9 aspect ratio
- **Touch-Friendly**: Easy interaction on mobile devices

## Setup Instructions

### 1. Access Sanity Studio

1. Navigate to your website's studio: `https://yourdomain.com/studio`
2. Log in with your Sanity credentials

### 2. Add YouTube Videos

1. In the Sanity Studio, find the "YouTube Video" content type
2. Click "Create new" to add a new video
3. Fill in the required fields:

#### Required Fields:
- **Video Title**: The title of the video
- **YouTube URL**: Full YouTube URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
- **Channel Name**: Name of the YouTube channel
- **Description**: Brief description (max 200 characters)
- **Background Gradient**: Choose from available color schemes
- **Display Order**: Number for ordering (lower numbers appear first)

#### Optional Fields:
- **Custom Thumbnail**: Upload a custom image (optional)
- **Active**: Toggle to show/hide the video

### 3. Available Gradient Options

- **Indigo**: `from-indigo-500 to-indigo-300`
- **Pink**: `from-pink-500 to-pink-300`
- **Blue**: `from-blue-500 to-blue-300`
- **Purple**: `from-purple-500 to-purple-300`
- **Green**: `from-green-500 to-green-300`
- **Orange**: `from-orange-500 to-orange-300`
- **Red**: `from-red-500 to-red-300`
- **Teal**: `from-teal-500 to-teal-300`

### 4. YouTube URL Formats Supported

The system automatically converts these URL formats to embed URLs:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## Content Management

### Adding New Videos

1. Go to Sanity Studio → YouTube Video
2. Click "Create new"
3. Fill in all required fields
4. Set the display order (1 for first, 2 for second, etc.)
5. Save the video

### Editing Existing Videos

1. Find the video in the YouTube Video list
2. Click on the video to edit
3. Modify any fields as needed
4. Save changes

### Reordering Videos

1. Edit each video's "Display Order" field
2. Lower numbers appear first
3. Save changes to update the order

### Hiding Videos

1. Edit the video
2. Set "Active" to false
3. Save changes

## Technical Details

### Files Created/Modified

1. **Schema**: `src/sanity/schemaTypes/youtube-video-schema.ts`
2. **Queries**: `src/sanity/lib/queries.ts`
3. **Types**: `src/types/youtube.ts`
4. **Utilities**: `src/utils/youtube.ts`
5. **Component**: `src/components/FeaturedYoutube.tsx`
6. **Schema Index**: `src/sanity/schemaTypes/index.ts`

### Data Flow

1. **Sanity CMS** → Stores video data
2. **GROQ Query** → Fetches active videos ordered by display order
3. **YouTube Utils** → Converts URLs to embed format
4. **Component** → Renders videos with styling and interactions

### Performance Optimizations

- **CDN Caching**: Sanity client uses CDN for fast content delivery
- **Image Optimization**: Sanity image URLs are optimized automatically
- **Lazy Loading**: Videos load only when needed
- **Fallback Handling**: Graceful handling of invalid URLs

## Troubleshooting

### Common Issues

1. **Video Not Displaying**
   - Check if "Active" is set to true
   - Verify YouTube URL is valid
   - Check display order is set

2. **Video Not Embedding**
   - Ensure YouTube URL is in supported format
   - Check if video is public and embeddable
   - Verify URL doesn't contain extra parameters

3. **Thumbnail Not Showing**
   - Check if custom thumbnail is uploaded
   - Verify image format is supported (JPG, PNG, WebP)
   - Ensure image file size is reasonable

### Error Handling

The component includes error handling for:
- Invalid YouTube URLs
- Missing video data
- Network errors
- Empty video lists

## Sample Data

Use the `sample-youtube-data.json` file to import example videos into your Sanity dataset:

1. Go to Sanity Studio
2. Navigate to the YouTube Video section
3. Use the import feature to upload the sample data
4. Modify the sample videos with your actual content

## Support

For technical support or questions about the YouTube video feature:
- Check the Sanity documentation
- Review the component code in `src/components/FeaturedYoutube.tsx`
- Contact the development team

---

**Note**: Make sure to replace the sample YouTube URLs with actual videos related to ZeroBuild and your sustainability initiatives. 