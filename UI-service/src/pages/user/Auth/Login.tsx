import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  
  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown((cur) => !cur);
  };

  // Traditional Email/Password Login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);
    auth.clearError();

    try {
      await auth.login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsEmailLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    auth.clearError();

    try {
      await auth.loginWithGoogle();
      navigate("/");
    } catch (error) {
      if (error instanceof Error && error.message === "PASSWORD_NOT_SET") {
        navigate("/set-password");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 pr-0">
      <div>
        <h3 className="text-3xl font-bold text-primary-text mb-2">
          Sign In
        </h3>
        <p className="mb-16 text-secondary-text font-normal text-[18px]">
          Enter your email and password to sign in
        </p>

        {auth.error && (
          <div className="mx-auto max-w-[24rem] mb-4">
            <p className="text-red-500 text-center">
              {auth.error}
            </p>
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@mail.com"
              className="w-full px-3 py-3 text-primary-text bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent placeholder:text-secondary-text"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-primary-text">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full px-3 py-3 text-primary-text bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent placeholder:text-secondary-text pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisiblity}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                  {passwordShown ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isEmailLoading}
            className="w-full mt-6 px-4 py-3 text-sm font-semibold text-primary-text bg-gray-200 rounded-lg hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isEmailLoading ? "Signing in..." : "Sign in"}
          </button>

          <div className="mt-4 flex justify-end">
            <a
              href="#"
              className="text-sm font-medium text-secondary-text hover:underline hover:text-primary-text"
            >
              Forgot password
            </a>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full mt-6 px-4 py-3 text-sm font-semibold text-primary-text border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
          </button>

          <p className="mt-4 text-center text-sm text-secondary-text">
            Not registered?{" "}
            <a href="/register" className="font-medium text-primary-text hover:underline">
              Create account
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;