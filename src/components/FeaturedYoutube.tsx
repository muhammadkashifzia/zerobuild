import React from "react";
import { client } from "@/sanity/lib/client";
import { youtubeVideosQuery } from "@/sanity/lib/queries";
import { getYouTubeEmbedUrl } from "@/utils/youtube";
import { YouTubeVideo, VideoFeatureProps } from "@/types/youtube";
import { urlFor } from "@/sanity/lib/image";
import YouTubeSkeleton from "./shimmer/YouTubeSkeleton";

const VideoFeature: React.FC<VideoFeatureProps> = ({
  title,
  gradient,
  videoSrc,
  channelName,
  description,
  thumbnail,
}) => {
  return (
    <div
      className={`rounded-3xl my-10 grid grid-cols-1 gap-10 bg-gradient-to-b px-2 pt-2 pb-10 sm:p-10 md:gap-20 lg:grid-cols-2 ${gradient}`}
    >
      <div className="relative aspect-video h-full w-full overflow-hidden rounded-2xl">
        {thumbnail && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-center">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p className="text-sm">Click to play</p>
            </div>
          </div>
        )}
        <iframe
          className="rounded-2xl"
          width="100%"
          height="100%"
          src={videoSrc}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <p className="text-xl font-normal tracking-tight text-white md:text-4xl">
          {description}
          <span className="relative inline-block bg-white/20 px-2 py-2 m-[8px]">
            <span className="font-medium text-white text-balance">{channelName}</span>
          </span>
        </p>
      </div>
    </div>
  );
};

const YouTuberShowcase: React.FC = async () => {
  try {
    // Fetch videos from Sanity CMS
    const videos: YouTubeVideo[] = await client.fetch(youtubeVideosQuery);

    // Transform videos for the component
    const transformedVideos: VideoFeatureProps[] = videos.map((video) => {
      const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
      
      const thumbnailUrl = video.thumbnail 
        ? urlFor(video.thumbnail.asset).url() 
        : undefined;

      return {
        title: video.title,
        gradient: video.gradient,
        videoSrc: embedUrl || video.youtubeUrl, // Fallback to original URL if embed fails
        channelName: video.channelName,
        description: video.description,
        thumbnail: thumbnailUrl,
      };
    });

    // If no videos, hide the section completely
    if (transformedVideos.length === 0) {
      return null;
    }

    // Only show the section if there are active videos
    return (
      <div
        className="mb-[40px] md:mb-[80px] pb-[10px] pt-[30px] md:py-[60px]"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #484AB7 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-[16px]">
         <div>
          <h2
            id="reviews-title"
            className="text-[24px] md:text-[48px] font-bold text-white sm:text-center"
          >
            Featured by popular YouTubers
          </h2>
          <p className="mt-2 text-lg text-white sm:text-center">
            See what the best YouTubers are saying about ZeroBuild.
          </p>
        </div>
        <div>
          {transformedVideos.map((video, index) => (
            <VideoFeature key={video.title + index} {...video} />
          ))}
        </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    // Hide the section completely on error
    return null;
  }
};

export default YouTuberShowcase;
