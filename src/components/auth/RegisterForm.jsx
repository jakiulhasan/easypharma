import React, { useState } from "react";
import { Link } from "react-router";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
    address: "",
    licenseNumber: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (!file) return;
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  // Glassmorphism Input Style
  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white/50 border border-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white/80 focus:ring-2 focus:ring-blue-400/50 shadow-sm";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-3">
          <label className="group relative cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-black/20 bg-white/40 flex items-center justify-center overflow-hidden backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-105">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Upload
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <input
            type="text"
            name="shopName"
            placeholder="Pharmacy Name"
            required
            value={formData.shopName}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Shop Address"
            required
            value={formData.address}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            type="text"
            name="licenseNumber"
            placeholder="Drug License Number"
            required
            value={formData.licenseNumber}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
        >
          Create Account
        </button>
      </form>
      <h1 className="flex justify-center mt-2">
        Already Have Account ?{" "}
        <Link to="/login" className="text-green-600">
          Login
        </Link>{" "}
      </h1>
    </>
  );
};

export default RegisterForm;
