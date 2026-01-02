"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const EditWorkshopModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    program_director: "",
    image: null, // new image only
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        title: field.title || "",
        company: field.company || "",
        program_director: field.program_director || "",
        image: null,
      });

      if (field.image) {
        setPreview(
          `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
        );
      }
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLERS
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /* ---------------------------------
     IMAGE HANDLERS
  --------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
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

    if (!formData.title.trim())
      newErrors.title = "Program title is required";
    if (!formData.company.trim())
      newErrors.company = "Company is required";
    if (!formData.program_director.trim())
      newErrors.program_director = "Program Director is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
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
              Edit Workshop / Conference
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* PROGRAM TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Program Title
              </label>
              <input
                type="text"
                name="title"
                className={`form-control ${
                  errors.title ? "is-invalid" : ""
                }`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            {/* COMPANY */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Company
              </label>
              <input
                type="text"
                name="company"
                className={`form-control ${
                  errors.company ? "is-invalid" : ""
                }`}
                value={formData.company}
                onChange={handleChange}
              />
              {errors.company && (
                <small className="text-danger">{errors.company}</small>
              )}
            </div>

            {/* PROGRAM DIRECTOR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Program Director
              </label>
              <input
                type="text"
                name="program_director"
                className={`form-control ${
                  errors.program_director ? "is-invalid" : ""
                }`}
                value={formData.program_director}
                onChange={handleChange}
              />
              {errors.program_director && (
                <small className="text-danger">
                  {errors.program_director}
                </small>
              )}
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Image <span className="text-muted">(optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />

              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "220px",
                      height: "130px",
                      objectFit: "cover",
                      borderRadius: "6px",
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
            <button className="btn btn-success" onClick={handleSave}>
              Update Workshop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkshopModal;
