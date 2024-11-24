import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  preferredTopics: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    preferredTopics: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordShown((cur) => !cur);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    auth.clearError();
  
    const preferredTopicsArray = formData.preferredTopics
      .split(",")
      .map((topic) => topic.trim().toLowerCase()); // Ensure topics are lowercase
  
    try {
      // Pass lowercase topics to the register function
      await auth.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        preferredTopics: preferredTopicsArray,
      });
      await auth.login(formData.email, formData.password);
      navigate("/"); // Redirect to homepage after registration
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 pr-0">
      <div>
        <h3 className="text-3xl font-bold text-primary-text mb-2">Sign Up</h3>
        <p className="mb-16 text-secondary-text font-normal text-[18px]">
          Enter your details to create an account
        </p>

        {auth.error && (
          <div className="mx-auto max-w-[24rem] mb-4">
            <p className="text-red-500 text-center">{auth.error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-primary-text">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-primary-text">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary-text">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@mail.com"
              className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
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
                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
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

          <div className="mb-6">
            <label htmlFor="preferredTopics" className="mb-2 block text-sm font-medium text-primary-text">
              Preferred Topics (comma-separated)
            </label>
            <input
              id="preferredTopics"
              name="preferredTopics"
              type="text"
              value={formData.preferredTopics}
              onChange={handleInputChange}
              placeholder="Tech, Health, Science"
              className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-4 py-3 text-sm font-semibold text-primary-text bg-gray-200 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 hover:text-white dark:bg-gray-800 disabled:bg-gray-400 transition-colors duration-200"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          <p className="mt-4 text-center text-sm text-secondary-text">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-primary-text hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
