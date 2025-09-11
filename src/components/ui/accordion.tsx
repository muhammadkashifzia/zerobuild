'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PortableText } from '@portabletext/react'

interface AccordionItem {
  _key: string
  title: string
  content: any
  isOpen?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  title?: string
  className?: string
}

export default function Accordion({ items, title, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.isOpen).map(item => item._key))
  )

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key)
    } else {
      newOpenItems.add(key)
    }
    setOpenItems(newOpenItems)
  }

  if (!items || items.length === 0) return null

  return (
    <div className={`w-full detail-accordian ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">{title}</h2>
      )}
      <div className="space-y-[24px]">
        {items.map((item) => {
          const isOpen = openItems.has(item._key)
          
          return (
            <div
              key={item._key}
              className="border border-gray-200 rounded-lg overflow-hidden bg-[#f2f2f2]"
            >
              <button
                onClick={() => toggleItem(item._key)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[transparent] focus:ring-inset"
                aria-expanded={isOpen}
              >
                <span className="font-normal text-black text-[16px] md:text-[28px] pr-4 break-all">
                  {item.title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 focus:ring-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="prose prose-sm max-w-none text-black text-[16px]">
                    <PortableText
                      value={item.content}
                      components={{
                        block: {
                          h1: ({ children }) => <h1 className="text-lg font-semibold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="font-semibold mb-1">{children}</h3>,
                          normal: ({ children }) => <p className="mb-2">{children}</p>,
                        },
                        list: {
                          bullet: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          number: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                        },
                        listItem: ({ children }) => <li>{children}</li>,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 