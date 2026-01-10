// app/admin/campus-tour/components/modals/EditfieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",

    /* ✅ CAMPUS TOUR */
    video_title: "",
    video_url: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        page_title: field.page_title || "",
        page_slug: field.page_slug || "",
        meta_title: field.meta_title || "",
        meta_description: field.meta_description || "",
        meta_keywords: field.meta_keywords || "",
        meta_canonical: field.meta_canonical || "",
        banner_image: field.banner_image || "",
        banner_text: field.banner_text || "",
        video_title: field.video_title || "",
        video_url: field.video_url || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     HELPERS
  --------------------------------- */
  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("/api")
      ? `${process.env.NEXT_PUBLIC_API_URL}${path}`
      : path;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner_image: file }));
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
  
    // youtu.be short link
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
  
    // youtube watch link
    if (url.includes("youtube.com/watch")) {
      const params = new URL(url).searchParams;
      const id = params.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  
    // already embed
    if (url.includes("youtube.com/embed")) {
      return url;
    }
  
    // fallback (vimeo / others)
    return url;
  };
  

  /* ---------------------------------
     SAVE
  --------------------------------- */
  const handleSave = () => {
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        form.append(key, formData[key]);
      }
    });

    onSave(form);
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
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Campus Tour Page
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* ================= SEO ================= */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.page_title}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.page_slug}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Title</label>
                <input
                  type="text"
                  name="meta_title"
                  className="form-control"
                  value={formData.meta_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  rows="3"
                  className="form-control"
                  value={formData.meta_description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="meta_canonical"
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />

            {/* ================= BANNER ================= */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
              />

              {formData.banner_image && (
                <img
                  src={
                    typeof formData.banner_image === "string"
                      ? getImageUrl(formData.banner_image)
                      : URL.createObjectURL(formData.banner_image)
                  }
                  className="img-fluid rounded mt-3 border"
                  style={{ maxHeight: "120px" }}
                />
              )}
            </div>


              <div className="col-12">
                <label className="form-label fw-semibold">Banner Text</label>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  value={formData.banner_text}
                  onEditorChange={(content) =>
                    setFormData((prev) => ({ ...prev, banner_text: content }))
                  }
                  init={{
                    height: 300,
                    menubar: true,
                    branding: false,
                    verify_html: false,
                  }}
                />
              </div>

            <hr />

            {/* ================= CAMPUS TOUR VIDEO ================= */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Video Title</label>
                <input
                  type="text"
                  name="video_title"
                  className="form-control"
                  value={formData.video_title}
                  onChange={handleChange}
                  placeholder="IMT Hyderabad Campus Tour"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Video URL</label>
                <input
                  type="url"
                  name="video_url"
                  className="form-control"
                  value={formData.video_url}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/XXXX"
                />
              </div>
            </div>

            {/* VIDEO PREVIEW */}
            {formData.video_url && (
              <div className="mb-4">
                <label className="form-label fw-semibold">Video Preview</label>
                <div className="ratio ratio-16x9">
                <iframe
                    src={getEmbedUrl(formData.video_url)}
                    title={formData.video_title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
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
