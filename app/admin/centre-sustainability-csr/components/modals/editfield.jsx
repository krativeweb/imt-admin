"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import CmsEditor from "@/components/common/CmsEditor";
const pageActions = {
  "centre-digital-transformation": {
    label: "Add Advisory Council",
    url: "/admin/advisory-council-csr",
  },
};
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

    about_details: "",
    news_events: "", // ✅ NEW FIELD
  });

  const handleAddPeople = () => {
    router.push("/admin/advisory-council-csr");
  };
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

        about_details: field.about_details || "",
        news_events: field.news_events || "", // ✅
      });
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------------------------
     IMAGE HANDLER
  --------------------------------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner_image: file }));
    }
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Page Details</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* SEO FIELDS */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  className="form-control"
                  value={formData.page_title}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  className="form-control"
                  value={formData.page_slug}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Title</label>
                <input
                  name="meta_title"
                  className="form-control"
                  value={formData.meta_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
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
                <label className="form-label fw-semibold">Canonical URL</label>
                <input
                  name="meta_canonical"
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />

            {/* BANNER IMAGE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Image</label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
              />

              {/* ✅ SHOW PREVIEW AFTER UPLOAD */}
              {formData.banner_image && (
                <img
                  src={
                    typeof formData.banner_image === "string"
                      ? `${process.env.NEXT_PUBLIC_API_URL}${formData.banner_image}`
                      : URL.createObjectURL(formData.banner_image)
                  }
                  alt="Banner Preview"
                  className="img-fluid rounded mt-3 border"
                  style={{ maxHeight: "120px" }}
                />
              )}
            </div>

            {/* BANNER TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Text</label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
                value={formData.banner_text}
                init={{ height: 250 }}
                onEditorChange={(content) =>
                  setFormData((prev) => ({ ...prev, banner_text: content }))
                }
              />
            </div>

            <hr />

            {/* ABOUT DETAILS */}
            <div className="mb-4">
              <label className="form-label fw-semibold">About Details</label>
              <CmsEditor
                  value={formData.about_details}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, about_details: v }))
                  }
                />
             
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">News & Events</label>
              <CmsEditor
                  value={formData.news_events}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, news_events: v }))
                  }
                />
             
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            {formData.page_slug === "centre-csr" && (
              <button className="btn btn-primary" onClick={handleAddPeople}>
                Add Advisory Council & Affilated Faculty
              </button>
            )}

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
