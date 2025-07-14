export default function PerformanceSection() {
  return (
    <section className="bg-[#fafafa] text-black py-[60px] px-4 md:px-24 mb-[80px]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-[28px] leading-[1.3]">
          <p>Explore how our client used our Five C Zero Framework to evaluate 1000+ design options in under 24 hours, unlocking smarter decisions from day one..</p>
        </div>

        <div className="space-y-6"> 
          <p className="text-black">
         Choose what matters most and let us the rest. Whether new build or retrofit, we help you prioritise what drives your project: 
 Compliance, Comfort, Cost. Carbon. Circularity. 
 Designing a whole life Net Zero option has never been easier.
          </p>

          <button className="w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200">
           Try a demo
          
          </button>
        </div>
      </div>
    </section>
  );
}
