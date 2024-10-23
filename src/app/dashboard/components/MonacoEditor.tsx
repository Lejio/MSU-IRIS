'use client'
import React from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import { useEffect, useMemo, useState, useRef } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import { Monaco  } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
type File = {
  name: string
  language: string
  value: string
}
type StatusEvent = {
  status: 'connected' | 'disconnected';
};
  
  const files: Record<string, File> = {
    "file1.js": {
      name: "file1.js",
      language: "javascript",
      value: "const a = 1;"
    },
    "file2.js": {
      name: "file2.js",
      language: "javascript",
      value: "const b = 2;"
    },
    "file3.js": {
      name: "file3.js",
      language: "javascript",
      value: "const c = 3;"
    }
  }
  

export default function MonacoEditor() {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const ydoc = useMemo(() => new Y.Doc(), []);
    const [editor, setEditor] = useState<any|null>(null)
    const [provider, setProvider] = useState<WebsocketProvider|null>(null)
    const [binding, setBinding] = useState<MonacoBinding|null>(null)
    const [fileName, setFileName] = useState('file1.js');
    const file = files[fileName];
  
    useEffect(() => {
        editorRef.current?.focus();
    }, [file?.name]);
  
    // this effect manages the lifetime of the Yjs document and the provider
    useEffect(() => {
      const provider = new WebsocketProvider('ws://127.0.0.1:8787', 'my-collab-room', ydoc)

      provider.on('status', (event: StatusEvent) => {
        console.log('WebSocket status:', event.status); // Logs connection status
      });

      setProvider(provider)
      return () => {
        provider?.destroy()
        ydoc.destroy()
      }
    }, [ydoc])
  
    // this effect manages the lifetime of the editor binding
    useEffect(() => {
      if (provider == null || editor == null) {
        return
      }
      console.log('reached', provider)
      const binding = new MonacoBinding(ydoc.getText(), editor.getModel()!, new Set([editor]), provider?.awareness)
      setBinding(binding)
      return () => {
        binding.destroy()
      }
    }, [ydoc, provider, editor])
  return (
    <div className=' w-[90vw]'>
        <div className=' flex flex-row gap-5'>
            <button
            disabled={fileName === "file1.js"}
            onClick={() => setFileName("file1.js")}
            >
            script.js
            </button>
            <button
            disabled={fileName === "file2.js"}
            onClick={() => setFileName("file2.js")}
            >
            style.css
            </button>
            <button
            disabled={fileName === "file3.js"}
            onClick={() => setFileName("file3.js")}
            >
            index.html
            </button>
      </div>
      <Editor
        height="80vh"
        theme="vs-dark"
        path={file?.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </div>
  )
}
