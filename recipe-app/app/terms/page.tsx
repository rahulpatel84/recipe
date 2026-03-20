import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Relish Realm',
};

export default function Terms() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-20 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-bold text-dark-olive mb-8 tracking-tight font-serif">Terms of Service</h1>
      <div className="prose prose-olive max-w-none text-dark-olive/80 space-y-6 text-lg leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">1. Acceptance of Terms</h2>
        <p>By accessing and using Relish Realm, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials on Relish Realm's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">3. Disclaimer</h2>
        <p>The materials on Relish Realm's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">4. Limitations</h2>
        <p>In no event shall Relish Realm or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">5. Revisions and Errata</h2>
        <p>The materials appearing on Relish Realm's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">6. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
      </div>
    </div>
  );
}
