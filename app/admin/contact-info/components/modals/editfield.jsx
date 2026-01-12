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
<div className="mb-5">
  <h6 className="fw-bold mb-3">Admission</h6>

  <div className="row g-3">
    <div className="col-md-6">
      <input
        className="form-control"
        name="admission_pgdm_email"
        value={formData.admission_pgdm_email}
        onChange={handleChange}
        placeholder="PGDM Email"
      />
    </div>

    <div className="col-md-6">
      <input
        className="form-control"
        name="admission_fpm_email"
        value={formData.admission_fpm_email}
        onChange={handleChange}
        placeholder="FPM Email"
      />
    </div>

    <div className="col-md-6">
      <input
        className="form-control"
        name="admission_phone"
        value={formData.admission_phone}
        onChange={handleChange}
        placeholder="Phone"
      />
    </div>

    <div className="col-md-6">
      <input
        className="form-control"
        name="admission_mobile"
        value={formData.admission_mobile}
        onChange={handleChange}
        placeholder="Mobile"
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
      <input
        className="form-control"
        name="crg_email"
        value={formData.crg_email}
        onChange={handleChange}
        placeholder="CRG Email"
      />
    </div>

    <div className="col-md-6">
      <input
        className="form-control"
        name="crg_phone"
        value={formData.crg_phone}
        onChange={handleChange}
        placeholder="CRG Phone"
      />
    </div>

    <div className="col-md-6">
      <input
        className="form-control"
        name="crg_mobile"
        value={formData.crg_mobile}
        onChange={handleChange}
        placeholder="CRG Mobile"
      />
    </div>
  </div>
</div>

<hr className="my-4" />

{/* SOCIAL */}
<div className="mb-5">
  <h6 className="fw-bold mb-3">Social Media</h6>

  <div className="row g-3">
    {["instagram_url","facebook_url","linkedin_url","youtube_url"].map((f) => (
      <div className="col-md-6" key={f}>
        <input
          className="form-control"
          name={f}
          value={formData[f]}
          onChange={handleChange}
          placeholder={f.replace("_url","").toUpperCase() + " URL"}
        />
      </div>
    ))}
  </div>
</div>

<hr className="my-4" />

{/* MAP */}
<div className="mb-4">
  <h6 className="fw-bold mb-3">Map</h6>

  <textarea
    className="form-control mb-3"
    name="map_address"
    value={formData.map_address}
    onChange={handleChange}
    placeholder="Full Address"
  />

  <input
    className="form-control"
    name="map_embed_url"
    value={formData.map_embed_url}
    onChange={handleChange}
    placeholder="Google Map Embed URL"
  />
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
