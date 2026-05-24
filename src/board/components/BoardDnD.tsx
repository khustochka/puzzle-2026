import { createContext, useCallback, useContext, useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/abstract";
import { useBoard } from "../hooks/useBoard";
import { findBoxById } from "../reducers/boardSelectors";

type ShakeContextValue = {
  shakingSourceId: string | null;
  shakingTargetId: string | null;
  shakeNonce: number;
};

const ShakeContext = createContext<ShakeContextValue>({
  shakingSourceId: null,
  shakingTargetId: null,
  shakeNonce: 0,
});

export function useShake(id: string) {
  const { shakingSourceId, shakingTargetId, shakeNonce } = useContext(ShakeContext);
  return {
    isShaking: shakingSourceId === id || shakingTargetId === id,
    isShakingTarget: shakingTargetId === id,
    shakeNonce,
  };
}

export function BoardDnD({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useBoard();
  const [shake, setShake] = useState<ShakeContextValue>({
    shakingSourceId: null,
    shakingTargetId: null,
    shakeNonce: 0,
  });
  const timeoutRef = useRef<number | null>(null);

  const triggerShake = useCallback((sourceId: string, targetId: string) => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    setShake((prev) => ({
      shakingSourceId: sourceId,
      shakingTargetId: targetId,
      shakeNonce: prev.shakeNonce + 1,
    }));
    timeoutRef.current = window.setTimeout(() => {
      setShake((prev) => ({
        shakingSourceId: null,
        shakingTargetId: null,
        shakeNonce: prev.shakeNonce,
      }));
      timeoutRef.current = null;
    }, 450);
  }, []);

  const handleDrop = (event: DragEndEvent) => {
    if (event.canceled || !event.operation.source || !event.operation.target) return;

    const sourceId = event.operation.source.id as string;
    const targetId = event.operation.target.id as string;

    if (sourceId === targetId) return;

    const source = findBoxById(state, sourceId);
    const target = findBoxById(state, targetId);

    if (source && target && source.category.id === target.category.id) {
      dispatch({ type: 'mergeBoxes', source, target });
    } else {
      triggerShake(sourceId, targetId);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDrop}>
      <ShakeContext.Provider value={shake}>
        {children}
      </ShakeContext.Provider>
    </DragDropProvider>
  );
}
