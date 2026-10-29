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
              <p key={index} className="mb-6 text-[1.08rem] leading-[1.75] text-ink/80">
                {block.text}
              </p>
            );

          case 'heading':
            if (block.level === 2) {
              return (
                <h2 key={index} className="mb-4 mt-12 font-serif text-[1.9rem] text-ink">
                  {block.text}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3 key={index} className="mb-3 mt-9 font-serif text-[1.4rem] text-ink">
                  {block.text}
                </h3>
              );
            }
            return (
              <h4 key={index} className="font-serif text-lg font-bold text-ink mt-6 mb-2">
                {block.text}
              </h4>
            );

          case 'quote':
            return (
              <blockquote key={index} className="my-10 border-l-[3px] border-mustard py-1 pl-6">
                <p className="font-serif text-[1.45rem] leading-[1.35] text-ink">
                  {block.text}
                </p>
                {block.author && (
                  <cite className="mt-2 block text-sm not-italic text-muted">{block.author}</cite>
                )}
              </blockquote>
            );

          case 'statistic':
            return (
              <div key={index} className="my-9 flex flex-wrap items-baseline gap-x-5 gap-y-1 rounded-[22px] bg-mustard-soft px-7 py-6">
                <div className="font-serif text-[2.4rem] leading-none text-ink sm:text-[2.8rem]">
                  {block.value}
                </div>
                <div className="flex-1 text-[0.98rem] text-ink/75">
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
                  <figcaption className="text-center text-sm text-muted mt-2">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case 'list':
            return (
              <ul key={index} className="my-6 space-y-2">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-tomato mt-2.5 flex-shrink-0" />
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
