import React, { useState } from "react";

const SetPassword: React.FC = () => {
  const email = localStorage.getItem("userEmail") || "";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    preferredTopics: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicSelection = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredTopics: prev.preferredTopics.includes(topic)
        ? prev.preferredTopics.filter((t) => t !== topic)
        : [...prev.preferredTopics, topic],
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Submit to backend
    const response = await fetch("http://localhost:8000/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, email }),
    });

    if (response.ok) {
      localStorage.removeItem("userEmail");
      alert("Password set successfully!");
    }
  };

  const topics = [
    { name: "Politics", color: "rgb(244, 67, 54)" },
    { name: "Business", color: "rgb(63, 81, 181)" },
    { name: "Technology", color: "rgb(33, 150, 243)" },
    { name: "Health", color: "rgb(76, 175, 80)" },
    { name: "Science", color: "rgb(156, 39, 176)" },
    { name: "Entertainment", color: "rgb(233, 30, 99)" },
    { name: "Sports", color: "rgb(249, 168, 37)" },
    { name: "World", color: "rgb(3, 169, 244)" },
    { name: "Opinion", color: "rgb(158, 158, 158)" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Set Password</h2>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="block mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="block mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={email}
          readOnly
          className="block mb-4 px-4 py-2 border rounded-md bg-gray-100"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="block mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="block mb-4 px-4 py-2 border rounded-md"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">Select Preferred Topics</h3>
      <div className="grid grid-cols-3 gap-4">
        {topics.map((topic) => (
          <div
            key={topic.name}
            style={{ backgroundColor: topic.color }}
            onClick={() => handleTopicSelection(topic.name)}
            className={`cursor-pointer p-2 rounded-md text-white ${
              formData.preferredTopics.includes(topic.name)
                ? "ring-2 ring-offset-2 ring-indigo-500"
                : ""
            }`}
          >
            {topic.name}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default SetPassword;
