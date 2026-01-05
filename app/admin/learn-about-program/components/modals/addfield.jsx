"use client";

import React, { useState } from "react";

const AddLearnAboutProgramModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
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
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.video_url.trim()) {
      newErrors.video_url = "Video URL is required";
    } else if (
      !/^https?:\/\/.+/i.test(formData.video_url)
    ) {
      newErrors.video_url = "Enter a valid video URL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    // reset form
    setFormData({
      title: "",
      video_url: "",
    });

    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add Learn About Program
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                className={`form-control ${
                  errors.title ? "is-invalid" : ""
                }`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
              {errors.title && (
                <small className="text-danger">
                  {errors.title}
                </small>
              )}
            </div>

            {/* VIDEO URL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Video URL
              </label>
              <input
                type="text"
                name="video_url"
                className={`form-control ${
                  errors.video_url ? "is-invalid" : ""
                }`}
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
              />
              {errors.video_url && (
                <small className="text-danger">
                  {errors.video_url}
                </small>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              Add 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLearnAboutProgramModal;
