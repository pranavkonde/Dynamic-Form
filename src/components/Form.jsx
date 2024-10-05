import React, { useState, useEffect } from "react";
import axios from "axios";
import { formData as dynamicFormData } from "../formData";

const Form = () => {
  const [formData, setFormData] = useState(
    dynamicFormData.fields.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? [] : "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem("formDraft");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateField = (field) => {
    const value = formData[field.name];
    const { validation } = field;

    if (validation?.required && !value) {
      return validation.errorMessage.required;
    }
    if (validation?.pattern && !new RegExp(validation.pattern).test(value)) {
      return validation.errorMessage.pattern;
    }
    if (validation?.maxLength && value.length > validation.maxLength) {
      return validation.errorMessage.maxLength;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    dynamicFormData.fields.forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `https://66fbd3be8583ac93b40d6030.mockapi.io/formData/${isEditing}`,
          formData
        );
        alert("Form data updated successfully!");
      } else {
        await axios.post(
          "https://66fbd3be8583ac93b40d6030.mockapi.io/formData",
          formData
        );
        alert("Form submitted successfully!");
      }

      localStorage.removeItem("formDraft");
      setFormData(
        dynamicFormData.fields.reduce((acc, field) => {
          acc[field.name] = field.type === "checkbox" ? [] : "";
          return acc;
        }, {})
      );
      setIsEditing(null);
      fetchAllData();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const saveDraft = () => {
    localStorage.setItem("formDraft", JSON.stringify(formData));
    alert("Form data saved as draft!");
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        "https://66fbd3be8583ac93b40d6030.mockapi.io/formData"
      );
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(data.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://66fbd3be8583ac93b40d6030.mockapi.io/formData/${id}`);
      alert("Form data deleted successfully!");
      fetchAllData(); 
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data. Please try again.");
    }
  };

  const renderInput = (field) => {
    const { type, name, label, options } = field;

    switch (type) {
      case "text":
      case "email":
      case "tel":
        return (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium">
              {label}
            </label>
            <input
              type={type}
              id={name}
              value={formData[name]}
              onChange={handleInputChange}
              name={name}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
            />
            {errors[name] && <p className="text-red-600">{errors[name]}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={name} className="mb-4">
            <label className="block mb-2 text-sm font-medium">{label}</label>
            <div className="flex space-x-4">
              {options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={formData[name] === option.value}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`${name}-${option.value}`} className="ml-2">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors[name] && <p className="text-red-600">{errors[name]}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={name} className="mb-4">
            <label className="block mb-2 text-sm font-medium">{label}</label>
            <div className="flex flex-wrap gap-2">
              {options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={formData[name]?.includes(option.value)}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`${name}-${option.value}`} className="ml-2">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors[name] && <p className="text-red-600">{errors[name]}</p>}
          </div>
        );

      case "select":
        return (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium">
              {label}
            </label>
            <select
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
            >
              <option value="">Select {label}</option>
              {options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[name] && <p className="text-red-600">{errors[name]}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <form className="bg-white p-8 shadow-md max-w-lg m-auto" onSubmit={handleSubmit}>
        {dynamicFormData.fields.map((field) => renderInput(field))}
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={saveDraft}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <div className="m-2">
        <button
          onClick={fetchAllData}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Show Submitted Data
        </button>

        {submittedData.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Submitted Data</h2>
            {submittedData.map((data, idx) => (
              <div key={idx} className="border-b mb-2">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="bg-gray-200 text-gray-900 font-bold py-2 px-4 w-full text-left"
                >
                  {data.firstName} {data.lastName}
                </button>
                {activeAccordion === idx && (
                  <div className="p-4 bg-gray-100">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    <div className="flex justify-between mt-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(data)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
