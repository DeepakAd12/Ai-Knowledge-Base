import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
export default function UploadModal({
  isOpen,
  onClose,
  onUploadSuccess
}) {

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {

  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  setUploading(true);
  try {

    await api.post(
      "upload/",
      formData
    );

    toast.success(
      "PDF uploaded successfully"
    );

    onUploadSuccess();

    onClose();

  } catch (error) {

    console.error(error);

    toast.error(
      "Upload failed"
    );

  } finally {

    setUploading(false);

  }

};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-slate-900 p-6 rounded-2xl w-96">

        <h2 className="text-xl mb-4">
          Upload PDF
        </h2>

          <input
                type="text"
                placeholder="Document Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full p-3 rounded bg-slate-800 mb-4"
              />

              <div className="mb-4">

  <label className="block mb-2 text-sm">
    PDF File
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setFile(e.target.files[0])
    }
    className="
      w-full
      p-3
      rounded
      bg-slate-800
      text-white
      border
      border-slate-700
    "
  />

  {file && (
    <p className="mt-2 text-green-400 text-sm">
      ✓ {file.name}
    </p>
  )}

</div>

        <div className="flex gap-3 mt-6">

          <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          {uploading
            ? "Uploading..."
            : "Upload"}
        </button>

          <button
            onClick={onClose}
            className="bg-slate-700 px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}