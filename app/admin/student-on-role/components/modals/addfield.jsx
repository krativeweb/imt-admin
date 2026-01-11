"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react"
import CmsEditor from "@/components/common/CmsEditor";

const AddStudentsOnRollModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    joining_year: "",
    specialization: "",
    qualification: "",
    research_interests: "",
    email: "",
    bio: "",
    image: null,
  });

  /* ---------------------------------
     INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /* ---------------------------------
     IMAGE HANDLER
  --------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));

    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.joining_year.trim())
      newErrors.joining_year = "Joining year is required";
    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required";
    if (!formData.research_interests.trim())
      newErrors.research_interests = "Research interests are required";
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    if (!formData.image)
      newErrors.image = "Profile image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      name: "",
      joining_year: "",
      specialization: "",
      qualification: "",
      research_interests: "",
      email: "",
      bio: "",
      image: null,
    });

    setPreview(null);
    setErrors({});
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add Student on Roll
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Vishnu Prasad T"
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            {/* JOINING YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Joining Year</label>
              <input
                type="number"
                name="joining_year"
                className={`form-control ${errors.joining_year ? "is-invalid" : ""}`}
                value={formData.joining_year}
                onChange={handleChange}
                placeholder="2023"
              />
            </div>

            {/* SPECIALIZATION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Specialization</label>
              <input
                type="text"
                name="specialization"
                className={`form-control ${errors.specialization ? "is-invalid" : ""}`}
                value={formData.specialization}
                onChange={handleChange}
                placeholder="HRM"
              />
            </div>

            {/* QUALIFICATION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Qualification</label>
              <input
                type="text"
                name="qualification"
                className={`form-control ${errors.qualification ? "is-invalid" : ""}`}
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Finance & Accounting"
              />
            </div>

            {/* RESEARCH INTERESTS */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Research Interests</label>
              <input
                type="text"
                name="research_interests"
                className={`form-control ${errors.research_interests ? "is-invalid" : ""}`}
                value={formData.research_interests}
                onChange={handleChange}
                placeholder="Capital structuring decisions, CSR, ESG"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="student@imt.edu.in"
              />
            </div>

            {/* BIO */}
            <div className="mb-3">
  <label className="form-label fw-semibold">Short Bio</label>
  <CmsEditor
  value={formData.bio}
  onChange={(v) =>
    setFormData((p) => ({ ...p, bio: v }))
  }
/>

  
</div>


            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                onChange={handleImageChange}
              />

              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={removeImage}
                    style={{ transform: "translate(50%, -50%)" }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentsOnRollModal;
