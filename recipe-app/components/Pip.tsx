/** Pip the pickle — Relish Realm's mascot. */
export default function Pip({ className = '', title }: { className?: string; title?: string }) {
    return (
        <svg viewBox="0 0 100 120" className={className} role={title ? 'img' : 'presentation'} aria-hidden={title ? undefined : true}>
            {title && <title>{title}</title>}
            <ellipse cx="50" cy="114" rx="30" ry="5" fill="#1B1A17" opacity=".08" />
            <path d="M50 8c22 0 32 18 32 50s-10 52-32 52-32-20-32-52S28 8 50 8z" fill="#7BA84F" stroke="#1B1A17" strokeWidth="3" />
            <circle cx="34" cy="34" r="3" fill="#5A8A37" />
            <circle cx="66" cy="44" r="3" fill="#5A8A37" />
            <circle cx="30" cy="78" r="3" fill="#5A8A37" />
            <circle cx="70" cy="86" r="3" fill="#5A8A37" />
            <circle cx="52" cy="98" r="2.5" fill="#5A8A37" />
            <circle cx="40" cy="56" r="5" fill="#1B1A17" />
            <circle cx="62" cy="56" r="5" fill="#1B1A17" />
            <circle cx="41.5" cy="54.5" r="1.6" fill="#fff" />
            <circle cx="63.5" cy="54.5" r="1.6" fill="#fff" />
            <path d="M42 68q9 9 18 0" fill="none" stroke="#1B1A17" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="32" cy="66" rx="5" ry="3" fill="#F29C8A" opacity=".8" />
            <ellipse cx="70" cy="66" rx="5" ry="3" fill="#F29C8A" opacity=".8" />
            <path d="M50 8q4-8 12-6" fill="none" stroke="#1B1A17" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
