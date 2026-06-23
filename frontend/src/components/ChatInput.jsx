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
    <div className="border-t border-slate-800 p-4">

      <div className="flex gap-3">

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
        className="flex-1 rounded-xl bg-slate-900 p-3"
      />

        <button
          onClick={submit}
          className="rounded-xl bg-blue-600 px-6"
        >
          Send
        </button>

      </div>

    </div>
  );
}