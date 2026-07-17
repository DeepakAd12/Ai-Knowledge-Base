import {  X } from "lucide-react";
export default function Sidebar({
  isOpen,
  setIsOpen,
  documents,
  stats,
  searchTerm,
  setSearchTerm,
  featureLoading,
  onUploadClick,
  onDelete,
  generateFlashcards,
  generateSummary,
}) {
  const filteredDocuments = documents.filter((doc) =>
    doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>

   <div
  className={`
  fixed inset-y-0 left-0 z-50
  w-80
  bg-slate-950
  border-r border-slate-800
  flex flex-col
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}

  md:relative
  md:translate-x-0
  md:flex
  md:shrink-0
`}
>
  {/* Mobile Close Button */}
<div className="flex justify-end p-4 md:hidden">
  <button
    onClick={() => setIsOpen(false)}
    className="rounded-lg bg-slate-900 p-2 hover:bg-slate-800"
  >
    <X size={22} />
  </button>
</div>
      {/* Header */}

        <div className="border-b border-slate-800 p-6">

          <h1 className="text-2xl font-bold">
            🤖 AI Knowledge Base
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Your AI Study Assistant
          </p>

          <div className="mt-5">

            <p className="text-xs text-slate-500">
              Signed in as
            </p>

            <p className="font-semibold">
              {localStorage.getItem("username") || "User"}
            </p>

          </div>

        </div>

      {/* Stats */}
     {/* Stats */}
<div className="grid grid-cols-2 gap-3 p-4">

  <div className="rounded-xl bg-slate-900 p-4 text-center">

    <p className="text-sm text-slate-400">
      Documents
    </p>

    <p className="mt-2 text-2xl font-bold">
      {stats?.documents || 0}
    </p>

  </div>

  <div className="rounded-xl bg-slate-900 p-4 text-center">

    <p className="text-sm text-slate-400">
      Chunks
    </p>

    <p className="mt-2 text-2xl font-bold">
      {stats?.chunks || 0}
    </p>

  </div>

</div>

      {/* Actions */}
      <div className="p-4">

        <button
          onClick={onUploadClick}
          className="
          w-full
          rounded-xl
          bg-blue-600
          p-3
          hover:bg-blue-700
          transition
          "
        >
          ⬆️ Upload PDF
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("username");
            window.location.href = "/login";
          }}
          className="
          mt-3
          w-full
          rounded-xl
          bg-red-600
          p-3
          hover:bg-red-700
          transition
          "
        >
        
       🚪 Sign Out
        </button>

      </div>

      {/* Search */}
      <div className="px-4 pb-3">

        <input
          type="text"
          placeholder="🔍 Search your documents..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
          w-full
          rounded-lg
          border
          border-slate-800
          bg-slate-900
          p-3
          text-sm
          outline-none
          focus:border-blue-500
          "
        />

      </div>

      {/* Documents */}
      <div
        className="
        flex-1
        overflow-y-auto
        p-3
        "
        >

        {filteredDocuments.length === 0 ? (

          <div
            className="
            rounded-xl
            border
            border-slate-800
            p-4
            text-center
            text-slate-400
            "
          >

            <div className="mb-2 text-3xl">
              📄
            </div>

            <p className="font-medium">
              No documents found
            </p>

            <p className="mt-2 text-sm">
              Upload your first PDF
              to get started.
            </p>

          </div>

        ) : (

          filteredDocuments.map((doc) => (

            <div
              key={doc.id}
              className="
              mb-3
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              p-3
              hover:border-slate-700
                hover:scale-[1.02]
                transition-all
                duration-200
              "
            >

              <div className="flex items-center justify-between">

                <span
                  className="
                    max-w-40
                    truncate
                    font-medium
                    "
                >
                  📄 {doc.title}
                </span>

                <button
                  onClick={() => {
                    onDelete(doc.id);
                    setIsOpen(false);
                  }}
                  className="
                  text-red-400
                  hover:text-red-300
                  "
                >
                  🗑️
                </button>

              </div>

              <div className="mt-3 flex gap-2">

                <button
                  disabled={featureLoading}
                  onClick={() => {
                    generateFlashcards(doc.id);
                    setIsOpen(false);
                  }}
                  className="
                  flex-1
                  rounded-lg
                  bg-purple-600
                  p-2
                  text-sm
                  hover:bg-purple-700
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  "
                >
                  📚
                </button>

                <button
                  disabled={featureLoading}
                  onClick={() => {
                    generateSummary(doc.id);
                    setIsOpen(false);
                  }}
                  className="
                  flex-1
                  rounded-lg
                  bg-green-600
                  p-2
                  text-sm
                  hover:bg-green-700
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  "
                >
                  📝
                </button>

              </div>

            </div>

          ))

        )}

      </div>

   </div>
</>
);
}