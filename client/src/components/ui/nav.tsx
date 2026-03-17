import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full border-b px-6 py-3 flex items-center justify-between bg-white">
      {/* LEFT */}
      <div className="flex gap-6">
        <Link to="/dashboard" className="text-sm font-medium">
          Dashboard
        </Link>

        <Link to="/incidents" className="text-sm font-medium">
          Incidents
        </Link>
      </div>

      {/* RIGHT */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>

          <button
            onClick={handleLogout}
            className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
