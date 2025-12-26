"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";

const EditResearchModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      existing_images: field.images || [],
      new_images: [],
      remove_images: [],
    });

    setPreviews([]);
  }, [field]);

  /* ---------------------------------
     TEXT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
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
    if (!formData.title.trim()) errs.title = "Title required";
    if (!formData.description.trim())
      errs.description = "Description required";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.6)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Happening</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* TITLE */}
            <input
              name="title"
              className="form-control mb-3"
              value={formData.title}
              onChange={handleChange}
            />

            {/* EXISTING IMAGES */}
            <div className="d-flex flex-wrap gap-3 mb-3">
              {formData.existing_images.map((img, i) => (
                <div key={i} className="position-relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${img}`}
                    style={{ width: 120, height: 80, objectFit: "cover" }}
                  />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => removeExistingImage(img)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* ADD NEW IMAGES */}
            <input
              type="file"
              multiple
              className="form-control mb-3"
              onChange={handleImageChange}
            />

            {/* NEW IMAGE PREVIEWS */}
            <div className="d-flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={i} className="position-relative">
                  <img src={src} style={{ width: 120, height: 80 }} />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => removeNewImage(i)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.description}
              onEditorChange={(v) =>
                setFormData((p) => ({ ...p, description: v }))
              }
              init={{ height: 300 }}
            />
          </div>

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
