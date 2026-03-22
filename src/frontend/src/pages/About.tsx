import {
  Award,
  CheckCircle,
  GraduationCap,
  Heart,
  Laptop,
  Users,
} from "lucide-react";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "5000+", label: "Students Trained" },
  { value: "15+", label: "Courses Offered" },
  { value: "95%", label: "Placement Rate" },
];

const highlights = [
  {
    icon: Award,
    title: "MKCL Authorized",
    desc: "Official authorized learning center for MKCL Maharashtra.",
  },
  {
    icon: GraduationCap,
    title: "MS-CIT & KLiC",
    desc: "Certified programs recognized by Government of Maharashtra.",
  },
  {
    icon: Heart,
    title: "Affordable Education",
    desc: "Quality education at fees that every student can afford.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Dedicated trainers with industry and academic expertise.",
  },
  {
    icon: Laptop,
    title: "Modern Labs",
    desc: "Fully equipped computer labs with latest hardware and software.",
  },
  {
    icon: CheckCircle,
    title: "Career Support",
    desc: "Resume building, interview prep and job placement assistance.",
  },
];

const values = [
  {
    num: 1,
    title: "Excellence",
    desc: "Committed to delivering the highest quality of education and training.",
  },
  {
    num: 2,
    title: "Accessibility",
    desc: "Making digital education accessible to every student regardless of background.",
  },
  {
    num: 3,
    title: "Innovation",
    desc: "Continuously updating our curriculum to match industry demands.",
  },
];

export default function About() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-3">About Us</h1>
          <p className="text-orange-100 text-lg">
            Learn more about D-Infotech Computer Institute
          </p>
        </div>
      </section>

      {/* About + Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                D-Infotech Computer Institute provides professional computer
                education and digital skills training in Pune, Maharashtra.
                Established over a decade ago, we have been the trusted choice
                for students seeking quality computer education.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The institute is an authorized center associated with{" "}
                <strong>
                  MKCL (Maharashtra Knowledge Corporation Limited)
                </strong>{" "}
                and offers flagship MS-CIT and KLiC certification courses. Our
                curriculum blends theory with hands-on practice.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe every student deserves access to quality digital
                education, which is why we keep our fees affordable without
                compromising on teaching quality.
              </p>

              {/* Mission */}
              <div className="border-l-4 border-orange-600 pl-4 bg-orange-50 py-4 pr-4 rounded-r-lg">
                <p className="font-bold text-gray-900 mb-1">Our Mission</p>
                <p className="text-gray-600 italic text-sm">
                  "To provide affordable, high-quality digital education that
                  empowers every student to build a successful career in the
                  digital economy."
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-orange-600 rounded-2xl p-8 text-center text-white"
                >
                  <div className="text-4xl font-black mb-2">{stat.value}</div>
                  <div className="text-orange-100 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Key Highlights
            </h2>
            <p className="text-gray-500">
              What makes D-Infotech a leading choice for computer education
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="bg-white rounded-xl p-6 shadow-card border border-gray-100 flex gap-4"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <h.icon size={22} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{h.title}</h3>
                  <p className="text-sm text-gray-500">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="text-center p-8 rounded-2xl border-2 border-orange-100 hover:border-orange-600 transition-colors"
              >
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black text-lg">
                  {v.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
