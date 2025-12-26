"use client";

import React, { useEffect, useState } from "react";

const EditEventModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    event_date: "",
    event_time: "",
    event_title: "",
    event_place: "",
  });

  /* ---------------------------------
     LOAD EXISTING EVENT DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        event_date: field.event_date
          ? field.event_date.split("T")[0]
          : "",
        event_time: field.event_time || "",
        event_title: field.event_title || "",
        event_place: field.event_place || "",
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

    if (!formData.event_date)
      newErrors.event_date = "Event date is required";

    if (!formData.event_time)
      newErrors.event_time = "Event time is required";

    if (!formData.event_title.trim())
      newErrors.event_title = "Event title is required";

    if (!formData.event_place.trim())
      newErrors.event_place = "Event place is required";

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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Event</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* EVENT DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Event Date</label>
              <input
                type="date"
                name="event_date"
                className={`form-control ${
                  errors.event_date ? "is-invalid" : ""
                }`}
                value={formData.event_date}
                onChange={handleChange}
              />
              {errors.event_date && (
                <small className="text-danger">{errors.event_date}</small>
              )}
            </div>

            {/* EVENT TIME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Event Time</label>
              <input
                type="time"
                name="event_time"
                className={`form-control ${
                  errors.event_time ? "is-invalid" : ""
                }`}
                value={formData.event_time}
                onChange={handleChange}
              />
              {errors.event_time && (
                <small className="text-danger">{errors.event_time}</small>
              )}
            </div>

            {/* EVENT TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Event Title</label>
              <input
                type="text"
                name="event_title"
                className={`form-control ${
                  errors.event_title ? "is-invalid" : ""
                }`}
                value={formData.event_title}
                onChange={handleChange}
              />
              {errors.event_title && (
                <small className="text-danger">
                  {errors.event_title}
                </small>
              )}
            </div>

            {/* EVENT PLACE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Event Place</label>
              <input
                type="text"
                name="event_place"
                className={`form-control ${
                  errors.event_place ? "is-invalid" : ""
                }`}
                value={formData.event_place}
                onChange={handleChange}
              />
              {errors.event_place && (
                <small className="text-danger">
                  {errors.event_place}
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
              Update Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
