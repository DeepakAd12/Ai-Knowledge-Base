import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import toast from "react-hot-toast";

import api from "../services/api";
import UploadModal from "../components/UploadModal";

export default function Dashboard() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isUploadOpen, setIsUploadOpen] =useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [flashcards, setFlashcards] = useState("");
  const [summary, setSummary] =  useState("");
  const [featureLoading, setFeatureLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({documents: 0,chunks: 0, });

 const fetchStats = async () => {

  try {

    const response =
      await api.get("stats/");

    setStats(
      response.data
    );

  } catch (error) {

    console.error(error);

  }

};
 useEffect(() => {
  api.get("documents/")
    .then((response) => {
      setDocuments(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
   api.get("stats/")
    .then((response) => {
      setStats(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

const generateFlashcards =
  async (documentId) => {

    setFeatureLoading(true);

    try {

      const response =
        await api.post(
          "flashcards/",
          {
            document_id:
              documentId,
          }
        );

      setFlashcards(
        response.data.flashcards
      );
       toast.success(
        "Flashcards generated"
      );

    } catch (error) {

      console.error(error);
      toast.error(
        "Failed to generate flashcards"
      );
    } finally {

      setFeatureLoading(false);

    }

};
const generateSummary =
  async (documentId) => {

    setFeatureLoading(true);

    try {

      const response =
        await api.post(
          "summary/",
          {
            document_id:
              documentId,
          }
        );

      setSummary(
        response.data.summary
      );
        toast.success(
  "Summary generated"
);

    } catch (error) {

      console.error(error);
    toast.error(
  "Something went wrong"
);
    } finally {

      setFeatureLoading(false);

    }

};

  const handleDelete = async (id) => {

  try {

    await api.delete(
      `documents/${id}/delete/`
    );
    toast.success( "Document deleted" );
    const response =
      await api.get(
        "documents/"
      );

    setDocuments(
      response.data
    );
  await fetchStats();
  } catch (error) {

    console.error(error);
    toast.error(  "Delete failed");
  }
};
  const handleSend = async (question) => {

   setMessages((prev) => [
  ...prev,
  {
    role: "user",
    content: question,
  },
]);

    setLoading(true);

    try {

      const response = await api.post(
        "ask/",
        {
          question,
        }
      );

     setMessages((prev) => [
  ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          sources: response.data.sources || [],
        },
      ]);
    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get answer.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

{deleteId && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

    <div className="bg-slate-900 p-6 rounded-xl w-96">

      <h2 className="text-xl mb-4">
        Delete Document?
      </h2>

      <p className="text-slate-400 mb-6">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() =>
            setDeleteId(null)
          }
          className="bg-slate-700 px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {

            await handleDelete(
              deleteId
            );

            setDeleteId(null);

          }}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}
  return (
    <div className="flex h-screen flex-col md:flex-row bg-slate-950">
        <Sidebar
        documents={documents}
        stats={stats}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        featureLoading={featureLoading}
        onUploadClick={() =>  setIsUploadOpen(true) }
        onDelete={handleDelete}
        generateFlashcards={generateFlashcards}
        generateSummary={generateSummary}
        />

      <div className="flex flex-1 flex-col">

        {(flashcards || summary) ? (

  <div className="flex-1 overflow-y-auto p-6">


<button
  onClick={() => {
    setSummary("");
    setFlashcards("");
  }}
  className="
  mb-4
  rounded-lg
  bg-slate-700
  px-4
  py-2
  hover:bg-slate-600
  "
>
  ← Back
</button>

{summary && (
  <>
    <h2 className="mb-4 text-2xl font-bold">
      📝 Document Summary
    </h2>

    <div className="whitespace-pre-wrap text-slate-300">
      {summary}
    </div>
  </>
)}

{flashcards && (
  <>
    <h2 className="mb-4 text-2xl font-bold">
      📚 Flashcards
    </h2>

    <div className="whitespace-pre-wrap text-slate-300">
      {flashcards}
    </div>
  </>
)}


  </div>

) : (

<>

<ChatWindow
  messages={messages}
  loading={loading}
/>

{featureLoading && (

  <div className="mx-6 mb-4 rounded-xl bg-blue-600/20 p-4 text-center">

    ⏳ Generating content...

  </div>

)}

<ChatInput
  onSend={handleSend}
/>

</>

)}

      </div>
            <UploadModal
            isOpen={isUploadOpen}
            onClose={() =>
                setIsUploadOpen(false)
            }
            onUploadSuccess={async () => {

          const response =
            await api.get(
              "documents/"
            );

          setDocuments(
            response.data
          );

          await fetchStats();

        }}
            
            />
    </div>
  );
}