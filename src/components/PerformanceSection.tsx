'use client';

import { useState } from 'react';


const categories = ['AI Apps', 'Web Apps', 'Ecommerce', 'Marketing', 'Platforms'];

export default function PerformanceSection() {
  const [activeTab, setActiveTab] = useState('AI Apps');

  return (
    <section className="bg-[#fafafa] text-black py-16 px-4 md:px-24 font-sans mb-[80px]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-[32px] leading-[1.3]">
          <p><span className="font-bold text-black">runway</span> build times went from <span className="text-black">7m</span> to <span className="text-black">40s</span>.
          <span className="inline-flex items-center gap-2"> <span className="font-semibold text-black">Leonardo.Ai</span></span> saw a <span className="text-black">95%</span> reduction in page load times.
          <span className="font-bold text-black">_zapier</span> saw <span className="text-black">24x</span> faster builds.</p>
        </div>

        <div className="space-y-6"> 
          <p className="text-black">
            Get started using our pre-built templates. Easily stream long-running LLM responses for a better user experience with zero-config infrastructure that’s always globally performant.
          </p>

          <button className="mt-4 bg-[#484AB7] text-white px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold">
           Try a demo
          
          </button>
        </div>
      </div>
    </section>
  );
}
