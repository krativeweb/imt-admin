"use client";

import React, { useState } from "react";
import CmsEditor from "@/components/common/CmsEditor";
import { X } from "lucide-react";

const AddClubImtModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  /* -----------------------------
     PREVIEW
  ------------------------------ */
  const [preview, setPreview] = useState({
    tabImage: null,
    mainImage: null,
  });

  /* -----------------------------
     FORM DATA
  ------------------------------ */
  const [formData, setFormData] = useState({
    tab_title: "",
    tab_image: null,
    tab_content: "",
    tab_main_image: null,
    our_events: [], // new files only
  });

  /* ===============================
     INPUT HANDLERS
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));
  };

  /* ===============================
     SINGLE IMAGE HANDLER
  =============================== */
  const handleSingleImage = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((p) => ({ ...p, [fieldName]: file }));

    setPreview((p) => ({
      ...p,
      [fieldName === "tab_image" ? "tabImage" : "mainImage"]:
        URL.createObjectURL(file),
    }));
  };

  /* ===============================
     MULTIPLE EVENT IMAGES
  =============================== */
  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setFormData((p) => ({
      ...p,
      our_events: [...p.our_events, ...files],
    }));
  };

  /* ===============================
     REMOVE NEW EVENT IMAGE
  =============================== */
  const removeEventImage = (index) => {
    setFormData((p) => ({
      ...p,
      our_events: p.our_events.filter((_, i) => i !== index),
    }));
  };

  /* ===============================
     SAVE
  =============================== */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.tab_title.trim())
      newErrors.tab_title = "Tab Title is required";
    if (!formData.tab_image)
      newErrors.tab_image = "Tab Image is required";
    if (!formData.tab_content.trim())
      newErrors.tab_content = "Tab Content is required";
    if (!formData.tab_main_image)
      newErrors.tab_main_image = "Main Image is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const payload = new FormData();
    payload.append("tab_title", formData.tab_title);
    payload.append("tab_content", formData.tab_content);
    payload.append("tab_image", formData.tab_image);
    payload.append("tab_main_image", formData.tab_main_image);

    formData.our_events.forEach((file) =>
      payload.append("our_events", file)
    );

    onSave(payload);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Club IMT Data</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* TAB TITLE */}
            <div className="mb-3">
              <label className="fw-semibold">Tab Title</label>
              <input
                name="tab_title"
                className={`form-control ${errors.tab_title && "is-invalid"}`}
                value={formData.tab_title}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.tab_title}</small>
            </div>

            {/* TAB IMAGE */}
            <div className="mb-3">
              <label className="fw-semibold">Tab Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleSingleImage(e, "tab_image")}
              />
              {preview.tabImage && (
                <img
                  src={preview.tabImage}
                  className="mt-3"
                  style={{ width: 120, height: 80, objectFit: "cover" }}
                />
              )}
            </div>

            {/* TAB CONTENT */}
            <label className="fw-semibold mb-2">Tab Content</label>
            <CmsEditor
              value={formData.tab_content}
              onChange={(v) =>
                setFormData((p) => ({ ...p, tab_content: v }))
              }
            />

            {/* MAIN IMAGE */}
            <div className="mt-4">
              <label className="fw-semibold">Tab Main Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  handleSingleImage(e, "tab_main_image")
                }
              />
              {preview.mainImage && (
                <img
                  src={preview.mainImage}
                  className="mt-3"
                  style={{ width: 120, height: 80, objectFit: "cover" }}
                />
              )}
            </div>

            {/* OUR EVENTS */}
            <div className="mt-4">
              <label className="fw-semibold">Our Events</label>
              <input
                type="file"
                multiple
                className="form-control"
                onChange={handleMultipleImages}
              />

              <div className="d-flex flex-wrap gap-3 mt-3">
                {formData.our_events.map((file, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={URL.createObjectURL(file)}
                      style={{ width: 120, height: 80, objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeEventImage(i)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save Club Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddClubImtModal;
