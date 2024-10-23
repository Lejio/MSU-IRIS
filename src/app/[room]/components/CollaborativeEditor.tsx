"use client";

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatars } from "./Avatars";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import { Cursors } from "./Cursors";

// Collaborative code editor with live cursors and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  // Use refs to store yProvider, yDoc, and binding
  const yProviderRef = useRef<LiveblocksYjsProvider | null>(null);
  const yDocRef = useRef<Y.Doc | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);

  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    if (!editorRef || !room || !userInfo) return;

    const yDoc = new Y.Doc();
    yDocRef.current = yDoc;

    const yText = yDoc.getText("monaco");
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    yProviderRef.current = yProvider;

    setProvider(yProvider);

    // Attach user info to Yjs awareness
    yProvider.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
    });

    // Attach Yjs to Monaco
    const binding = new MonacoBinding(
      yText,
      editorRef.getModel() as editor.ITextModel,
      new Set([editorRef]),
      yProvider.awareness as unknown as Awareness
    );
    bindingRef.current = binding;

    // Cleanup function
    return () => {
      // Clear local awareness state before destroying the provider
      if (yProviderRef.current) {
        yProviderRef.current.awareness.setLocalState(null);
        yProviderRef.current.destroy();
      }
      bindingRef.current?.destroy();
      yDocRef.current?.destroy();

      // Reset refs to null
      yProviderRef.current = null;
      bindingRef.current = null;
      yDocRef.current = null;
    };
  }, [editorRef, room, userInfo]);

  const handleOnMount = useCallback((editorInstance: editor.IStandaloneCodeEditor) => {
    setEditorRef(editorInstance);
  }, []);

  return (
    <div className="flex flex-col relative rounded-lg bg-white w-full h-full text-gray-900 overflow-hidden">
      {provider ? <Cursors yProvider={provider} /> : null}
      <div className="flex justify-between items-center">
        <Avatars />
      </div>
      <div className="relative flex-grow">
        <Editor
          onMount={handleOnMount}
          height="100%"
          width="100%"
          theme="vs-light"
          defaultLanguage="typescript"
          defaultValue=""
          options={{
            tabSize: 2,
            padding: { top: 20 },
          }}
        />
      </div>
    </div>
  );
}
