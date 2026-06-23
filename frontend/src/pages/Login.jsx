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

    <div className="flex h-screen items-center justify-center bg-slate-950">

      <form
        onSubmit={handleLogin}
        className="w-96 rounded-xl bg-slate-900 p-6"
      >

        <h1 className="mb-6 text-2xl font-bold">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="mb-4 w-full rounded p-3 bg-slate-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded p-3 bg-slate-800"
        />

        <button
  type="submit"
  disabled={loading}
  className="
  w-full
  rounded
  bg-blue-600
  p-3
  transition
  disabled:opacity-50
  disabled:cursor-not-allowed
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
