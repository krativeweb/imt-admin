"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import CmsEditor from "@/components/common/CmsEditor";

const AddResearchModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    images: [],
    description: "",
    sortOrder: "",
  });

  

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
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
  
    const newPreviews = files.map((file) => URL.createObjectURL(file));
  
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  
    setPreviews((prev) => [...prev, ...newPreviews]);
  
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };
  

  const removeImage = (index) => {
    setFormData((prev) => {
      const imgs = [...prev.images];
      imgs.splice(index, 1);
      return { ...prev, images: imgs };
    });
  
    setPreviews((prev) => {
      const p = [...prev];
      URL.revokeObjectURL(p[index]);
      p.splice(index, 1);
      return p;
    });
  };
  

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  /*const handleSave = () => {
    const newErrors = {};
  
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.images.length)
      newErrors.images = "At least one image is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
  
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

  if (formData.sortOrder === "")
  newErrors.sortOrder = "Sort order is required";
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
  
    formData.images.forEach((file) =>
      fd.append("images[]", file)
    );
  
    onSave(fd);
  
    setFormData({ title: "", images: [], description: "" });
    setPreviews([]);
    onClose();
  };*/
  
  const handleSave = () => {
    const newErrors = {};
  
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.images.length)
      newErrors.images = "At least one image is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
  
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
  
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
  fd.append("sortOrder", formData.sortOrder);
    // ✅ CORRECT FIELD NAME
    formData.images.forEach((file) =>
      fd.append("images", file)
    );
  
    onSave(fd);
  
    setFormData({ title: "", images: [], description: "" ,  sortOrder: "",});
    setPreviews([]);
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
            <h5 className="modal-title fw-bold">Add Happening</h5>
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

            {/* SORT ORDER */}
<div className="mb-3">
  <label className="form-label fw-semibold">Sort Order</label>
  <input
    type="number"
    name="sortOrder"
    className={`form-control ${errors.sortOrder ? "is-invalid" : ""}`}
    value={formData.sortOrder}
    onChange={handleChange}
    placeholder="Higher number = higher priority"
  />
  {errors.sortOrder && (
    <small className="text-danger">{errors.sortOrder}</small>
  )}
</div>


            {/* IMAGE */}
            <div className="mb-3">
  <label className="form-label fw-semibold">
    Happenings Images Upload
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    className={`form-control ${errors.images ? "is-invalid" : ""}`}
    onChange={handleImageChange}
  />

  {errors.images && (
    <small className="text-danger">{errors.images}</small>
  )}

  {/* PREVIEW GRID */}
  <div className="d-flex flex-wrap gap-3 mt-3">
    {previews.map((src, index) => (
      <div key={index} className="position-relative">
        <img
          src={src}
          alt="Preview"
          style={{
            width: "200px",
            height: "120px",
            objectFit: "cover",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />

        <button
          type="button"
          className="btn btn-sm btn-danger position-absolute top-0 end-0"
          onClick={() => removeImage(index)}
          style={{ transform: "translate(50%, -50%)" }}
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
</div>



            {/* DESCRIPTION */}
            <label className="form-label fw-semibold d-block mb-2">
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

          

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Happening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResearchModal;
