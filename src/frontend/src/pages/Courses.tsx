import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  Brain,
  Calculator,
  Clock,
  Code2,
  Cpu,
  Monitor,
  Network,
  Printer,
} from "lucide-react";

const courses = [
  {
    icon: Monitor,
    title: "MS-CIT",
    subtitle: "Maharashtra State Certificate in Information Technology",
    duration: "3 months",
    certification: "MKCL Certified",
    desc: "The most sought-after computer literacy course in Maharashtra. Covers Windows, MS Office, Internet, email and basic computing skills essential for government and private jobs.",
    skills: [
      "Windows OS",
      "MS Office Suite",
      "Internet & Email",
      "Digital India Tools",
      "Cyber Safety",
    ],
  },
  {
    icon: Calculator,
    title: "Tally Prime with GST",
    subtitle: "Accounting & GST Management",
    duration: "2 months",
    certification: "Industry Recognized",
    desc: "Complete accounting software training including GST filing, inventory management, payroll and financial reporting. Essential for finance and accounting roles.",
    skills: [
      "Tally Prime",
      "GST Filing",
      "Inventory Management",
      "Payroll",
      "Financial Reports",
    ],
  },
  {
    icon: BarChart2,
    title: "Advanced Excel",
    subtitle: "Data Analysis & Business Intelligence",
    duration: "1.5 months",
    certification: "Course Completion",
    desc: "Master Excel for data analysis with advanced formulas, VLOOKUP, pivot tables, charts, macros and dashboard creation for business analytics.",
    skills: [
      "Advanced Formulas",
      "VLOOKUP / XLOOKUP",
      "Pivot Tables",
      "Charts & Graphs",
      "Macros & VBA",
    ],
  },
  {
    icon: Printer,
    title: "DTP (Desktop Publishing)",
    subtitle: "Photoshop & CorelDraw",
    duration: "2 months",
    certification: "Course Completion",
    desc: "Learn professional graphic design and desktop publishing. Create banners, brochures, visiting cards, layouts and more using industry-standard tools.",
    skills: [
      "Adobe Photoshop",
      "CorelDraw",
      "Page Layout",
      "Typography",
      "Print Design",
    ],
  },
  {
    icon: Code2,
    title: "C & C++ Programming",
    subtitle: "Programming Fundamentals",
    duration: "3 months",
    certification: "Course Completion",
    desc: "Build a strong foundation in programming with C and C++. Covers variables, control flow, functions, arrays, pointers and object-oriented programming.",
    skills: [
      "C Basics",
      "C++ OOP",
      "Functions & Arrays",
      "Pointers",
      "File Handling",
    ],
  },
  {
    icon: Cpu,
    title: "IoT (Internet of Things)",
    subtitle: "Smart Devices & Automation",
    duration: "2 months",
    certification: "Course Completion",
    desc: "Introduction to IoT concepts, sensors, Arduino, Raspberry Pi and smart home automation. Build real-world IoT mini projects.",
    skills: [
      "IoT Concepts",
      "Arduino",
      "Sensors & Actuators",
      "Raspberry Pi",
      "Smart Automation",
    ],
  },
  {
    icon: Brain,
    title: "AI (Artificial Intelligence)",
    subtitle: "AI Fundamentals & Tools",
    duration: "2 months",
    certification: "Course Completion",
    desc: "Introduction to Artificial Intelligence, machine learning basics, AI tools like ChatGPT, and practical applications in everyday business contexts.",
    skills: [
      "AI Fundamentals",
      "Machine Learning Basics",
      "ChatGPT & AI Tools",
      "Prompt Engineering",
      "AI Applications",
    ],
  },
  {
    icon: Network,
    title: "Hardware & Networking",
    subtitle: "Computer Repair & Network Setup",
    duration: "3 months",
    certification: "Course Completion",
    desc: "Learn computer hardware assembly, troubleshooting, OS installation, LAN/WAN networking, WiFi setup and network security fundamentals.",
    skills: [
      "Computer Assembly",
      "Troubleshooting",
      "OS Installation",
      "LAN/WAN Networking",
      "Network Security",
    ],
  },
];

export default function Courses() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Our Courses</h1>
          <p className="text-orange-100 text-lg">
            Industry-relevant programs designed for your career success
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <course.icon size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500">{course.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                      <Clock size={10} />
                      {course.duration}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      {course.certification}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {course.desc}
                  </p>

                  <div className="mb-5">
                    <p className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Skills You'll Learn
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/admissions"
                    data-ocid="course.enroll.button"
                    className="block w-full text-center py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors text-sm"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
