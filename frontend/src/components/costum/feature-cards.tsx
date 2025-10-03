export function FeatureCards() {
  const features = [
    {
      title: "Plan your schedules",
      description: "Organize workflows and tasks effortlessly. Collaborate with your team in real-time.",
      highlighted: true,
    },
    {
      title: "Turn data into insights",
      description: "Visualize your workflow metrics and make smarter decisions in minutes.",
      highlighted: false,
    },
    {
      title: "Automate your workflow",
      description: "Set rules, triggers, and actions to simplify recurring tasks and save time.",
      highlighted: false,
    },
  ]

  return (
    <section className="border-t border-[#e0dedb] border-b border-[#e0dedb] bg-[#FFF9F9] py-12">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 flex flex-col gap-3 rounded-lg transition-shadow duration-200 ${
                feature.highlighted
                  ? "bg-white border border-[#e0dedb] shadow-md"
                  : "bg-white/50 border border-[#e0dedb]/60 hover:shadow-sm"
              }`}
            >
              {feature.highlighted && (
                <div className="space-y-1 mb-2">
                  <div className="w-full h-0.5 bg-[#322d2b]/10 rounded"></div>
                  <div className="w-16 h-0.5 bg-[#FF0080] rounded"></div>
                </div>
              )}
              <h3 className="text-[#111111] text-lg font-semibold leading-6">{feature.title}</h3>
              <p className="text-[#605a57] text-sm leading-6">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
