import { personalInfo, socialLinks, footerLinks } from "@/data/data"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-3">{personalInfo.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built with Next.js by Qayyum Bokhari. Always building, always learning.
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Qayyum Bokhari. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
