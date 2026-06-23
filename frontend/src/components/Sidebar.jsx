export default function Sidebar({
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
    <div className="w-full md:w-72 border-r border-slate-800 bg-slate-950">

      {/* Header */}
      <div className="p-5">

        <h1 className="text-xl font-bold">
          🤖 AI Knowledge Base
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome,{" "}
          {localStorage.getItem("username") || "User"}
        </p>

      </div>

      {/* Stats */}
      <div className="px-5 pb-3">

        <div className="rounded-xl bg-slate-900 p-3 text-sm">

          <div>
            📄 Documents:{" "}
            {stats?.documents || 0}
          </div>

          <div className="mt-2">
            🧩 Chunks:{" "}
            {stats?.chunks || 0}
          </div>

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
        
       🚪 Logout
        </button>

      </div>

      {/* Search */}
      <div className="px-4 pb-3">

        <input
          type="text"
          placeholder="🔍 Search documents..."
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
      <div className="p-3 overflow-y-auto">

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
              transition
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
                  onClick={() =>
                    onDelete(doc.id)
                  }
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
                  onClick={() =>
                    generateFlashcards(
                      doc.id
                    )
                  }
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
                  onClick={() =>
                    generateSummary(
                      doc.id
                    )
                  }
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
  );
}