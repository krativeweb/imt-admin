"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",

    head_cro_message: "",
    final_placements: "",
    placements_procedure: "",
    placements_brochure: "",
    student_committees: "",
    contact_us: "",
  });

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

        head_cro_message: field.head_cro_message || "",
        final_placements: field.final_placements || "",
        placements_procedure: field.placements_procedure || "",
        placements_brochure: field.placements_brochure || "",
        student_committees: field.student_committees || "",
        contact_us: field.contact_us || "",
      });
    }
  }, [field]);

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

  const handleSave = () => {
    setErrors({});
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
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
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Page SEO & Content</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {/* Meta Fields */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  type="text"
                  name="page_title"
                  className="form-control"
                  value={formData.page_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  name="page_slug"
                  className="form-control"
                  value={formData.page_slug}
                  onChange={handleChange}
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

              <div className="col-md-6">
                <label className="form-label fw-semibold">Canonical URL</label>
                <input
                  type="url"
                  name="meta_canonical"
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="my-4" />

            {/* Banner Section */}
            <div className="row g-3 mb-4">
              <div className="col-md-8">
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
                        ? `${process.env.NEXT_PUBLIC_API_URL}${formData.banner_image}`
                        : URL.createObjectURL(formData.banner_image)
                    }
                    className="img-fluid rounded mt-3 border"
                    style={{ maxHeight: "100px" }}
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
            </div>

            <hr className="my-4" />

            {/* CMS Sections */}
            <label className="form-label fw-semibold">Head CRO Message</label>
            <CmsEditor
              value={formData.head_cro_message}
              onChange={(v) =>
                setFormData((p) => ({ ...p, head_cro_message: v }))
              }
            />

            <label className="form-label fw-semibold mt-4">
              Final Placements
            </label>
            <CmsEditor
              value={formData.final_placements}
              onChange={(v) =>
                setFormData((p) => ({ ...p, final_placements: v }))
              }
            />

            <label className="form-label fw-semibold mt-4">
              Placements Procedure
            </label>
            <CmsEditor
              value={formData.placements_procedure}
              onChange={(v) =>
                setFormData((p) => ({ ...p, placements_procedure: v }))
              }
            />

            <label className="form-label fw-semibold mt-4">
              Placements Brochure
            </label>
            <CmsEditor
              value={formData.placements_brochure}
              onChange={(v) =>
                setFormData((p) => ({ ...p, placements_brochure: v }))
              }
            />

            <label className="form-label fw-semibold mt-4">
              Students Committees for Placements
            </label>
            <CmsEditor
              value={formData.student_committees}
              onChange={(v) =>
                setFormData((p) => ({ ...p, student_committees: v }))
              }
            />

            <label className="form-label fw-semibold mt-4">Contact Us</label>
            <CmsEditor
              value={formData.contact_us}
              onChange={(v) => setFormData((p) => ({ ...p, contact_us: v }))}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
