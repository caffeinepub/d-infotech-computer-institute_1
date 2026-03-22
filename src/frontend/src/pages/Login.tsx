import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Login() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }
    if (!actor) return;
    setLoading(true);
    try {
      const hashedPassword = await sha256(password);
      const token = await actor.login(email.trim(), hashedPassword);
      if (token) {
        localStorage.setItem("dinfotech_session", token);
        localStorage.setItem("dinfotech_email", email.trim());
        navigate({ to: "/dashboard" });
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Banner */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Student Login</h1>
          <p className="text-orange-100 text-lg">
            Access your student dashboard
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7F7] flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
            {/* Orange header strip */}
            <div className="bg-orange-600 px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-black text-orange-600 text-lg">
                  DI
                </div>
                <div>
                  <div className="font-black text-white text-sm uppercase">
                    D-Infotech
                  </div>
                  <div className="text-orange-100 text-xs">Student Portal</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-xl font-black text-gray-900 mb-1">
                Welcome Back!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Enter your credentials to access your account
              </p>

              {error && (
                <div
                  className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4"
                  data-ocid="login.error_state"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    data-ocid="login.input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      data-ocid="login.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPass(!showPass)}
                      data-ocid="login.toggle"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-ocid="login.submit_button"
                  className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Signing In..." : "Login"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                New student?{" "}
                <a
                  href="tel:9967283284"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Contact us to register
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
