import React from "react";

interface VideoFeatureProps {
  title: string;
  gradient: string;
  videoSrc: string;
  channelName: string;
  description: string;
}

const VideoFeature: React.FC<VideoFeatureProps> = ({
  title,
  gradient,
  videoSrc,
  channelName,
  description,
}) => {
  return (
      <div
        className={`rounded-3xl my-10 grid grid-cols-1 gap-10 bg-gradient-to-b px-2 pt-2 pb-10 sm:p-10 md:gap-20 lg:grid-cols-2 ${gradient}`}
      >
        <div className="relative aspect-video h-full w-full overflow-hidden rounded-2xl">
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
          <p className="font-sans text-xl font-normal tracking-tight text-white md:text-4xl">
            {description}{" "}
            <span className="relative inline-block bg-white/20 px-2 py-2">
              <span className="font-medium text-white">{channelName}</span>
            </span>
          </p>
        </div>
      </div>
  );
};

const YouTuberShowcase: React.FC = () => {
  const videos = [
    {
      title: "This UI component library is mind-blowing",
      gradient: "from-indigo-500 to-indigo-300",
      videoSrc: "https://www.youtube.com/embed/RPa3_AD1_Vs",
      channelName: "Fireship",
      description: "Jeff from",
    },
    {
      title: "SAAS Automation Builder",
      gradient: "from-pink-500 to-pink-300",
      videoSrc: "https://www.youtube.com/embed/XkOXNlHJP6M",
      channelName: "Web Prodigies",
      description: "Watch",
    },

  ];

  return (
    <div>
      {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-center"
        >
          Featured by popular YouTubers
        </h2>
        <p className="mt-2 text-lg text-neutral-600 sm:text-center">
          See what the best YouTubers are saying about Aceternity UI.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-2 py-10 md:px-8 md:py-20">
        {videos.map((video, index) => (
          <VideoFeature key={index} {...video} />
        ))}
      </div>
    </div>
  );
};

export default YouTuberShowcase;
