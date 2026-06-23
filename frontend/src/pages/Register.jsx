import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        await api.post(
          "auth/register/",
          {
            username,
            email,
            password,
          }
        );

        toast.success(
          "Account created successfully"
        );

        navigate("/login");

      } catch (error) {

        console.error(error);

        toast.error(
          "Registration failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="flex h-screen items-center justify-center bg-slate-950">

      <form
        onSubmit={handleRegister}
        className="w-96 rounded-xl bg-slate-900 p-6"
      >

        <h1 className="mb-6 text-2xl font-bold">
          Create Account
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
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
          disabled:opacity-50
          "
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-400"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}