"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const [formData, setFormData] = useState({
    /* SEO */
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",

    /* Banner */
    banner_image: "",
    banner_text: "",

    /* ADMISSION */
    admission_pgdm_email: "",
    admission_fpm_email: "",
    admission_phone: "",
    admission_mobile: "",

    /* CORPORATE RELATIONS GROUP */
    crg_email: "",
    crg_phone: "",
    crg_mobile: "",

    /* SOCIAL LINKS */
    instagram_url: "",
    facebook_url: "",
    linkedin_url: "",
    youtube_url: "",

    /* MAP */
    map_address: "",
    map_embed_url: "",
  });

  /* ---------------- LOAD DATA ---------------- */
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

        admission_pgdm_email: field.admission_pgdm_email || "",
        admission_fpm_email: field.admission_fpm_email || "",
        admission_phone: field.admission_phone || "",
        admission_mobile: field.admission_mobile || "",

        crg_email: field.crg_email || "",
        crg_phone: field.crg_phone || "",
        crg_mobile: field.crg_mobile || "",

        instagram_url: field.instagram_url || "",
        facebook_url: field.facebook_url || "",
        linkedin_url: field.linkedin_url || "",
        youtube_url: field.youtube_url || "",

        map_address: field.map_address || "",
        map_embed_url: field.map_embed_url || "",
      });
    }
  }, [field]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((p) => ({ ...p, banner_image: file }));
  };

  const handleSave = () => {
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) form.append(key, formData[key]);
    });
    onSave(form);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.6)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Contact Information</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">

            {/* SEO */}
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

          

            {/* Banner */}
            <div className="row g-3 mb-4">
            <div className="col-md-12">
            <label className="form-label fw-semibold">Banner Image</label>
            <input type="file" className="form-control" onChange={handleImageUpload} />
            {formData.banner_image && (
              <img
                src={
                  typeof formData.banner_image === "string"
                    ? `${process.env.NEXT_PUBLIC_API_URL}${formData.banner_image}`
                    : URL.createObjectURL(formData.banner_image)
                }
                className="img-fluid rounded mt-2"
                style={{ maxHeight: 100 }}
              />
            )}
            </div>
            <div className="col-md-12">
            <label className="form-label fw-semibold">Banner Text</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.banner_text}
              onEditorChange={(v) => setFormData((p) => ({ ...p, banner_text: v }))}
              init={{ height: 250, menubar: true }}
            />
            </div>
            </div>

           

            {/* ADMISSION */}
{/* ADMISSION */}
<div className="mb-5">
  <h6 className="fw-bold mb-3">Admission</h6>

  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label fw-semibold">PGDM Email</label>
      <input
        type="email"
        className="form-control"
        name="admission_pgdm_email"
        value={formData.admission_pgdm_email}
        onChange={handleChange}
        placeholder="pgdm@example.com"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">FPM Email</label>
      <input
        type="email"
        className="form-control"
        name="admission_fpm_email"
        value={formData.admission_fpm_email}
        onChange={handleChange}
        placeholder="fpm@example.com"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Admission Phone</label>
      <input
        type="text"
        className="form-control"
        name="admission_phone"
        value={formData.admission_phone}
        onChange={handleChange}
        placeholder="+91 33 1234 5678"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Admission Mobile</label>
      <input
        type="text"
        className="form-control"
        name="admission_mobile"
        value={formData.admission_mobile}
        onChange={handleChange}
        placeholder="+91 98765 43210"
      />
    </div>
  </div>
</div>

<hr className="my-4" />


{/* CRG */}
<div className="mb-5">
  <h6 className="fw-bold mb-3">Corporate Relations Group</h6>

  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label fw-semibold">CRG Email</label>
      <input
        type="email"
        className="form-control"
        name="crg_email"
        value={formData.crg_email}
        onChange={handleChange}
        placeholder="crg@example.com"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">CRG Phone</label>
      <input
        type="text"
        className="form-control"
        name="crg_phone"
        value={formData.crg_phone}
        onChange={handleChange}
        placeholder="+91 33 1111 2222"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">CRG Mobile</label>
      <input
        type="text"
        className="form-control"
        name="crg_mobile"
        value={formData.crg_mobile}
        onChange={handleChange}
        placeholder="+91 99999 88888"
      />
    </div>
  </div>
</div>

<hr className="my-4" />


{/* SOCIAL */}
<div className="mb-5">
  <h6 className="fw-bold mb-3">Social Media</h6>

  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label fw-semibold">Instagram URL</label>
      <input
        className="form-control"
        name="instagram_url"
        value={formData.instagram_url}
        onChange={handleChange}
        placeholder="https://instagram.com/yourpage"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Facebook URL</label>
      <input
        className="form-control"
        name="facebook_url"
        value={formData.facebook_url}
        onChange={handleChange}
        placeholder="https://facebook.com/yourpage"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">LinkedIn URL</label>
      <input
        className="form-control"
        name="linkedin_url"
        value={formData.linkedin_url}
        onChange={handleChange}
        placeholder="https://linkedin.com/company/yourpage"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">YouTube URL</label>
      <input
        className="form-control"
        name="youtube_url"
        value={formData.youtube_url}
        onChange={handleChange}
        placeholder="https://youtube.com/@yourchannel"
      />
    </div>
  </div>
</div>

<hr className="my-4" />


{/* MAP */}
<div className="mb-4">
  <h6 className="fw-bold mb-3">Map</h6>

  <div className="mb-3">
    <label className="form-label fw-semibold">Address</label>
    <textarea
      className="form-control"
      name="map_address"
      rows="3"
      value={formData.map_address}
      onChange={handleChange}
      placeholder="Full office address"
    />
  </div>

  <div>
    <label className="form-label fw-semibold">Google Map Embed URL</label>
    <input
      className="form-control"
      name="map_embed_url"
      value={formData.map_embed_url}
      onChange={handleChange}
      placeholder="https://www.google.com/maps/embed?..."
    />
  </div>
</div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
