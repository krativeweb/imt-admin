// app/admin/mandatory-disclosure/components/modals/EditfieldModal.jsx
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
    program_overview: "",
    specializations: "",
    admission_process: "",
    financial_aid: "",
    aicte_approval: "",
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
        

        program_overview: field.program_overview || "",
        specializations: field.specializations || "",
        admission_process: field.admission_process || "",
        financial_aid: field.financial_aid || "",
        aicte_approval: field.aicte_approval || "",
        contact_us: field.contact_us || "",
      });
    }
  }, [field]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner_image: file }));
    }
  };

  const handleSave = () => {
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
            <h5 className="modal-title fw-bold">
              Edit Page SEO & Banner Content
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* SEO FIELDS */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  type="text"
                  name="page_title"
                  className="form-control"
                  value={formData.page_title}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  name="page_slug"
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
                  maxLength={60}
                />
                <small className="text-muted">
                  {formData.meta_title.length}/60
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2"
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
                  maxLength={160}
                />
                <small className="text-muted">
                  {formData.meta_description.length}/160
                </small>
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

            <hr className="my-4" />

            {/* BANNER IMAGE */}
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
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${formData.banner_image}`
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
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={formData.banner_text || ""}
                onEditorChange={(content) =>
                  setFormData((prev) => ({ ...prev, banner_text: content }))
                }
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | fontselect fontsizeselect | " +
                    "bold italic forecolor backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image media table | " +
                    "code fullscreen help",
                  branding: false,
                  content_style:
                    "body { font-family: Inter, sans-serif; font-size: 14px }",
                }}
              />
            </div>
            {/* PGDM Finance Content TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">  Program Overview</label>
              <CmsEditor
                  value={formData.program_overview}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, program_overview: v }))
                  }
                />

             
            </div>
                  {/* Curriculum TEXT */}
              <div className="mb-4">
              <label className="form-label fw-semibold">Specializations</label>
              <CmsEditor
                  value={formData.specializations}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, specializations: v }))
                  }
                />

              
            </div>
                {/* Key Features TEXT */}
                <div className="mb-4">
              <label className="form-label fw-semibold">Admission Process</label>
              <CmsEditor
                  value={formData.admission_process}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, admission_process: v }))
                  }
                />

            
            </div>
              {/* Program Outcome TEXT */}
              <div className="mb-4">
              <label className="form-label fw-semibold">Financial Aid</label>
              <CmsEditor
                  value={formData.financial_aid}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, financial_aid: v }))
                  }
                />

             
            </div>
            {/* Pedagogy Structure TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Aicte Approval</label>
              <CmsEditor
                  value={formData.aicte_approval}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, aicte_approval: v }))
                  }
                />

  
              </div>

             {/* Career Opportunities TEXT */}
             <div className="mb-4">
              <label className="form-label fw-semibold">Contact Us</label>
              <CmsEditor
                  value={formData.contact_us}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, contact_us: v }))
                  }
                />

              
            </div>
              
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
