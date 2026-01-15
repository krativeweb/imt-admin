"use client";

import React, { useState } from "react";

const AddEventCalendarModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    event_date: "",
    start_time: "",
    end_time: "",
    event_title: "",
    event_place: "",
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

    if (!formData.event_date)
      newErrors.event_date = "Event date is required";

    if (!formData.start_time)
      newErrors.start_time = "Start time is required";

    if (!formData.end_time)
      newErrors.end_time = "End time is required";

    if (
      formData.start_time &&
      formData.end_time &&
      formData.end_time <= formData.start_time
    ) {
      newErrors.end_time = "End time must be after start time";
    }

    if (!formData.event_title.trim())
      newErrors.event_title = "Event title is required";

    if (!formData.event_place.trim())
      newErrors.event_place = "Event place is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      event_date: "",
      start_time: "",
      end_time: "",
      event_title: "",
      event_place: "",
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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Event</h5>
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

            {/* START TIME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Start Time</label>
              <input
                type="time"
                name="start_time"
                className={`form-control ${
                  errors.start_time ? "is-invalid" : ""
                }`}
                value={formData.start_time}
                onChange={handleChange}
              />
              {errors.start_time && (
                <small className="text-danger">{errors.start_time}</small>
              )}
            </div>

            {/* END TIME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">End Time</label>
              <input
                type="time"
                name="end_time"
                className={`form-control ${
                  errors.end_time ? "is-invalid" : ""
                }`}
                value={formData.end_time}
                onChange={handleChange}
              />
              {errors.end_time && (
                <small className="text-danger">{errors.end_time}</small>
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
                <small className="text-danger">{errors.event_title}</small>
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
                <small className="text-danger">{errors.event_place}</small>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventCalendarModal;
