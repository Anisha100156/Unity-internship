import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import IDCard from "./components/IdCard";

export default function App() {
  const [formData, setFormData] = useState(null);
  const [template, setTemplate] = useState("template1");

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="min-h-screen bg-red-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Student ID Card Generator
      </h1>
      <StudentForm onSubmit={handleFormSubmit} setTemplate={setTemplate} />
      {formData && (
        <>
          <h2 className="text-xl font-semibold my-4 text-center">
            Live Preview
          </h2>
          <IDCard data={formData} template={template} />
        </>
      )}
    </div>
  );
}
