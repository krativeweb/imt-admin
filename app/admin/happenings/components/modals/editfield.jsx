"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CmsEditor from "@/components/common/CmsEditor";

const EditResearchModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sortDate: "",
    existing_images: [],
    new_images: [],
    remove_images: [],
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (!field) return;

    setFormData({
      title: field.title || "",
      description: field.description || "",
      sortDate: field.sortDate
        ? field.sortDate.split("T")[0] // ✅ fix for date input
        : "",
      existing_images: field.images || [],
      new_images: [],
      remove_images: [],
    });

    setPreviews([]);
    setErrors({});
  }, [field]);

  /* ---------------------------------
     TEXT / DATE HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: null }));
    }
  };

  /* ---------------------------------
     ADD NEW IMAGES
  --------------------------------- */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));

    setFormData((p) => ({
      ...p,
      new_images: [...p.new_images, ...files],
    }));

    setPreviews((p) => [...p, ...newPreviews]);
  };

  /* ---------------------------------
     REMOVE EXISTING IMAGE
  --------------------------------- */
  const removeExistingImage = (img) => {
    setFormData((p) => ({
      ...p,
      existing_images: p.existing_images.filter((i) => i !== img),
      remove_images: [...p.remove_images, img],
    }));
  };

  /* ---------------------------------
     REMOVE NEW IMAGE
  --------------------------------- */
  const removeNewImage = (index) => {
    setFormData((p) => {
      const arr = [...p.new_images];
      arr.splice(index, 1);
      return { ...p, new_images: arr };
    });

    setPreviews((p) => {
      const arr = [...p];
      URL.revokeObjectURL(arr[index]);
      arr.splice(index, 1);
      return arr;
    });
  };

  /* ---------------------------------
     SAVE
  --------------------------------- */
  const handleSave = () => {
    const errs = {};

    if (!formData.title.trim())
      errs.title = "Title is required";

    if (!formData.description.trim())
      errs.description = "Description is required";

    if (!formData.sortDate)
      errs.sortDate = "Event date is required";

    if (Object.keys(errs).length) {
      setErrors(errs);
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
            <h5 className="modal-title fw-bold">Edit Happening</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            {/* EVENT DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Event Date</label>
              <input
                type="date"
                name="sortDate"
                className={`form-control ${errors.sortDate ? "is-invalid" : ""}`}
                value={formData.sortDate}
                onChange={handleChange}
              />
              {errors.sortDate && (
                <small className="text-danger">{errors.sortDate}</small>
              )}
            </div>

            {/* EXISTING IMAGES */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Existing Happening Images
              </label>

              <div className="d-flex flex-wrap gap-3 mt-2">
                {formData.existing_images.map((img, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${img}`}
                      alt="Existing"
                      style={{
                        width: 200,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeExistingImage(img)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ADD NEW IMAGES */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Upload New Happening Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />

              <div className="d-flex flex-wrap gap-3 mt-3">
                {previews.map((src, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={src}
                      alt="Preview"
                      style={{
                        width: 200,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeNewImage(i)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
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
                <small className="text-danger">{errors.description}</small>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditResearchModal;
