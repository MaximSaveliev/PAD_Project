import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the interface for the form state
interface FormData {
  password: string;
  confirmPassword: string;
}

const SetPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send the password to the backend
      const response = await fetch("http://localhost:8000/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          email: localStorage.getItem("userEmail"), // Retrieve email from local storage
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to set password.");
      }

      // Handle success (e.g., navigate to login or dashboard)
      navigate("/login"); // Assuming you have a dashboard page
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to set password. Please try again.");
    }
  };

  return (
    <div className="set-password-page">
      <h2>Set Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default SetPasswordPage;
