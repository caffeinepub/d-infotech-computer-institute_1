import { useActor } from "@/hooks/useActor";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

const ADDRESS =
  "D/1, Siddhivinayak Chs, Bus Depot, Plot No. 64, near Lokmanya Nagar, Lokmanya Nagar, Thane West, Thane, Maharashtra 400606";

const contactInfo = [
  { icon: MapPin, label: "Address", value: ADDRESS },
  { icon: Phone, label: "Phone", value: "9967283284" },
  { icon: Mail, label: "Email", value: "info@dinfotech.in" },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon\u2013Sat: 9:00 AM \u2013 7:00 PM",
  },
];

const socialLinks = [
  { icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: SiYoutube, label: "YouTube", href: "https://youtube.com" },
  { icon: SiWhatsapp, label: "WhatsApp", href: "https://wa.me/919967283284" },
];

export default function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Enter valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitContact(form.name, form.email, form.message);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-orange-500"}`;

  return (
    <div>
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Contact Us</h1>
          <p className="text-orange-100 text-lg">
            We're here to help &ndash; reach out anytime
          </p>
        </div>
      </section>
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-5 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-gray-800 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-colors"
                    aria-label={s.label}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
              {success ? (
                <div
                  className="text-center py-8"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle
                    size={56}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. We'll reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
                    data-ocid="contact.primary_button"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-black text-gray-900 mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Full name"
                        className={inputClass("name")}
                        data-ocid="contact.input"
                      />
                      {errors.name && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="contact.error_state"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="your.email@example.com"
                        className={inputClass("email")}
                        data-ocid="contact.input"
                      />
                      {errors.email && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="contact.error_state"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="How can we help you?"
                        rows={5}
                        className={inputClass("message")}
                        data-ocid="contact.textarea"
                      />
                      {errors.message && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="contact.error_state"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      data-ocid="contact.submit_button"
                      className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                    >
                      {loading && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="h-80">
        <iframe
          src="https://maps.google.com/maps?q=Siddhivinayak+Chs+Lokmanya+Nagar+Thane+West&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="D-Infotech Location"
          data-ocid="contact.map_marker"
        />
      </section>
    </div>
  );
}
