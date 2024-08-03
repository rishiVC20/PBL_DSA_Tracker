// ProfilePage.js
import React, { useState } from "react";
import '../styles/Test.css';

const Test = () => {
  const [photo, setPhoto] = useState(
    localStorage.getItem("userPhoto") || "https://via.placeholder.com/150"
  );

  const [institute, setInstitute] = useState(
    localStorage.getItem("userInstitute") ||
      "Pune Institute of Computer Technology"
  );
  
  const [editingInstitute, setEditingInstitute] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      localStorage.setItem("userPhoto", reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInstituteChange = (e) => {
    setInstitute(e.target.value);
  };

  const handleSaveInstitute = () => {
    localStorage.setItem("userInstitute", institute);
    alert("Institute updated successfully!");
    setEditingInstitute(false);
  };

  const handleEditInstitute = () => {
    setEditingInstitute(true);
  };

  return (
    <div className="h-screen bg-white">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Expert</h2>
        <div className="flex items-center mb-4">
          <label htmlFor="photoInput" className="cursor-pointer">
            <img src={photo} alt="Profile" className="w-20 h-20 rounded-full" />
          </label>
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">R_I_S_H_I</h3>
            <p className="text-gray-600">Rishi, Pune, India</p>
            {editingInstitute ? (
              <p className="text-gray-600">
                From{" "}
                <input
                  type="text"
                  value={institute}
                  onChange={handleInstituteChange}
                  className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
                />{" "}
                <button
                  onClick={handleSaveInstitute}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Save
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                From {institute}{" "}
                <button
                  onClick={handleEditInstitute}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Edit
                </button>
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold">Contest Rating</h4>
              <p className="text-gray-600">1515 (max. expert, 1651)</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Contribution</h4>
              <p className="text-gray-600">0</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Friend of</h4>
              <p className="text-gray-600">244 users</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Last Visit</h4>
              <p className="text-gray-600">7 months ago</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Registered</h4>
              <p className="text-gray-600">4 years ago</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Blog Entries</h4>
              <p className="text-gray-600">2</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Your Talks with Rishi</h4>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;