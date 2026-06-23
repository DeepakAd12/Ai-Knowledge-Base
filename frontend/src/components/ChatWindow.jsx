import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  messages,
  loading
}) {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);
if (messages.length === 0) {
  return (
     <div className="flex flex-col items-center justify-center h-full text-center">

    <h1 className="text-4xl font-bold mb-4">
      🤖 AI Knowledge Base
    </h1>

    <p className="text-slate-400 mb-8">
      Upload PDFs and chat with your documents
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div
    className="
    rounded-xl
    border
    border-slate-800
    bg-slate-900
    p-5
    transition
    hover:scale-105
    hover:border-blue-500
    cursor-pointer
    "
  >
    <div className="text-2xl mb-2">
      📄
    </div>

    <h3 className="font-semibold">
      Upload PDFs
    </h3>

    <p className="mt-2 text-sm text-slate-400">
      Add documents to your knowledge base
    </p>
  </div>

  <div
    className="
    rounded-xl
    border
    border-slate-800
    bg-slate-900
    p-5
    transition
    hover:scale-105
    hover:border-blue-500
    cursor-pointer
    "
  >
    <div className="text-2xl mb-2">
      💬
    </div>

    <h3 className="font-semibold">
      Ask Questions
    </h3>

    <p className="mt-2 text-sm text-slate-400">
      Chat with your uploaded documents
    </p>
  </div>

  <div
    className="
    rounded-xl
    border
    border-slate-800
    bg-slate-900
    p-5
    transition
    hover:scale-105
    hover:border-blue-500
    cursor-pointer
    "
  >
    <div className="text-2xl mb-2">
      📚
    </div>

    <h3 className="font-semibold">
      Flashcards
    </h3>

    <p className="mt-2 text-sm text-slate-400">
      Generate interview questions instantly
    </p>
  </div>

  <div
    className="
    rounded-xl
    border
    border-slate-800
    bg-slate-900
    p-5
    transition
    hover:scale-105
    hover:border-blue-500
    cursor-pointer
    "
  >
    <div className="text-2xl mb-2">
      📝
    </div>

    <h3 className="font-semibold">
      Summaries
    </h3>

    <p className="mt-2 text-sm text-slate-400">
      Create concise document summaries
    </p>
  </div>

</div>

  </div>
  );
}
  return (
    <div className="flex-1 overflow-y-auto p-6">

      {messages.map((msg, index) => (

        <MessageBubble
          key={index}
          message={msg}
        />

      ))}

      {loading && (

  <div className="flex justify-start mb-6">

    <div className="rounded-2xl bg-slate-800 p-4">

      <div className="flex items-center gap-3">

        <div
          className="
          h-4
          w-4
          animate-spin
          rounded-full
          border-2
          border-white
          border-t-transparent
          "
        />

        <span>
          Thinking...
        </span>

      </div>

    </div>

  </div>

)}

      <div ref={bottomRef}></div>

    </div>
  );
}