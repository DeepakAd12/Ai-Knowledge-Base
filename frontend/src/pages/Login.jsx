import { useState } from "react";
import api from "../services/api";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
  
export default function Login() {
  
  const [username, setUsername] =useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] =
    useState("");
  
  const handleLogin =
    async (e) => {

      e.preventDefault();
    setLoading(true);
      try {

        const response =
          await api.post(
            "auth/login/",
            {
              username,
              password,
            }
          
          );
          toast.success(  "Login successful");

        localStorage.setItem(
          "access",
          response.data.access
        );

        localStorage.setItem(
          "refresh",
          response.data.refresh
        );
      localStorage.setItem(
        "username",
        username
      );
        window.location.href = "/dashboard";

      } catch (error) {

        console.error(error);

        toast.error("Invalid credentials");

      }
      finally {

    setLoading(false);

  }

    };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

       <form
  onSubmit={handleLogin}
  className="
    w-full
    max-w-md
    rounded-2xl
    bg-slate-900
    border
    border-slate-800
    shadow-2xl
    p-8
  "
>

  {/* Logo + Title */}

  <div className="mb-8 text-center">

    <div className="text-5xl mb-3">
      📚
    </div>

    <h1 className="text-3xl font-bold text-white">
      AI Knowledge Base
    </h1>

    <p className="mt-2 text-slate-400">
      Login to continue
    </p>

  </div>

  <input />

        <h1 className="mb-6 text-3xl font-bold text-center">
          Login
        </h1>

        <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="
    mb-4
    w-full
    rounded-xl
    border
    border-slate-700
    bg-slate-800
    px-4
    py-3
    text-white
    placeholder:text-slate-500
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500
    outline-none
    transition
  "
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="
    mb-6
    w-full
    rounded-xl
    border
    border-slate-700
    bg-slate-800
    px-4
    py-3
    text-white
    placeholder:text-slate-500
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500
    outline-none
    transition
  "
/>
        <button
  type="submit"
  disabled={loading}
  className="
w-full
rounded-xl
bg-blue-600
py-3
font-semibold
hover:bg-blue-700
transition-all
duration-200
  "
>
  {loading
    ? "Logging in..."
    : "Login"}
    
</button>
<p className="mt-4 text-center text-sm text-slate-400">

  Don't have an account?{" "}

  <Link
    to="/register"
    className="text-blue-400 hover:text-blue-300"
  >
    Register
  </Link>

</p>

      </form>

    </div>

  );

}
