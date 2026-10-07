import { services } from "@/config/landing"
import { Icons } from "@/components/icons"
import { SectionHeader } from "@/components/landing/section-header"

export function Services() {
  return (
    <section id="services" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeader
        eyebrow="Services"
        title="Three ways to win back time and grow"
        description="Each service stands on its own, and they work even better together: automations feed the dashboards, and the website feeds both."
      />
      <div className="mx-auto mt-12 grid max-w-[72rem] gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative flex flex-col rounded-2xl border bg-background/60 p-8 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <service.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="mt-2 text-muted-foreground">{service.summary}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <Icons.check
                    className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
