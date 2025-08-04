import Accordion from "@/components/ui/accordion";

const testAccordionData = [
  {
    _key: "1",
    title: "What services does ZeroBuild offer?",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "ZeroBuild offers comprehensive Net Zero decarbonisation services including energy modelling, carbon assessment, retrofit solutions, and new build sustainability consulting for architects, engineers, developers, and local authorities.",
          },
        ],
      },
    ],
    isOpen: true,
  },
  {
    _key: "2",
    title: "How can I get started with ZeroBuild services?",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Getting started is easy! Simply contact our team through our contact form or give us a call. We'll schedule a consultation to understand your project requirements and provide tailored solutions for your sustainability goals.",
          },
        ],
      },
    ],
    isOpen: false,
  },
  {
    _key: "3",
    title: "What are the benefits of Net Zero decarbonisation?",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Net Zero decarbonisation offers numerous benefits including reduced energy costs, improved building performance, compliance with environmental regulations, enhanced property value, and contribution to climate change mitigation.",
          },
        ],
      },
    ],
    isOpen: false,
  },
];

export default function TestAccordionPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Accordion Component Test</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <Accordion 
          items={testAccordionData} 
          title="Frequently Asked Questions"
          className="max-w-none"
        />
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          This is a test page to verify the accordion component functionality.
        </p>
      </div>
    </div>
  );
} 