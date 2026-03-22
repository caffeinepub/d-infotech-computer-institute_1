import type { Testimonial } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  Brain,
  Briefcase,
  Calculator,
  Code2,
  Cpu,
  Monitor,
  Network,
  Printer,
  Star,
  Users,
} from "lucide-react";

const courses = [
  {
    icon: Monitor,
    title: "MS-CIT",
    desc: "Computer literacy certification by MKCL. Essential for govt jobs.",
    duration: "3 months",
  },
  {
    icon: Calculator,
    title: "Tally Prime with GST",
    desc: "Complete accounting and GST filing training for businesses.",
    duration: "2 months",
  },
  {
    icon: BarChart2,
    title: "Advanced Excel",
    desc: "Data analysis, formulas, pivot tables and dashboards.",
    duration: "1.5 months",
  },
  {
    icon: Printer,
    title: "DTP",
    desc: "Desktop Publishing with Photoshop and CorelDraw.",
    duration: "2 months",
  },
  {
    icon: Code2,
    title: "C & C++",
    desc: "Programming basics and problem solving fundamentals.",
    duration: "3 months",
  },
  {
    icon: Cpu,
    title: "IoT",
    desc: "Internet of Things basics, sensors and micro-projects.",
    duration: "2 months",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    desc: "AI introduction, tools and real-world applications.",
    duration: "2 months",
  },
  {
    icon: Network,
    title: "Hardware & Networking",
    desc: "Computer repair, assembly and networking essentials.",
    duration: "3 months",
  },
];

const whyUs = [
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Learn from industry professionals with years of experience in their respective domains.",
  },
  {
    icon: BookOpen,
    title: "Hands-On Training",
    desc: "Practical lab sessions and real-world projects to reinforce every concept taught.",
  },
  {
    icon: Briefcase,
    title: "100% Placement Support",
    desc: "Dedicated placement cell with strong industry connections to help you land your dream job.",
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    studentName: "Priya Sharma",
    course: "MS-CIT",
    review:
      "D-Infotech gave me the confidence to use computers for my government job application. Excellent teachers and practical training!",
    rating: BigInt(5),
    createdAt: BigInt(0),
  },
  {
    studentName: "Rahul Patil",
    course: "Tally Prime with GST",
    review:
      "The Tally course was extremely practical. I got placed in a local CA firm within a month of completing the course.",
    rating: BigInt(5),
    createdAt: BigInt(0),
  },
  {
    studentName: "Sneha Kulkarni",
    course: "Advanced Excel",
    review:
      "Best institute in Pune for computer courses. The faculty is very supportive and the fees are affordable.",
    rating: BigInt(4),
    createdAt: BigInt(0),
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= rating
              ? "text-orange-500 fill-orange-500"
              : "text-gray-300 fill-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { actor, isFetching } = useActor();

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return defaultTestimonials;
      const data = await actor.getAllTestimonials();
      return data.length > 0 ? data : defaultTestimonials;
    },
    enabled: !!actor && !isFetching,
  });

  const displayTestimonials = testimonials ?? defaultTestimonials;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-orange-900 via-orange-700 to-orange-600">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 to-orange-700/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "MKCL Authorized",
                "MS-CIT Certified",
                "KLiC Courses",
                "Professional Training",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-tight mb-4">
              D-Infotech
              <br />
              <span className="text-orange-300">Computer Institute</span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-white/90 mb-2">
              Gateway to Successful Careers
            </p>
            <p className="text-base text-white/70 mb-8 max-w-xl">
              MKCL authorized center offering MS-CIT, KLiC and professional
              computer courses with 100% placement support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admissions"
                data-ocid="hero.primary_button"
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors shadow-lg"
              >
                Enroll Now
              </Link>
              <Link
                to="/courses"
                data-ocid="hero.secondary_button"
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Our Featured Courses
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Industry-relevant courses designed to boost your career prospects
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <course.icon
                    size={22}
                    className="text-orange-600 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                <span className="inline-block text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full mb-2 font-medium">
                  {course.duration}
                </span>
                <p className="text-sm text-gray-500 mb-4">{course.desc}</p>
                <Link
                  to="/courses"
                  data-ocid="course.button"
                  className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  View Details &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Why Choose Us
            </h2>
            <p className="text-gray-500">
              We provide the best learning experience for your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl bg-orange-50 border border-orange-100"
              >
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              What Our Students Say
            </h2>
            <p className="text-gray-500">
              Real experiences from our successful graduates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.slice(0, 3).map((t) => (
              <div
                key={t.studentName}
                className="bg-white rounded-xl p-6 shadow-card border border-gray-100"
              >
                <StarRating rating={Number(t.rating)} />
                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4 italic">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.studentName}
                    </p>
                    <p className="text-orange-600 text-xs">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Start Your Career?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Join thousands of students who transformed their careers with
            D-Infotech. Enroll today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              data-ocid="cta.primary_button"
              className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors"
            >
              Apply for Admission
            </Link>
            <Link
              to="/contact"
              data-ocid="cta.secondary_button"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
