import { siteContent } from "@/content/site";

export function ContactSignals() {
  const contactSignals = siteContent.contact.signals;

  return (
    <div className="about-points">
      {contactSignals.map((signal) => (
        <div key={signal.label}>
          <strong>{signal.label}</strong>
          {"href" in signal ? <a href={signal.href}>{signal.value}</a> : <span>{signal.value}</span>}
        </div>
      ))}
    </div>
  );
}
