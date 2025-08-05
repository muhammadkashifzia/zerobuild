import React from "react";
import { getYouTubeEmbedUrl } from "@/utils/youtube";

export default function TestYouTube() {
  const testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const embedUrl = getYouTubeEmbedUrl(testUrl);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">YouTube Video Test</h1>
      
      <div className="mb-4">
        <p><strong>Original URL:</strong> {testUrl}</p>
        <p><strong>Embed URL:</strong> {embedUrl}</p>
      </div>

      <div className="aspect-video w-full max-w-2xl">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl || ""}
          title="Test YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Test Cases:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>youtu.be format: {getYouTubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")}</li>
          <li>youtube.com/watch format: {getYouTubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}</li>
          <li>youtube.com/embed format: {getYouTubeEmbedUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")}</li>
          <li>Invalid URL: {getYouTubeEmbedUrl("https://example.com")}</li>
        </ul>
      </div>
    </div>
  );
} 