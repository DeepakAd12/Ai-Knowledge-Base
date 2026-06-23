import ReactMarkdown from "react-markdown";
export default function MessageBubble({
  message
}) {

  if (!message) return null;

  const role = message.role;
const content = message.content;
const isUser = role === "user";

if (content === "Thinking...") {
  return (
    <div className="mb-4">
      <div className="bg-slate-800 rounded-2xl p-4 inline-block animate-pulse">
        Thinking...
      </div>
    </div>
  );
}
  return (
  <div
    className={`mb-6 flex ${
      isUser
        ? "justify-end"
        : "justify-start"
    }`}
  >

    <div className="max-w-3xl">

      <div
        className={`mb-1 text-xs ${
          isUser
            ? "text-right text-slate-400"
            : "text-left text-slate-400"
        }`}
      >
        {isUser
          ? "You"
          : "🤖 Assistant"}
      </div>

      <div
        className={`rounded-2xl p-4 shadow-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-700 bg-slate-800"
        }`}
      >

        <ReactMarkdown>
          {content}
        </ReactMarkdown>

        {!isUser &&
          message.sources?.length > 0 && (

          <div className="mt-4 border-t border-slate-700 pt-3">

            <div className="mb-2 text-xs text-slate-400">
              📚 Sources
            </div>

            {message.sources.map(
              (source, index) => (
                <div
                  key={index}
                  className="
                  mb-1
                  rounded-lg
                  bg-slate-900
                  px-3
                  py-2
                  text-xs
                  text-blue-400
                  "
                >
                  📄 {source.document}
                </div>
              )
            )}

          </div>

        )}

      </div>

    </div>

  </div>
  
      )
}