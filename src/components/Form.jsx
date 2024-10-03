import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    languages: [],
    state: "",
    hasMedicalConditions: "",
    medicalConditions: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const collectedData = {
        ...formData,
        medicalConditions: formData.hasMedicalConditions
          ? formData.medicalConditions
          : null,
      };

      await axios.post(
        "https://66fbd3be8583ac93b40d6030.mockapi.io/formData",
        collectedData
      );

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        languages: [],
        state: "",
        hasMedicalConditions: false,
        medicalConditions: "",
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "gender":
        setFormData((prev) => ({ ...prev, gender: value }));
        break;
      case "languages":
        setFormData((prev) => ({
          ...prev,
          languages: prev.languages.includes(value)
            ? prev.languages.filter((lang) => lang !== value)
            : [...prev.languages, value],
        }));
        break;
      case "hasMedicalConditions":
        setFormData((prev) => ({
          ...prev,
          hasMedicalConditions: value === "true",
        }));
        break;
      default:
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      className="bg-white p-8 shadow-md max-w-lg m-auto"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
          value={formData.firstName}
          onChange={handleInputChange}
          name="firstName"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
          value={formData.lastName}
          onChange={handleInputChange}
          name="lastName"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
          value={formData.phoneNumber}
          onChange={handleInputChange}
          name="phoneNumber"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Gender
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              id="male"
              type="radio"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={(e) => handleInputChange(e)}
              className="w-4 h-4 border border-gray-300"
              name="gender"
            />
            <label
              htmlFor="male"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              type="radio"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={(e) => handleInputChange(e)}
              className="w-4 h-4 border border-gray-300"
              name="gender"
            />
            <label
              htmlFor="female"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Female
            </label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Languages Spoken
        </label>
        <div className="flex flex-wrap gap-2">
          {["English", "Spanish"].map((lang, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`language-${index}`}
                type="checkbox"
                checked={formData.languages.includes(lang)}
                onChange={(e) => handleInputChange(e)}
                className="w-4 h-4 border border-gray-300"
                name="languages"
                value={lang}
              />
              <label
                htmlFor={`language-${index}`}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {lang}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="state"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          State
        </label>
        <select
          id="state"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
          value={formData.state}
          onChange={handleInputChange}
          name="state"
        >
          <option value="">Select State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Tripura">Tripura</option>
          <option value="Telangana">Telangana</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Do you have any medical conditions?
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              id="hasMedicalConditionsYes"
              type="radio"
              value="true"
              checked={formData.hasMedicalConditions}
              onChange={handleInputChange}
              className="w-4 h-4 border border-gray-300"
              name="hasMedicalConditions"
            />
            <label
              htmlFor="hasMedicalConditionsYes"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="hasMedicalConditionsNo"
              type="radio"
              value="false"
              onChange={handleInputChange}
              className="w-4 h-4 border border-gray-300"
              name="hasMedicalConditions"
            />
            <label
              htmlFor="hasMedicalConditionsNo"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              No
            </label>
          </div>
        </div>
        {formData.hasMedicalConditions && (
          <div className="mt-2">
            <label
              htmlFor="medicalConditions"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              What are the medical conditions?
            </label>
            <input
              type="text"
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
              name="medicalConditions"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
