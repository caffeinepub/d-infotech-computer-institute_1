import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
  { label: "Admin Panel", to: "/admin" },
];

const courseLinks = [
  "MS-CIT",
  "Tally Prime with GST",
  "Advanced Excel",
  "DTP (Desktop Publishing)",
  "C & C++ Programming",
  "IoT Basics",
  "AI Introduction",
  "Hardware & Networking",
];

const socialLinks = [
  { icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: SiYoutube, label: "YouTube", href: "https://youtube.com" },
  { icon: SiWhatsapp, label: "WhatsApp", href: "https://wa.me/919967283284" },
];

const ADDRESS =
  "D/1, Siddhivinayak Chs, Bus Depot, Plot No. 64, near Lokmanya Nagar, Lokmanya Nagar, Thane West, Thane, Maharashtra 400606";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-black text-white text-lg">
                DI
              </div>
              <div className="leading-tight">
                <div className="font-black text-white text-sm uppercase tracking-wider">
                  D-Infotech
                </div>
                <div className="text-gray-400 text-xs">Computer Institute</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Professional computer education and digital skills training. MKCL
              Authorized Learning Center.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="text-orange-600 mt-0.5 flex-shrink-0"
                />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-orange-600 flex-shrink-0" />
                <span>9967283284</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-orange-600 flex-shrink-0" />
                <span>info@dinfotech.in</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid="footer.link"
                    className={`text-sm transition-colors ${link.label === "Admin Panel" ? "text-orange-400 hover:text-orange-300 font-semibold" : "text-gray-400 hover:text-orange-400"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Our Courses
            </h3>
            <ul className="space-y-2">
              {courseLinks.map((course) => (
                <li key={course}>
                  <Link
                    to="/courses"
                    data-ocid="footer.link"
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.link"
                  className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm font-semibold text-white mb-1">
                MKCL Authorized
              </p>
              <p className="text-xs text-gray-400">
                MS-CIT &amp; KLiC Certification Center
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} D-Infotech Computer Institute. All rights
            reserved.
          </p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
