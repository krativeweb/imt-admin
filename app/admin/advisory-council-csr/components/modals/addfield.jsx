"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const AddMemberModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    type: "", // ✅ NEW
    name: "",
    designation: "",
    role_expertise: "",
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

    if (!formData.type)
      newErrors.type = "Member type is required";

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    if (!formData.role_expertise.trim())
      newErrors.role_expertise = "Role / Expertise is required";

    if (!formData.image)
      newErrors.image = "Profile image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      type: "",
      name: "",
      designation: "",
      role_expertise: "",
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
              Add Member
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* TYPE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Member Type
              </label>
              <select
                name="type"
                className={`form-select ${errors.type ? "is-invalid" : ""}`}
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="ADVISORY_COUNCIL">
                  Advisory Council
                </option>
                <option value="AFFILIATED_FACULTY_PRACTITIONERS_INNOVATION">
                  Affiliated Faculty & Practitioners (Innovation)
                </option>
              </select>
              {errors.type && (
                <small className="text-danger">{errors.type}</small>
              )}
            </div>

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* DESIGNATION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Designation</label>
              <input
                type="text"
                name="designation"
                className={`form-control ${
                  errors.designation ? "is-invalid" : ""
                }`}
                value={formData.designation}
                onChange={handleChange}
              />
              {errors.designation && (
                <small className="text-danger">{errors.designation}</small>
              )}
            </div>

            {/* ROLE / EXPERTISE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Role / Expertise
              </label>
              <input
                type="text"
                name="role_expertise"
                className={`form-control ${
                  errors.role_expertise ? "is-invalid" : ""
                }`}
                value={formData.role_expertise}
                onChange={handleChange}
              />
              {errors.role_expertise && (
                <small className="text-danger">{errors.role_expertise}</small>
              )}
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                onChange={handleImageChange}
              />
              {errors.image && (
                <small className="text-danger">{errors.image}</small>
              )}

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
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
