export default function Testimonials() {
  const slots = [
    { label: "Client — Web Project" },
    { label: "Collaborator — Open Source" },
    { label: "Employer / Mentor" },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Testimonials</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            What people I&apos;ve worked with have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {slots.map((slot, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-dashed border-gray-200 dark:border-gray-700"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <span className="text-2xl text-gray-400">?</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 italic text-sm mb-4">
                Testimonials coming soon
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-600 font-medium uppercase tracking-wide">
                {slot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
