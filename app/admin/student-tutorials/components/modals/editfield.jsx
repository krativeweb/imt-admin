"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";
const EditStudentTutorialModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,        // only send if replaced
    description: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        name: field.name || "",
        image: null,
        description: field.description || "",
      });
  
      if (field.image) {
        const imageUrl = field.image.startsWith("/api")
          ? `${process.env.NEXT_PUBLIC_API_URL}${field.image}`
          : `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`;
  
        setPreview(imageUrl);
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

    if (!formData.name.trim())
      newErrors.name = "Student name is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length) {
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
              Edit Student Tutorial
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Student Name
              </label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Student Image <span className="text-muted">(optional)</span>
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
                      width: "200px",
                      height: "120px",
                      objectFit: "contain",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      background: "#fff",
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

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>

              <CmsEditor
                  value={formData.description}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, description: v }))
                  }
                />

              {errors.description && (
                <small className="text-danger">
                  {errors.description}
                </small>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Update Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentTutorialModal;
