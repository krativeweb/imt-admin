"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import CmsEditor from "@/components/common/CmsEditor";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",
    student_life_content: "",
  });

  /* ---------------------------------
     LOAD DATA
  --------------------------------- */
  useEffect(() => {
    if (!field || !show) return;
  
    setFormData({
      page_title: field.page_title || "",
      page_slug: field.page_slug || "",
      meta_title: field.meta_title || "",
      meta_description: field.meta_description || "",
      meta_keywords: field.meta_keywords || "",
      meta_canonical: field.meta_canonical || "",
      banner_image: field.banner_image || "",
      banner_text: field.banner_text || "",
      student_life_content: field.student_life_content || "",
    });
  
    // IMPORTANT: clone array so React does not overwrite changes
    setExistingImages(
      Array.isArray(field.student_life_images)
        ? [...field.student_life_images]
        : []
    );
  
    setNewImages([]);
    setPreviews([]);
  }, [field, show]);
  

  /* ---------------------------------
     CLEAN PREVIEWS
  --------------------------------- */
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const getImageUrl = (path) =>
    path?.startsWith("/api")
      ? `${process.env.NEXT_PUBLIC_API_URL}${path}`
      : path;

  /* ---------------------------------
     HANDLERS
  --------------------------------- */

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((p) => ({ ...p, banner_image: file }));
    }
  };

  const handleLifeImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((p) => [...p, ...files]);
    setPreviews((p) => [
      ...p,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const removeNewImage = (index) => {
    setNewImages((p) => p.filter((_, i) => i !== index));
    setPreviews((p) => p.filter((_, i) => i !== index));
  };

  /* ---------------------------------
     SAVE (IMPORTANT FIX HERE)
  --------------------------------- */
  const handleSave = () => {
    const form = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (v !== null && v !== undefined) {
        form.append(k, v);
      }
    });

    /* SEND EXISTING IMAGES */
    if (existingImages.length === 0) {
      // Explicit signal: user deleted ALL existing images
      form.append("existing_student_life_images[]", "__EMPTY__");
    } else {
      existingImages.forEach((img) =>
        form.append("existing_student_life_images[]", img)
      );
    }

    /* SEND NEW FILES */
    newImages.forEach((file) =>
      form.append("student_life_images", file)
    );

    onSave(form);
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Student Life Page
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* SEO */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  className="form-control"
                  value={formData.page_title}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      page_title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  className="form-control"
                  value={formData.page_slug}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      page_slug: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Title</label>
                <input
                  className="form-control"
                  value={formData.meta_title}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      meta_title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      meta_keywords: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Meta Description
                </label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={formData.meta_description}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      meta_description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Canonical URL</label>
                <input
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      meta_canonical: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <hr />

            {/* Banner */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleBannerUpload}
              />

              {formData.banner_image && (
                <img
                  src={
                    typeof formData.banner_image === "string"
                      ? getImageUrl(formData.banner_image)
                      : URL.createObjectURL(formData.banner_image)
                  }
                  className="img-fluid mt-3 rounded border"
                  style={{ maxHeight: 120 }}
                />
              )}
            </div>

            {/* Banner Text */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Text</label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={formData.banner_text}
                onEditorChange={(v) =>
                  setFormData((p) => ({ ...p, banner_text: v }))
                }
                init={{ height: 280, branding: false }}
              />
            </div>

            <hr />

            {/* Content */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Student Life Content
              </label>
              <CmsEditor
                value={formData.student_life_content}
                onChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    student_life_content: v,
                  }))
                }
              />
            </div>

            {/* Life Images */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Life at IMT Hyderabad Images
              </label>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={getImageUrl(img)}
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeExistingImage(i)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control mb-3"
                onChange={handleLifeImagesChange}
              />

              <div className="d-flex flex-wrap gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={src}
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeNewImage(i)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
