// app/admin/mandatory-disclosure/components/modals/EditfieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";

const pageConfig = {
  "studying-at-imt-hyderabad": {
    label: "Add STUDENT ACTIVITIES & LOGISTICS",
    url: "/admin/student-activities",
  },

  "photo-gallery": {
    label: "Add Photo Gallery Images",
    url: "/admin/photo-gallery",
  },
  "int-association-gallery": {
    label: "Add International  Gallery Images",
    url: "/admin/imt-association-gallery",
  },
  "news": {
    label: "Add News Articles",
    url: "/admin/news",
  },
    "faqs": {
    label: "Add FAQs",
    url: "/admin/faqs",
  },
  // 👉 Add more pages here as required
};
const EditfieldModal = ({ show, onClose, field, onSave, pageSlug }) => {
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const config = pageConfig[field?.page_slug];

  const handleRedirect = () => {
    if (config?.url) {
      router.push(config.url);
    }
  };

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",
    page_content: "",
    gallery_images: [], // ✅ added
    new_gallery_images: [], // ✅ added
    remove_gallery_images: [], // ✅ added
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
        page_content: field.page_content || "",
        gallery_images: field.gallery_images || [], // ✅
        new_gallery_images: [], // fresh for each edit
        remove_gallery_images: [], // fresh reset
      });
    }
  }, [field]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // remove error instantly when user corrects input
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
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      new_gallery_images: [...(prev.new_gallery_images || []), ...files],
    }));
  };

  const handleRemoveGalleryImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((img) => img !== url),
      remove_gallery_images: [...(prev.remove_gallery_images || []), url],
    }));
  };

  const handleSave = () => {
    const newErrors = {};

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const form = new FormData();

    // Append normal data (not files list)
    Object.keys(formData).forEach((key) => {
      if (
        key !== "new_gallery_images" &&
        key !== "remove_gallery_images" &&
        formData[key]
      ) {
        form.append(key, formData[key]);
      }
    });

    // Append newly uploaded gallery images
    if (formData.new_gallery_images) {
      formData.new_gallery_images.forEach((file) => {
        form.append("gallery_images[]", file);
      });
    }

    // Append deleted gallery images (to remove from server)
    if (formData.remove_gallery_images) {
      formData.remove_gallery_images.forEach((file) => {
        form.append("remove_gallery_images", file);
      });
    }

    onSave(form); // send FormData to backend
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
                  className={`form-control ${errors.page_title ? "is-invalid" : ""}`}
                  value={formData.page_title}
                  onChange={handleChange}
                  maxLength={60}
                  readOnly
                />
                {errors.page_title && (
                  <small className="text-danger">{errors.page_title}</small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  name="page_slug"
                  className={`form-control ${errors.page_slug ? "is-invalid" : ""}`}
                  value={formData.page_slug}
                  onChange={handleChange}
                  maxLength={60}
                  readOnly
                />
                {errors.page_title && (
                  <small className="text-danger">{errors.page_slug}</small>
                )}
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
                  className={`form-control ${errors.banner_image ? "is-invalid" : ""}`}
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
                {errors.banner_image && (
                  <small className="text-danger d-block mt-1">
                    {errors.banner_image}
                  </small>
                )}
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="banner_text" className="form-label fw-semibold">
                  Banner Text
                </label>

                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
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
                      "code | fullscreen | help",
                    branding: false,
                    content_style:
                      "body { font-family: 'Inter', sans-serif; font-size: 14px }",
                    resize: true,
                  }}
                />

                {/* Error message */}
                {errors.banner_text && (
                  <div className="mt-2">
                    <small className="text-danger">{errors.banner_text}</small>
                  </div>
                )}
              </div>
            </div>
            {/*
            {formData.page_slug === "international-associations" && (
              <>
                <hr className="my-4" />

                <div className="mb-5">
                  <label className="form-label fw-semibold">
                    Gallery Images (Multiple)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control mb-3"
                    onChange={handleGalleryUpload}
                  />

                  
                  <div className="row g-2">
                    
                    {formData.gallery_images?.map((img, i) => {
                      const finalUrl =
                        img.startsWith("http") || img.startsWith("blob:")
                          ? img
                          : `${process.env.NEXT_PUBLIC_API_URL}${img}`;

                      return (
                        <div
                          key={`existing-${i}`}
                          className="col-3 col-sm-2 col-md-2 col-lg-1"
                        >
                          <div className="position-relative rounded overflow-hidden border">
                            <img
                              src={finalUrl}
                              alt=""
                              className="img-fluid"
                              style={{
                                height: "80px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm rounded-circle position-absolute shadow"
                              style={{
                                top: "4px",
                                right: "4px",
                                width: "22px",
                                height: "22px",
                                fontSize: "12px",
                                lineHeight: "1",
                                zIndex: 10,
                              }}
                              onClick={() => handleRemoveGalleryImage(img)}
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    
                    {formData.new_gallery_images?.map((file, i) => (
                      <div
                        key={`new-${i}`}
                        className="col-3 col-sm-2 col-md-2 col-lg-1"
                      >
                        <div className="position-relative rounded overflow-hidden border">
                          <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="img-fluid"
                            style={{
                              height: "80px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-danger btn-sm rounded-circle position-absolute shadow"
                            style={{
                              top: "4px",
                              right: "4px",
                              width: "22px",
                              height: "22px",
                              fontSize: "12px",
                              lineHeight: "1",
                              zIndex: 10,
                            }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                new_gallery_images:
                                  prev.new_gallery_images.filter(
                                    (_, idx) => idx !== i
                                  ),
                              }))
                            }
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

               
                  {formData.gallery_images?.length +
                    formData.new_gallery_images?.length >
                    0 && (
                    <small className="text-muted d-block mt-2">
                      Total:{" "}
                      {formData.gallery_images.length +
                        formData.new_gallery_images.length}{" "}
                      images
                      {formData.remove_gallery_images.length > 0 &&
                        ` • ${formData.remove_gallery_images.length} will be removed`}
                    </small>
                  )}
                </div>
              </>
            )} */}

            <hr className="my-4" />
            {formData.page_slug !== "international-associations" &&
              formData.page_slug !== "photo-gallery" && (
                <>
                  {/* TinyMCE Editor with Source Code Button */}
                  <label className="form-label fw-semibold d-block mb-2">
                    Page Content
                  </label>
                 <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.page_content}
  init={{
    height: 500,
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
      "code | fullscreen | help",

    branding: false,
    resize: true,

    /* ✅ CRITICAL FIXES */
    verify_html: false,
    cleanup: false,
    cleanup_on_startup: false,
    forced_root_block: false,
    remove_empty: false,

    valid_elements: "*[*]",
    extended_valid_elements: "*[*]",
    valid_children: "+div[div|h2|p|ul|li|span|a]",
    sandbox_iframes: false,
    content_css: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    ],

    content_style: `
      body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
      }
    `,
  }}
  onEditorChange={(content) => {
    setFormData((prev) => ({
      ...prev,
      page_content: content,
    }));
  }}
/>

                </>
              )}
          </div>

          <div className="modal-footer">
            {config && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRedirect}
              >
                {config.label}
              </button>
            )}

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
        f
      </div>
    </div>
  );
};

export default EditfieldModal;
