import React from "react";

export default function TemplateSwitcher({ setTemplate }) {
  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Choose Template:</label>
      <select onChange={(e) => setTemplate(e.target.value)} className="input">
        <option value="default">Default</option>
        <option value="modern">Modern</option>
      </select>
    </div>
  );
}
