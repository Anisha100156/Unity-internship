import React from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

export default function IDCard({ data, template }) {
  const downloadCard = () => {
    const node = document.getElementById(`card-${data.roll}`);
    if (!node) {
      alert("Card not found!");
      return;
    }

    htmlToImage.toPng(node).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${data.name}_id_card.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div
        id={`card-${data.roll}`}
        className={`w-96 border rounded-lg p-4 text-center shadow-md ${
          template === "template1" ? "bg-blue-100" : "bg-green-100"
        }`}
      >
        {/* Student Photo */}
        <img
          src={data.photo}
          alt="Student"
          className="h-24 w-24 rounded-full object-cover mx-auto mb-2"
        />

        {/* Basic Details */}
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p>Roll No: {data.roll}</p>
        <p>Branch: {data.branch}</p>
        <p>Year: {data.year}</p>
        <p>College: {data.college}</p>
        <p>Class & Division: {data.classDivision}</p>

        {/* Allergies */}
        {data.allergies.length > 0 && (
          <p>
            Allergies:{" "}
            {data.allergies
              .filter((a) => a) // ignore empty
              .join(", ")}
          </p>
        )}

        {/* Rack and Bus Route */}
        <p>Rack Number: {data.rack}</p>
        <p>Bus Route: {data.busRoute}</p>

        {/* QR Code */}
        <div className="mt-4">
          <QRCode value={data.roll} size={64} />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadCard}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Download ID Card
      </button>
    </div>
  );
}
