import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { getLatestBlogPosts } from "@/data/data"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }

export default function BlogPreview() {
  const blogPosts = getLatestBlogPosts(3)
  return (
    <section className="py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ ...MONO, color: "#60A5FA" }}>
            ( 07 ) &nbsp;Writing
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Latest Posts</h2>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Sharing insights on AI, machine learning, and web development</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <article key={index} className="p-6 rounded-2xl flex flex-col transition-all duration-300 hover:border-white/[0.13]" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2 text-[10px] mb-4" style={{ ...MONO, color: "rgba(255,255,255,0.35)" }}>
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                <span>·</span>
                {post.readTime}
              </div>
              <span className="inline-block px-2 py-0.5 text-[10px] rounded-full mb-3 self-start" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60A5FA", ...MONO }}>
                {post.category}
              </span>
              <h3 className="text-sm font-bold text-white mb-3 leading-snug flex-1">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">{post.title}</Link>
              </h3>
              <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>{post.excerpt.slice(0, 120)}…</p>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-blue-300" style={{ color: "#60A5FA" }}>
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-full text-white transition-all hover:brightness-110" style={{ background: "#3B82F6" }}>
            View All Posts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
