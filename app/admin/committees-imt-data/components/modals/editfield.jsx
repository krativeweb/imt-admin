"use client";

import React, { useEffect, useState } from "react";
import CmsEditor from "@/components/common/CmsEditor";
import { X } from "lucide-react";

const EditCommitteesImtModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});

  /* -----------------------------
     EXISTING EVENTS (FROM DB)
  ------------------------------ */
  const [existingEvents, setExistingEvents] = useState([]);
  const [removedExistingEvents, setRemovedExistingEvents] = useState([]);

  /* -----------------------------
     PREVIEW
  ------------------------------ */
  const [preview, setPreview] = useState({
    tabImage: null,
    mainImage: null,
  });

  /* -----------------------------
     FORM DATA (NEW UPLOADS ONLY)
  ------------------------------ */
  const [formData, setFormData] = useState({
    tab_title: "",
    tab_image: null,
    tab_content: "",
    tab_main_image: null,
    our_events: [],
  });

  /* ===============================
     LOAD EXISTING DATA
  =============================== */
  useEffect(() => {
    if (!field) return;

    setFormData({
      tab_title: field.tab_title || "",
      tab_image: null,
      tab_content: field.tab_content || "",
      tab_main_image: null,
      our_events: [],
    });

    setPreview({
      tabImage: field.tab_image
        ? `${process.env.NEXT_PUBLIC_API_URL}${field.tab_image}`
        : null,
      mainImage: field.tab_main_image
        ? `${process.env.NEXT_PUBLIC_API_URL}${field.tab_main_image}`
        : null,
    });

    setExistingEvents(
      field.our_events?.map(
        (img) => `${process.env.NEXT_PUBLIC_API_URL}${img}`
      ) || []
    );

    setRemovedExistingEvents([]);
  }, [field]);

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
     MULTIPLE IMAGES (NEW EVENTS)
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
     REMOVE EXISTING EVENT IMAGE
  =============================== */
  const removeExistingEvent = (index) => {
    const fullUrl = existingEvents[index];

    const relativePath = fullUrl.replace(
      process.env.NEXT_PUBLIC_API_URL,
      ""
    );

    setRemovedExistingEvents((p) => [...p, relativePath]);
    setExistingEvents((p) => p.filter((_, i) => i !== index));
  };

  /* ===============================
     REMOVE NEW EVENT IMAGE
  =============================== */
  const removeNewEvent = (index) => {
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
      newErrors.tab_title = "Committee Title is required";
    if (!formData.tab_content.trim())
      newErrors.tab_content = "Committee Content is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const payload = new FormData();
    payload.append("tab_title", formData.tab_title);
    payload.append("tab_content", formData.tab_content);

    if (formData.tab_image)
      payload.append("tab_image", formData.tab_image);

    if (formData.tab_main_image)
      payload.append("tab_main_image", formData.tab_main_image);

    formData.our_events.forEach((file) =>
      payload.append("our_events", file)
    );

    removedExistingEvents.forEach((img) =>
      payload.append("remove_events", img)
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
            <h5 className="modal-title fw-bold">
              Edit Committees IMT Data
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* TITLE */}
            <div className="mb-3">
              <label className="fw-semibold">Committee Title</label>
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
              <label className="fw-semibold">Committee Tab Image</label>
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

            {/* CONTENT */}
            <label className="fw-semibold mb-2">
              Committee Content
            </label>
            <CmsEditor
              value={formData.tab_content}
              onChange={(v) =>
                setFormData((p) => ({ ...p, tab_content: v }))
              }
            />

            {/* MAIN IMAGE */}
            <div className="mt-4">
              <label className="fw-semibold">
                Committee Main Image
              </label>
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

            {/* EVENTS */}
            <div className="mt-4">
              <label className="fw-semibold">
                Committee Images
              </label>
              <input
                type="file"
                multiple
                className="form-control"
                onChange={handleMultipleImages}
              />

              <div className="d-flex flex-wrap gap-3 mt-3">

                {existingEvents.map((img, i) => (
                  <div key={`old-${i}`} className="position-relative">
                    <img src={img} style={{ width: 120, height: 80 }} />
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeExistingEvent(i)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {formData.our_events.map((file, i) => (
                  <div key={`new-${i}`} className="position-relative">
                    <img
                      src={URL.createObjectURL(file)}
                      style={{ width: 120, height: 80 }}
                    />
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeNewEvent(i)}
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
              Update Committees Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditCommitteesImtModal;
