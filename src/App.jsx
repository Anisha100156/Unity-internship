import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    classDivision: "",
    allergies: [],
    photo: null,
    rackNumber: "",
    busRoute: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else if (type === "select-multiple") {
      const selected = Array.from(
        e.target.selectedOptions,
        (option) => option.value,
      );
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎓 Smart Student ID Generator
      </h1>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-4 rounded shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <select
            name="classDivision"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Class & Division</option>
            <option value="10-A">10-A</option>
            <option value="10-B">10-B</option>
            <option value="10-C">10-C</option>
          </select>

          <select
            name="allergies"
            multiple
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Peanuts">Peanuts</option>
            <option value="Gluten">Gluten</option>
            <option value="Dairy">Dairy</option>
            <option value="Pollen">Pollen</option>
          </select>

          <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="text"
            name="rackNumber"
            placeholder="Rack Number"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <select
            name="busRoute"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Bus Route</option>
            <option value="Route 1">Route 1</option>
            <option value="Route 2">Route 2</option>
            <option value="Route 3">Route 3</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-xl font-semibold mb-2">🪪 Student ID Card</h2>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover mx-auto rounded-full mb-2"
            />
          )}
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Roll:</strong> {formData.rollNumber}
          </p>
          <p>
            <strong>Class:</strong> {formData.classDivision}
          </p>
          <p>
            <strong>Allergies:</strong>{" "}
            {formData.allergies.join(", ") || "None"}
          </p>
          <p>
            <strong>Rack:</strong> {formData.rackNumber}
          </p>
          <p>
            <strong>Bus:</strong> {formData.busRoute}
          </p>

          <div className="mt-4">
            <QRCode value={JSON.stringify(formData)} />
          </div>
        </div>
      )}
    </div>
  );
}
