import { useState, useRef } from "react";

export default function QuickLinks() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const openLink = (url: string) => {
    setOpen(false);
    window.open(url, "_blank");
  };

  return (
    <div className="relative" ref={rootRef}>
      {/* Trigger */}
      <button
        aria-expanded={open}
        aria-controls="quicklinks-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-shadow shadow-sm"
      >
        {/* Grid icon */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
        <span className="text-sm font-medium">Atalhos</span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        id="quicklinks-menu"
        role="menu"
        aria-hidden={!open}
        className={`absolute right-0 mt-2 w-44 bg-gradient-to-b from-green-700 to-green-800 rounded-xl p-2 shadow-2xl origin-top-right
          transition-all duration-150 transform
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <button
          role="menuitem"
          onClick={() => openLink("https://academico.iff.edu.br/")}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white text-sm"
        >
          {/* Icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Acadêmico
        </button>

        <button
          role="menuitem"
          onClick={() => openLink("https://ead2.iff.edu.br/login/index.php")}
          className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-md hover:bg-white/10 transition-colors text-white text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Moodle
        </button>

        <button
          role="menuitem"
          onClick={() => openLink("https://suap.iff.edu.br")}
          className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-md hover:bg-white/10 transition-colors text-white text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12h20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SUAP
        </button>
      </div>
    </div>
  );
}
