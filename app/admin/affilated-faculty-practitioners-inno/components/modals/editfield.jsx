"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const EditAffiliatedFacultyPractitionersModal = ({
  show,
  onClose,
  field,
  onSave,
}) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    role_expertise: "",
    image: null, // optional new image
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        name: field.name || "",
        designation: field.designation || "",
        role_expertise: field.role_expertise || "",
        image: null,
      });

      if (field.image) {
        setPreview(
          field.image.startsWith("http")
            ? field.image
            : `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
        );
      }
    }
  }, [field]);

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
      newErrors.name = "Name is required";

    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    if (!formData.role_expertise.trim())
      newErrors.role_expertise =
        "Role / Area of Expertise is required";

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
              Edit Affiliated Faculty / Practitioner (Innovation)
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
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* DESIGNATION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Designation / Affiliation
              </label>
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
                <small className="text-danger">
                  {errors.designation}
                </small>
              )}
            </div>

            {/* ROLE / EXPERTISE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Role / Area of Expertise
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
                <small className="text-danger">
                  {errors.role_expertise}
                </small>
              )}
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Profile Image <span className="text-muted">(optional)</span>
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
            <button className="btn btn-success" onClick={handleSave}>
              Update Faculty / Practitioner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAffiliatedFacultyPractitionersModal;
