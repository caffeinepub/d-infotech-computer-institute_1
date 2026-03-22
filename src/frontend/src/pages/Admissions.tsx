import { useActor } from "@/hooks/useActor";
import {
  Award,
  BookOpen,
  CheckCircle,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const courseOptions = [
  "MS-CIT",
  "Tally Prime with GST",
  "Advanced Excel",
  "DTP (Desktop Publishing)",
  "C & C++ Programming",
  "IoT (Internet of Things)",
  "AI (Artificial Intelligence)",
  "Hardware & Networking",
];

const whyJoin = [
  {
    icon: BookOpen,
    title: "15+ Courses",
    desc: "Wide variety of professional courses",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Learn from industry professionals",
  },
  {
    icon: Award,
    title: "MKCL Certified",
    desc: "Government recognized certification",
  },
  {
    icon: TrendingUp,
    title: "95% Placement",
    desc: "Strong placement track record",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Fill the Form",
    desc: "Submit your admission inquiry with your details and preferred course.",
  },
  {
    step: "02",
    title: "Counseling",
    desc: "Our team will contact you within 24 hours for a free career counseling session.",
  },
  {
    step: "03",
    title: "Enrollment",
    desc: "Complete the admission process and get your student ID and schedule.",
  },
  {
    step: "04",
    title: "Start Learning",
    desc: "Begin your journey with our expert faculty and modern labs.",
  },
];

export default function Admissions() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      e.phone = "Enter valid 10-digit phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Enter valid email address";
    if (!form.course) e.course = "Please select a course";
    if (!form.message.trim()) e.message = "Please add a message or query";
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
      await actor.submitAdmissionInquiry(
        form.name,
        form.phone,
        form.email,
        form.course,
        form.message,
      );
      setSuccess(true);
      setForm({ name: "", phone: "", email: "", course: "", message: "" });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 focus:border-orange-500"
    }`;

  return (
    <div>
      {/* Banner */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Admissions</h1>
          <p className="text-orange-100 text-lg">
            Start your journey with D-Infotech today
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Info */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Why Join D-Infotech?
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {whyJoin.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs"
                  >
                    <item.icon size={20} className="text-orange-600 mb-2" />
                    <p className="font-bold text-gray-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Admission Process
              </h3>
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Form */}
            <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
              {success ? (
                <div
                  className="text-center py-8"
                  data-ocid="admissions.success_state"
                >
                  <CheckCircle
                    size={56}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for your enquiry! We'll contact you within 24
                    hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
                    data-ocid="admissions.primary_button"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-black text-gray-900 mb-6">
                    Admission Inquiry Form
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="admissions.modal"
                  >
                    <div>
                      <label
                        htmlFor="adm-name"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="adm-name"
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Enter your full name"
                        className={inputClass("name")}
                        data-ocid="admissions.input"
                      />
                      {errors.name && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="admissions.name_error"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="adm-phone"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="adm-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="10-digit mobile number"
                        className={inputClass("phone")}
                        data-ocid="admissions.input"
                      />
                      {errors.phone && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="admissions.phone_error"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="adm-email"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="adm-email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="your.email@example.com"
                        className={inputClass("email")}
                        data-ocid="admissions.input"
                      />
                      {errors.email && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="admissions.email_error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="adm-course"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Select Course *
                      </label>
                      <select
                        id="adm-course"
                        value={form.course}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, course: e.target.value }))
                        }
                        className={inputClass("course")}
                        data-ocid="admissions.select"
                      >
                        <option value="">Choose a course...</option>
                        {courseOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.course && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="admissions.field_error"
                        >
                          {errors.course}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="adm-message"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Message / Query *
                      </label>
                      <textarea
                        id="adm-message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Any queries or questions..."
                        rows={4}
                        className={inputClass("message")}
                        data-ocid="admissions.textarea"
                      />
                      {errors.message && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          data-ocid="admissions.field_error"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      data-ocid="admissions.submit_button"
                      className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                    >
                      {loading && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
