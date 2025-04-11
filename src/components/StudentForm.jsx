import React, { useState } from "react";

export default function StudentForm({ onSubmit, setTemplate }) {
  const [data, setData] = useState({
    name: "",
    roll: "",
    branch: "",
    year: "",
    college: "",
    classDivision: "",
    allergies: [],
    rack: "",
    busRoute: "",
    photo: null,
  });

  const [formStyle, setFormStyle] = useState("template1");

  const toggleFormStyle = () => {
    setFormStyle((prev) => (prev === "template1" ? "template2" : "template1"));
  };

  const handleChange = (e) => {
    const { name, value, files, options } = e.target;

    if (name === "photo") {
      const reader = new FileReader();
      reader.onload = () => {
        setData((prev) => ({ ...prev, photo: reader.result }));
      };
      if (files[0]) reader.readAsDataURL(files[0]);
    } else if (name === "allergies") {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setData((prev) => ({ ...prev, allergies: selected }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  const styles = {
    template1: {
      container:
        "bg-gradient-to-tr from-purple-100 via-pink-100 to-blue-100 animate-[gradient-x_6s_ease_infinite] border-purple-300",
      heading: "text-3xl font-bold text-purple-700 animate-pulse",
      input:
        "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 hover:shadow-md",
      button:
        "w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-2 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 animate-bounce",
      toggle:
        "px-4 py-1 bg-purple-500 hover:bg-purple-700 text-white text-sm rounded-full transition",
    },
    template2: {
      container:
        "bg-gradient-to-br from-yellow-100 via-green-100 to-teal-100 animate-[gradient-x_8s_linear_infinite] border-green-300",
      heading: "text-4xl font-semibold text-green-800 tracking-wide",
      input:
        "w-full px-5 py-3 border border-gray-400 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 hover:shadow-lg",
      button:
        "w-full bg-gradient-to-l from-teal-1000 to-yellow-400 hover:from-yellow-500 hover:to-teal-500 text-black font-semibold py-3 rounded-2xl shadow-xl transition duration-500 hover:scale-110",
      toggle:
        "px-4 py-1 bg-green-600 hover:bg-green-800 text-white text-sm rounded-full transition",
    },
  };

  const currentStyle = styles[formStyle];

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-xl mx-auto p-6 rounded-3xl shadow-2xl space-y-5 border-2 transition-all duration-500 ${currentStyle.container}`}
    >
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={toggleFormStyle}
          className={currentStyle.toggle}
        >
          Toggle Template
        </button>
      </div>

      <h2 className={`${currentStyle.heading} text-center mb-4`}>
         Student ID Card Form
      </h2>

      {[
        { name: "name", placeholder: "Full Name" },
        { name: "roll", placeholder: "Roll Number" },
        { name: "branch", placeholder: "Branch" },
        { name: "year", placeholder: "Academic Year" },
        { name: "college", placeholder: "College Name" },
        { name: "rack", placeholder: "Rack Number" },
      ].map(({ name, placeholder }) => (
        <input
          key={name}
          type="text"
          name={name}
          placeholder={placeholder}
          value={data[name]}
          onChange={handleChange}
          required
          className={currentStyle.input}
        />
      ))}

      <select
        name="classDivision"
        value={data.classDivision}
        onChange={handleChange}
        required
        className={currentStyle.input}
      >
        <option value="">Select Class & Division</option>
        {["10-A", "10-B", "11-A", "11-B", "12-A", "12-B"].map((div) => (
          <option key={div} value={div}>
            {div}
          </option>
        ))}
      </select>

      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Allergies (Ctrl/Cmd + Click to select multiple):
        </label>
        <select
          name="allergies"
          multiple
          value={data.allergies}
          onChange={handleChange}
          className={`${currentStyle.input} h-28`}
        >
          {["Peanuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy"].map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ),
          )}
        </select>
      </div>

      <select
        name="busRoute"
        value={data.busRoute}
        onChange={handleChange}
        required
        className={currentStyle.input}
      >
        <option value="">Select Bus Route</option>
        {["Route 1", "Route 2", "Route 3", "Route 4"].map((route) => (
          <option key={route} value={route}>
            {route}
          </option>
        ))}
      </select>

      <div>
        <label className="block font-medium text-gray-700">Upload Photo:</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          required
          className={`${currentStyle.input} mt-1`}
        />
        {data.photo && (
          <img
            src={data.photo}
            alt="Preview"
            className="w-24 h-24 rounded-full mt-3 border-4 border-pink-300 mx-auto"
          />
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Choose Template Style:
        </label>
        <select
          onChange={(e) => setTemplate(e.target.value)}
          className={currentStyle.input}
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
      </div>

      <button type="submit" className={currentStyle.button}>
        Generate ID Card
      </button>
    </form>
  );
}
