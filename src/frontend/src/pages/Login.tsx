import { Link } from "@tanstack/react-router";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h1 className="text-2xl font-black text-gray-900 mb-4">
          Page Not Found
        </h1>
        <Link to="/" className="text-orange-600 hover:underline">
          Go Home
        </Link>
      </div>
    </div>
  );
}
