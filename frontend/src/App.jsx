import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import prism from "prismjs";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState(
    "Enter Code on left and press button to review your code!"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    setIsLoading(true);
    const res = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setIsLoading(false);
    console.log(res.data);
    setReview(res.data);
  }

  return (
    <>
      <div className="h-screen w-screen bg-neutral-950 flex p-4 gap-2 overflow-hidden">
        <div className=" bg-neutral-950 h-full w-[50vw] border rounded-md border-slate-400 relative">
          <div className="scrollbar-container overflow-auto h-full">
            <div className="text-neutral-400 p-2"> Code </div>

            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              padding={15}
              highlight={(code) => highlight(code, languages.js)}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: "white",
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            className="select-none absolute bottom-2 right-2 bg-blue-200 border border-white rounded-xl py-2 px-4 font-bold"
          >
            Review Code
          </button>
        </div>
        <div className="scrollbar-container overflow-auto bg-neutral-900 h-full w-[50vw] border rounded-md border-slate-400 text-white p-4">
          {isLoading ? (
            "Reviewing your code.."
          ) : (
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{ br: () => <br /> }}
            >
              {review}
            </Markdown>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
