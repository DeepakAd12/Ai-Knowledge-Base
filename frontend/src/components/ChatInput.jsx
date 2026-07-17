import { useState } from "react";

export default function ChatInput({
  onSend
}) {

  const [question, setQuestion] =
    useState("");

  const submit = () => {

    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-4">

      <div className="mx-auto flex max-w-4xl gap-3">

        <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
        placeholder="Ask anything..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
      />

        <button
          onClick={submit}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
        >
          Send
        </button>

      </div>

    </div>
  );
}