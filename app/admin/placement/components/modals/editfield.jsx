"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

/* ------------------------------------------------------------------
      STATIC REUSABLE COMPONENTS (PREVENTS RE-RENDER)
------------------------------------------------------------------- */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "35px" }}>
    <h6 className="fw-bold mb-3">{title}</h6>
    {children}
    <hr className="mt-4" />
  </div>
);

const Field = ({ label, children }) => (
  <div className="mb-4">
    <label className="form-label fw-semibold mb-2">{label}</label>
    {children}
  </div>
);

const ImgPreview = ({ src, onRemove }) =>
  src ? (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginTop: "10px",
        marginRight: "15px",
      }}
    >
      <img src={src} className="rounded border" style={{ maxHeight: "120px" }} />

      {/* REMOVE BUTTON */}
      <button
        type="button"
        onClick={onRemove}
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          backgroundColor: "#ff4d4d",
          border: "none",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          lineHeight: "24px",
        }}
      >
        ✕
      </button>
    </div>
  ) : null;

/* ------------------------------------------------------------------
                HELPERS
------------------------------------------------------------------- */
const normalizePath = (p) => {
  if (!p) return p;
  if (typeof p !== "string") return p;
  // handle comma-separated lists accidentally passed
  return p.replace(/\\/g, "/").trim();
};

const joinUrl = (base, path) => {
  if (!base) return path;
  const b = base.replace(/\/+$/, ""); // remove trailing slash(es)
  const p = (path || "").replace(/^\/+/, ""); // remove leading slash(es)
  return `${b}/${p}`;
};

/* ------------------------------------------------------------------
                MAIN COMPONENT START
------------------------------------------------------------------- */
const EditfieldModal = ({ show, onClose, field = {}, onSave }) => {
  const modalBodyRef = useRef(null);

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: null,
    banner_text: "",
    ranking_content: "",
    director_image: null,
    director_message: "",
    corporate_image: null,
    corporate_message: "",
    sector_stat_image: null,
    gallery_images: [],
    new_gallery_images: [],
    remove_gallery_images: [],
  });

  const previews = useRef({});
  const objectUrls = useRef([]);

  /* ------------------------------------------------------------------
          TinyMCE CONFIG — useMemo (prevents re-render)
  ------------------------------------------------------------------- */
  const fullTinyConfig = useMemo(
    () => ({
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
      resize: true,
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      content_css: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
      ],
      extended_valid_elements:
        "span[class],i[class],div[class],img[class],p[class],a[href|class]",
      valid_classes: "*",
    }),
    []
  );

  /* ------------------------------------------------------------------
        LOAD FIELD DATA ON MODAL OPEN
        - normalize gallery_images (string or array)
        - convert backslashes to forward slashes
  ------------------------------------------------------------------- */
  useEffect(() => {
    if (!field) return;

    // normalize gallery images: accept comma-separated string or array
    let gallery = [];
    if (typeof field.gallery_images === "string") {
      gallery = field.gallery_images
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
        .map(normalizePath);
    } else if (Array.isArray(field.gallery_images)) {
      gallery = field.gallery_images.map(normalizePath);
    } else {
      gallery = [];
    }

    setFormData({
      page_title: field.page_title || "",
      page_slug: field.page_slug || "",
      meta_title: field.meta_title || "",
      meta_description: field.meta_description || "",
      meta_keywords: field.meta_keywords || "",
      meta_canonical: field.meta_canonical || "",
      banner_image: field.banner_image || null,
      banner_text: field.banner_text || "",
      ranking_content: field.ranking_content || "",
      director_image: field.director_image || null,
      director_message: field.director_message || "",
      corporate_image: field.corporate_image || null,
      corporate_message: field.corporate_message || "",
      sector_stat_image: field.sector_stat_image || null,
      gallery_images: gallery,
      new_gallery_images: [],
      remove_gallery_images: [],
    });

    previews.current = {};
    // cleanup any object URLs on unmount
    return () => {
      objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrls.current = [];
      previews.current = {};
    };
  }, [field, show]);

  /* ------------------------------------------------------------------
        UPDATE TEXT FIELDS — useCallback (prevents rerender)
  ------------------------------------------------------------------- */
  const update = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  /* ------------------------------------------------------------------
        SCROLL PRESERVE FOR FILE UPLOAD ONLY
  ------------------------------------------------------------------- */
  const preserveScroll = (callback) => {
    const body = modalBodyRef.current;
    const scrollY = body?.scrollTop || 0;
    callback();
    setTimeout(() => {
      if (body) body.scrollTop = scrollY;
    }, 15);
  };

  /* ------------------------------------------------------------------
        HANDLE SINGLE IMAGE UPLOAD
        sets preview (object URL) and stores File in formData
  ------------------------------------------------------------------- */
  const handleSingleFile = (e, key) => {
    preserveScroll(() => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      objectUrls.current.push(url);

      previews.current[key] = url;
      setFormData((prev) => ({ ...prev, [key]: file }));
    });
  };

  const makePreviewUrl = (storedPath) => {
    if (!storedPath) return null;
    const clean = normalizePath(storedPath);
    return joinUrl(process.env.NEXT_PUBLIC_API_URL, clean);
  };

  const getPreview = (key, value) => {
    // first check if we have a freshly added preview (object URL)
    if (previews.current[key]) return previews.current[key];

    // if stored string (path), build public URL
    if (typeof value === "string" && value) {
      return makePreviewUrl(value);
    }
    return null;
  };

  /* ------------------------------------------------------------------
        GALLERY UPLOAD
        - add object previews and store files in new_gallery_images
  ------------------------------------------------------------------- */
  const handleGalleryAdd = (e) => {
    preserveScroll(() => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      const newPreviews = files.map((f) => {
        const u = URL.createObjectURL(f);
        objectUrls.current.push(u);
        return u;
      });

      previews.current.new_gallery_images = [
        ...(previews.current.new_gallery_images || []),
        ...newPreviews,
      ];

      setFormData((prev) => ({
        ...prev,
        new_gallery_images: [...prev.new_gallery_images, ...files],
      }));
    });
  };

  /* ------------------------------------------------------------------
        REMOVE EXISTING GALLERY IMAGE
        - normalize path, remove from gallery_images array
        - add exact DB path to remove_gallery_images array
  ------------------------------------------------------------------- */
  const handleRemoveExistingGallery = (img) => {
    const clean = normalizePath(img);

    setFormData((prev) => {
      const filtered = (prev.gallery_images || []).filter((i) => i !== clean);
      // avoid duplicates in remove list
      const removeList = Array.isArray(prev.remove_gallery_images)
        ? prev.remove_gallery_images.slice()
        : [];
      if (!removeList.includes(clean)) removeList.push(clean);

      return {
        ...prev,
        gallery_images: filtered,
        remove_gallery_images: removeList,
      };
    });
  };

  const handleRemoveNewGallery = (index) => {
    preserveScroll(() => {
      const arr = [...formData.new_gallery_images];
      arr.splice(index, 1);

      setFormData((prev) => ({ ...prev, new_gallery_images: arr }));

      const pArr = previews.current.new_gallery_images || [];
      pArr.splice(index, 1);
      previews.current.new_gallery_images = pArr;
    });
  };

  /* ------------------------------------------------------------------
        SAVE HANDLER
        - builds FormData exactly as backend expects:
          - new_gallery_images[] for files
          - remove_gallery_images[] for exact stored paths
  ------------------------------------------------------------------- */
const handleSave = () => {
  const fd = new FormData();

  // normal fields
  Object.keys(formData).forEach((key) => {
    if (
      key === "new_gallery_images" ||
      key === "remove_gallery_images" ||
      key === "gallery_images"
    )
      return;

    const value = formData[key];
    if (value instanceof File) fd.append(key, value);
    else if (value !== null) fd.append(key, value);
  });

  // ✅ new gallery files
  formData.new_gallery_images.forEach((file) =>
    fd.append("new_gallery_images[]", file)
  );

  // ✅ remaining gallery images (THIS IS IMPORTANT)
  formData.gallery_images.forEach((img) =>
    fd.append("gallery_images[]", img)
  );

  // ✅ removed gallery images
  formData.remove_gallery_images.forEach((img) =>
    fd.append("remove_gallery_images[]", img)
  );

  onSave(fd);
};



  if (!show) return null;

  /* ------------------------------------------------------------------
        FINAL JSX RETURN
  ------------------------------------------------------------------- */
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content p-2">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Page</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div
            className="modal-body"
            ref={modalBodyRef}
            style={{ padding: "20px" }}
          >
            {/* SEO */}
            <Section title="SEO & Metadata">
              <Field label="Page Title">
                <input
                  className="form-control"
                  value={formData.page_title}
                  readOnly
                />
              </Field>

              <Field label="Page Slug">
                <input
                  className="form-control"
                  value={formData.page_slug}
                  readOnly
                />
              </Field>

              <Field label="Meta Title">
                <input
                  className="form-control"
                  value={formData.meta_title}
                  onChange={(e) => update("meta_title", e.target.value)}
                />
              </Field>

              <Field label="Meta Description">
                <textarea
                  className="form-control"
                  value={formData.meta_description}
                  onChange={(e) =>
                    update("meta_description", e.target.value)
                  }
                />
              </Field>
            </Section>

            {/* Banner */}
            <Section title="Banner Section">
              <Field label="Banner Image">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleSingleFile(e, "banner_image")}
                />

                <ImgPreview
                  src={getPreview("banner_image", formData.banner_image)}
                  onRemove={() => update("banner_image", null)}
                />
              </Field>

              <Field label="Banner Text">
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.banner_text}
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
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        padding: 10px;
      }

      /* Always show all tab content inside editor */
      .tab-pane {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .fade {
        opacity: 1 !important;
      }

      /* Disable clicking tabs inside editor */
      .nav-tabs,
      .nav-pills {
        pointer-events: none;
        opacity: 0.7;
      }

      /* Bootstrap tables */
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #dee2e6;
        padding: 8px;
        vertical-align: middle;
      }

      /* Cards */
      .card {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 16px;
      }

      /* Buttons */
      .btn {
        display: inline-block;
        padding: 4px 10px;
        font-size: 13px;
        border-radius: 4px;
      }

      .btn-warning {
        background-color: #ffc107;
        color: #000;
      }
    `,
  }}
  onEditorChange={(content) =>
    update("banner_text", content)
  }
/>

              </Field>
            </Section>

            {/* Ranking */}
            <Section title="Ranking Content">
            <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.ranking_content}
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
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        padding: 10px;
      }

      /* Always show all tab content inside editor */
      .tab-pane {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .fade {
        opacity: 1 !important;
      }

      /* Disable clicking tabs inside editor */
      .nav-tabs,
      .nav-pills {
        pointer-events: none;
        opacity: 0.7;
      }

      /* Bootstrap tables */
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #dee2e6;
        padding: 8px;
        vertical-align: middle;
      }

      /* Cards */
      .card {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 16px;
      }

      /* Buttons */
      .btn {
        display: inline-block;
        padding: 4px 10px;
        font-size: 13px;
        border-radius: 4px;
      }

      .btn-warning {
        background-color: #ffc107;
        color: #000;
      }
    `,
  }}
  onEditorChange={(content) =>
    update("ranking_content", content)
  }
/>

            </Section>

            {/* Director */}
            <Section title="Director Section">
              <Field label="Director Image">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleSingleFile(e, "director_image")}
                />
                <ImgPreview
                  src={getPreview("director_image", formData.director_image)}
                  onRemove={() => update("director_image", null)}
                />
              </Field>

              <Field label="Director Message">
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.director_message}
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
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        padding: 10px;
      }

      /* Always show all tab content inside editor */
      .tab-pane {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .fade {
        opacity: 1 !important;
      }

      /* Disable clicking tabs inside editor */
      .nav-tabs,
      .nav-pills {
        pointer-events: none;
        opacity: 0.7;
      }

      /* Bootstrap tables */
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #dee2e6;
        padding: 8px;
        vertical-align: middle;
      }

      /* Cards */
      .card {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 16px;
      }

      /* Buttons */
      .btn {
        display: inline-block;
        padding: 4px 10px;
        font-size: 13px;
        border-radius: 4px;
      }

      .btn-warning {
        background-color: #ffc107;
        color: #000;
      }
    `,
  }}
  onEditorChange={(content) =>
    update("director_message", content)
  }
/>

              </Field>
            </Section>

            {/* Corporate */}
            <Section title="Head Corporate Relations">
              <Field label="Corporate Image">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleSingleFile(e, "corporate_image")}
                />
                <ImgPreview
                  src={getPreview(
                    "corporate_image",
                    formData.corporate_image
                  )}
                  onRemove={() => update("corporate_image", null)}
                />
              </Field>

              <Field label="Corporate Message">
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.corporate_message}
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
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        padding: 10px;
      }

      /* Always show all tab content inside editor */
      .tab-pane {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .fade {
        opacity: 1 !important;
      }

      /* Disable clicking tabs inside editor */
      .nav-tabs,
      .nav-pills {
        pointer-events: none;
        opacity: 0.7;
      }

      /* Bootstrap tables */
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #dee2e6;
        padding: 8px;
        vertical-align: middle;
      }

      /* Cards */
      .card {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 16px;
      }

      /* Buttons */
      .btn {
        display: inline-block;
        padding: 4px 10px;
        font-size: 13px;
        border-radius: 4px;
      }

      .btn-warning {
        background-color: #ffc107;
        color: #000;
      }
    `,
  }}
  onEditorChange={(content) =>
    update("corporate_message", content)
  }
/>

              </Field>
            </Section>

            {/* Sector */}
            <Section title="Sector-Wise Statistics">
              <Field label="Sector Stats Image">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleSingleFile(e, "sector_stat_image")}
                />
                <ImgPreview
                  src={getPreview(
                    "sector_stat_image",
                    formData.sector_stat_image
                  )}
                  onRemove={() => update("sector_stat_image", null)}
                />
              </Field>
            </Section>

            {/* Gallery */}
            <Section title="Gallery Images">
              <Field label="Existing Images">
                <div className="d-flex flex-wrap gap-3">
                  {formData.gallery_images.map((img, index) => (
                    <ImgPreview
                      key={index}
                      src={makePreviewUrl(img)}
                      onRemove={() => handleRemoveExistingGallery(img)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Batch Profile PGDM Images Upload">
                <input
                  type="file"
                  multiple
                  className="form-control"
                  accept="image/*"
                  onChange={handleGalleryAdd}
                />
                <div className="d-flex flex-wrap gap-3 mt-3">
                  {(previews.current.new_gallery_images || []).map(
                    (src, index) => (
                      <ImgPreview
                        key={index}
                        src={src}
                        onRemove={() => handleRemoveNewGallery(index)}
                      />
                    )
                  )}
                </div>
              </Field>
            </Section>
          </div>

          {/* FOOTER */}
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
