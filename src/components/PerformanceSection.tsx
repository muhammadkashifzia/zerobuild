'use client';

import { useState } from 'react';


const categories = ['AI Apps', 'Web Apps', 'Ecommerce', 'Marketing', 'Platforms'];

export default function PerformanceSection() {
  const [activeTab, setActiveTab] = useState('AI Apps');

  return (
    <section className="bg-black text-gray-300 py-16 px-4 md:px-24 font-sans">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-lg leading-relaxed">
          <p><span className="font-bold text-white">runway</span> build times went from <span className="text-white">7m</span> to <span className="text-white">40s</span>.</p>
          <p><span className="inline-flex items-center gap-2"><img src="/leonardo-icon.png" alt="Leonardo.Ai" className="w-5 h-5" /> <span className="font-semibold text-white">Leonardo.Ai</span></span> saw a <span className="text-white">95%</span> reduction in page load times.</p>
          <p><span className="font-bold text-white">_zapier</span> saw <span className="text-white">24x</span> faster builds.</p>
        </div>

        <div className="space-y-6"> 
          <p className="text-gray-400">
            Get started using our pre-built templates. Easily stream long-running LLM responses for a better user experience with zero-config infrastructure that’s always globally performant.
          </p>

          <div className="flex gap-3 flex-wrap text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full border ${
                  activeTab === cat ? 'bg-white text-black' : 'border-gray-600 text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button className="mt-4 bg-white text-black px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold">
            Deploy AI Apps in seconds
          
          </button>
        </div>
      </div>
    </section>
  );
}
