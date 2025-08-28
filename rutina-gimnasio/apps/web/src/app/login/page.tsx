'use client';


import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PasswordInput from '../components/InputPassword';

//! Login page --------------------------------------------------------------
export default function LoginPage() {

  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [errorValidation, setErrorValidation] = useState<{ email?: string; password?: string; general?: string }>({});

  const [isLogin, setIsLogin] = useState(true);
  


  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "The password must be at least 3 characters";
    }

    setErrorValidation(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    const url = isLogin ? "http://localhost:4000/auth/login" : "http://localhost:4000/auth/register";

    const body = isLogin ? { email, password } : { name, email, password };


    try {

      const res = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });



      const data = await res.json();

      if (!res.ok) {
        setErrorValidation({ general: data.message || "Invalid credentials" });
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert("User registered successfully");
        setIsLogin(true);
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };



  return (
    <div
      className="box-border flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bg-login.jpeg')" }}
    >
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg relative overflow-hidden">
        <h2 className="text-3xl font-bold text-black text-center mb-6 transition-all duration-500">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>


        {/* Forms Container */}

        <div className="relative h-80 overflow-hidden">
          {/*  Login Form */}
          <div
            className={`absolute inset-0 transition-transform duration-400 ${isLogin ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorValidation.general && <p className="text-red-600">{errorValidation.general}</p>}
              <div>

                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email.toLocaleLowerCase().trim()}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errorValidation.email && <p className="text-red-600 text-sm">{errorValidation.email}</p>}
              </div>
              <div>
                <PasswordInput value={password} name={"password-login"} onChange={(e) => setPassword(e.target.value)} />
                {errorValidation.password && <p className="text-red-600 text-sm">{errorValidation.password}</p>}
              </div>
              <button type="submit" className="rounded bg-black py-2 text-white hover:bg-gray-700 transition-colors duration-300">
                Enter
              </button>
            </form>
          </div>

          {/*  Sign Up Form */}
          <div
            className={`absolute inset-0 transition-transform duration-400 ${isLogin ? 'translate-x-full' : 'translate-x-0'
              }`}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email.toLocaleLowerCase().trim()}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <PasswordInput value={password} name={"password-register"} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="rounded bg-black py-2 text-white hover:bg-gray-700 transition-colors duration-300">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      {/*  Toggle Link */}
      <p className="text-center mt-4 text-sm text-white">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          onClick={toggleForm}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </span>
      </p>
    </div>
  );
}