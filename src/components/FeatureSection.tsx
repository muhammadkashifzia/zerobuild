import React from "react";
import { getFeatures } from "@/sanity/sanity-utils";
import FeatureSectionClient from "@/components/FeatureSectionClient";

export async function FeaturesSectionDemo() {
  try {
    const features = await getFeatures();
    console.log('Features fetched:', features);
    
    if (!features || features.length === 0) {
      console.log('No features found, showing fallback');
      return (
        <div className="py-20 bg-white text-center">
          <h2 className="text-2xl font-bold mb-4">Our Features</h2>
          <p className="text-gray-600">Features will be displayed here once they are added to the CMS.</p>
        </div>
      );
    }
    
    return <FeatureSectionClient features={features} />;
  } catch (error) {
    console.error('Error fetching features:', error);
    return (
      <div className="py-20 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Our Features</h2>
        <p className="text-red-600">Error loading features. Please try again later.</p>
      </div>
    );
  }
}

export async function FeaturesSectionClientWrapper() {
  const features = await getFeatures();
  return <FeatureSectionClient features={features} />;
}
