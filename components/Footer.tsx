import { personalInfo, socialLinks, footerLinks } from "@/data/data"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }

export default function Footer() {
  return (
    <footer style={{ background: "#070707", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-white mb-2">{personalInfo.name}</p>
            <p className="text-xs leading-relaxed mb-5" style={{ ...MONO, color: "rgba(255,255,255,0.32)" }}>Built with Next.js · Always building, always learning.</p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} className="p-2 rounded-lg transition-colors hover:border-white/20" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.42)" }} aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ ...MONO, color: "rgba(255,255,255,0.28)" }}>Navigate</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}><a href={link.href} className="text-sm transition-colors hover:text-blue-400" style={{ color: "rgba(255,255,255,0.42)" }}>{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ ...MONO, color: "rgba(255,255,255,0.28)" }}>Get In Touch</p>
            <a href={`mailto:${personalInfo.email}`} className="text-sm transition-colors hover:text-blue-300" style={{ color: "#60A5FA" }}>{personalInfo.email}</a>
          </div>
        </div>
        <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] text-center tracking-widest" style={{ ...MONO, color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} Qayyum Bokhari — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
