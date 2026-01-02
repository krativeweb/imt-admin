"use client";

import React, { useEffect, useState } from "react";

const EditConferenceModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    conference: "",
    theme: "",
    support: "",
    journal: "",
    brochure: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        title: field.title || "",
        date: field.date || "",
        conference: field.conference || "",
        theme: field.theme || "",
        support: field.support || "",
        journal: field.journal || "",
        brochure: field.brochure || "",
      });
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
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.conference.trim())
      newErrors.conference = "Conference name is required";
    if (!formData.theme.trim()) newErrors.theme = "Theme is required";

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
              Edit Conference Details
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
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

            {/* DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Date</label>
              <input
                type="text"
                name="date"
                placeholder="January 17 and 18, 2020"
                className={`form-control ${
                  errors.date ? "is-invalid" : ""
                }`}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <small className="text-danger">{errors.date}</small>
              )}
            </div>

            {/* CONFERENCE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Conference
              </label>
              <input
                type="text"
                name="conference"
                className={`form-control ${
                  errors.conference ? "is-invalid" : ""
                }`}
                value={formData.conference}
                onChange={handleChange}
              />
              {errors.conference && (
                <small className="text-danger">
                  {errors.conference}
                </small>
              )}
            </div>

            {/* THEME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Theme</label>
              <input
                type="text"
                name="theme"
                className={`form-control ${
                  errors.theme ? "is-invalid" : ""
                }`}
                value={formData.theme}
                onChange={handleChange}
              />
              {errors.theme && (
                <small className="text-danger">{errors.theme}</small>
              )}
            </div>

            {/* SUPPORT */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Support / Collaborations
              </label>
              <input
                type="text"
                name="support"
                className="form-control"
                value={formData.support}
                onChange={handleChange}
              />
            </div>

            {/* JOURNAL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Journal</label>
              <input
                type="text"
                name="journal"
                className="form-control"
                value={formData.journal}
                onChange={handleChange}
              />
            </div>

            {/* BROCHURE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Brochure</label>
              <input
                type="text"
                name="brochure"
                placeholder="Flyer / URL"
                className="form-control"
                value={formData.brochure}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Update Conference
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditConferenceModal;
