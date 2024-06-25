import { EditorComponent } from "@/components/editor-component";
import { EditorProvider } from "@/context/editor-provider";
import { Suspense } from "react";

export default function App() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Ask a question</h1>

      <div className="mt-9">
        <EditorProvider>
          <EditorComponent type="ask-question" />
        </EditorProvider>
      </div>
    </div>
  );
}
