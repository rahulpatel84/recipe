'use client';

import { BlogContentBlock } from '@/lib/blog';
import BlogChart from './BlogCharts';

interface BlogContentProps {
  content: BlogContentBlock[];
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="text-deep-brown/80 leading-relaxed mb-6">
                {block.text}
              </p>
            );

          case 'heading':
            if (block.level === 2) {
              return (
                <h2 key={index} className="font-serif text-2xl font-bold text-deep-brown mt-10 mb-4">
                  {block.text}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3 key={index} className="font-serif text-xl font-bold text-deep-brown mt-8 mb-3">
                  {block.text}
                </h3>
              );
            }
            return (
              <h4 key={index} className="font-serif text-lg font-bold text-deep-brown mt-6 mb-2">
                {block.text}
              </h4>
            );

          case 'quote':
            return (
              <blockquote key={index} className="my-8 border-l-4 border-terracotta pl-6 py-2 bg-soft-gray/50 rounded-r-lg">
                <p className="text-lg italic text-deep-brown/90 mb-2">
                  "{block.text}"
                </p>
                {block.author && (
                  <cite className="text-sm text-muted-text not-italic">
                    - {block.author}
                  </cite>
                )}
              </blockquote>
            );

          case 'statistic':
            return (
              <div key={index} className="my-8 flex items-center gap-6 p-6 bg-gradient-to-r from-terracotta/10 to-transparent rounded-xl border-l-4 border-terracotta">
                <div className="text-4xl sm:text-5xl font-serif font-bold text-terracotta">
                  {block.value}
                </div>
                <div className="text-deep-brown/70 text-sm sm:text-base">
                  {block.label}
                </div>
              </div>
            );

          case 'image':
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || ''}
                  className="w-full rounded-xl"
                />
                {block.alt && (
                  <figcaption className="text-center text-sm text-muted-text mt-2">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case 'list':
            return (
              <ul key={index} className="my-6 space-y-2">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-deep-brown/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'chart':
            return (
              <BlogChart
                key={index}
                type={block.chartType as 'bar' | 'pie' | 'horizontal-bar' | 'line'}
                data={block.chartData || []}
                title={block.title || ''}
                subtitle={block.subtitle}
                valueLabel={block.valueLabel}
                showPercentage={block.showPercentage}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
