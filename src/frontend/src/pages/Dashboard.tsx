import { useActor } from "@/hooks/useActor";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, BookOpen, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

const dashboardCards = [
  {
    icon: User,
    title: "My Profile",
    desc: "View and update your profile information",
    color: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "My Courses",
    desc: "View your enrolled courses and progress",
    color: "bg-green-500",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Check latest updates and announcements",
    color: "bg-purple-500",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dinfotech_session");
    const storedEmail = localStorage.getItem("dinfotech_email");
    if (!token) {
      navigate({ to: "/login" });
      return;
    }
    if (!actor) return;
    actor
      .validateSession(token)
      .then((valid) => {
        if (!valid) {
          localStorage.removeItem("dinfotech_session");
          localStorage.removeItem("dinfotech_email");
          navigate({ to: "/login" });
        } else {
          setEmail(storedEmail ?? "");
          setValidating(false);
        }
      })
      .catch(() => {
        navigate({ to: "/login" });
      });
  }, [navigate, actor]);

  const handleLogout = () => {
    localStorage.removeItem("dinfotech_session");
    localStorage.removeItem("dinfotech_email");
    navigate({ to: "/login" });
  };

  if (validating) {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        data-ocid="dashboard.loading_state"
      >
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] min-h-[calc(100vh-200px)]">
      {/* Dashboard header */}
      <div className="bg-orange-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">
              Student Dashboard
            </h1>
            <p className="text-orange-100 text-sm">{email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="dashboard.delete_button"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-6 shadow-card border border-gray-100"
            >
              <div
                className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <card.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-card border border-gray-100 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Your student portal is ready. Contact your instructor or visit the
            institute for your course schedule.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/courses"
              data-ocid="dashboard.primary_button"
              className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/contact"
              data-ocid="dashboard.secondary_button"
              className="px-6 py-2.5 border-2 border-orange-600 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
