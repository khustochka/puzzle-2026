import type { EditorCategory } from "../types/editorTypes";
import { useState, useRef, useEffect } from 'react';
import { CategoryForm } from "./CategoryForm";
import { AddCategoryForm } from "./AddCategoryForm"
import { useEditor } from "../hooks/useEditor";

export function EditorBoard() {
  const { state: { categories, newlyAddedCategoryId }, dispatch } = useEditor();
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const newlyAddedCategoryRef = useRef<HTMLLIElement | null>(null);
  const importTextRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (newlyAddedCategoryId !== null) {
      newlyAddedCategoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [newlyAddedCategoryId]);

  useEffect(() => {
    if (!exportDialogOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExportDialogOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exportDialogOpen]);

  const closeImportDialog = () => {
    setImportDialogOpen(false);
    setImportError(null);
  };

  useEffect(() => {
    if (!importDialogOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImportDialog();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [importDialogOpen]);

  const handleImport = () => {
    const importJson = importTextRef.current?.value.trim();
    if (importJson) {
      try {
        const parsedData = JSON.parse(importJson);
        dispatch({ type: 'replaceCategories', data: parsedData });
        closeImportDialog();
      }
      catch {
        setImportError("Failed to parse the data")
      }
    }
  }

  const totalCategories = categories.length;

  const completeCategories = categories.reduce(
    (count, cat) => count + (cat.entries.length >= 45 ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur shadow-sm">
        <div className="flex flex-wrap items-start gap-8 px-6 py-4">
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold tabular-nums text-amber-800 leading-none">
                  {totalCategories}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Categories
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold tabular-nums text-emerald-600 leading-none">
                  {completeCategories}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Complete
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setExportDialogOpen(true)}
                className="text-sm font-medium text-indigo-600 underline decoration-dashed decoration-1 underline-offset-4 hover:text-indigo-800 hover:decoration-solid transition cursor-pointer focus:outline-none focus-visible:outline-none"
              >
                Export
              </button>
              <button
                type="button"
                onClick={() => setImportDialogOpen(true)}
                className="text-sm font-medium text-emerald-600 underline decoration-dashed decoration-1 underline-offset-4 hover:text-emerald-800 hover:decoration-solid transition cursor-pointer focus:outline-none focus-visible:outline-none"
              >
                Import
              </button>
            </div>
          </div>
          <div className="ml-auto flex-1 min-w-65">
            <AddCategoryForm />
          </div>
        </div>
      </div>
      {
        exportDialogOpen &&
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setExportDialogOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-dialog-title"
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 id="export-dialog-title" className="text-lg font-bold text-slate-800">
                Export categories
              </h2>
              <button
                type="button"
                onClick={() => setExportDialogOpen(false)}
                aria-label="Close"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <textarea
                readOnly
                value={JSON.stringify(categories, null, 2)}
                className="w-full h-80 rounded-md border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-700 shadow-inner outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setExportDialogOpen(false)}
                className="rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }

      {
        importDialogOpen &&
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={closeImportDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-dialog-title"
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 id="import-dialog-title" className="text-lg font-bold text-slate-800">
                Import categories
              </h2>
              <button
                type="button"
                onClick={closeImportDialog}
                aria-label="Close"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <label htmlFor="import-textarea" className="block text-sm font-medium text-slate-600 mb-2">
                Paste exported JSON below
              </label>
              <textarea
                id="import-textarea"
                defaultValue=""
                ref={importTextRef}
                onChange={() => importError && setImportError(null)}
                aria-invalid={importError ? true : undefined}
                aria-describedby={importError ? "import-error" : undefined}
                className={`w-full h-64 rounded-md border bg-slate-50 p-3 font-mono text-xs text-slate-700 shadow-inner outline-none focus:ring-2 resize-y ${importError ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
              />
              {importError && (
                <p id="import-error" role="alert" className="mt-2 text-sm font-medium text-red-600">
                  {importError}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeImportDialog}
                className="rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      }

      <div className="w-full py-10 px-4">
        <ol className="list-decimal pl-16 marker:text-3xl marker:font-bold marker:text-indigo-600 flex flex-col gap-6">
          {
            categories.map((category: EditorCategory) => (
              <CategoryForm
                ref={category.id === newlyAddedCategoryId ? newlyAddedCategoryRef : null}
                key={category.id}
                category={category}
              />
            ))
          }
        </ol>
      </div>
    </div >
  )
}
