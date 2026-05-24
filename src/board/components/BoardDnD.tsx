import { useCallback, useMemo, useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/abstract";
import { useBoard } from "../hooks/useBoard";
import { findBoxById } from "../reducers/boardSelectors";
import { FxContext, FxTriggersContext, type FxContextValue } from "./boxFx";

export function BoardDnD({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useBoard();
  const [fx, setFx] = useState<FxContextValue>({
    shakingSourceId: null,
    shakingTargetId: null,
    shakeNonce: 0,
    blinkingId: null,
    blinkNonce: 0,
  });
  const shakeTimeoutRef = useRef<number | null>(null);
  const blinkTimeoutRef = useRef<number | null>(null);

  const triggerShake = useCallback((sourceId: string, targetId: string) => {
    if (shakeTimeoutRef.current !== null) window.clearTimeout(shakeTimeoutRef.current);
    setFx((prev) => ({
      ...prev,
      shakingSourceId: sourceId,
      shakingTargetId: targetId,
      shakeNonce: prev.shakeNonce + 1,
    }));
    shakeTimeoutRef.current = window.setTimeout(() => {
      setFx((prev) => ({ ...prev, shakingSourceId: null, shakingTargetId: null }));
      shakeTimeoutRef.current = null;
    }, 450);
  }, []);

  const triggerBlink = useCallback((id: string) => {
    if (blinkTimeoutRef.current !== null) window.clearTimeout(blinkTimeoutRef.current);
    setFx((prev) => ({
      ...prev,
      blinkingId: id,
      blinkNonce: prev.blinkNonce + 1,
    }));
    blinkTimeoutRef.current = window.setTimeout(() => {
      setFx((prev) => ({ ...prev, blinkingId: null }));
      blinkTimeoutRef.current = null;
    }, 800);
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
      triggerBlink(targetId);
    } else {
      triggerShake(sourceId, targetId);
    }
  };

  const triggers = useMemo(
    () => ({ triggerShake, triggerBlink }),
    [triggerShake, triggerBlink]
  );

  return (
    <DragDropProvider onDragEnd={handleDrop}>
      <FxTriggersContext.Provider value={triggers}>
        <FxContext.Provider value={fx}>
          {children}
        </FxContext.Provider>
      </FxTriggersContext.Provider>
    </DragDropProvider>
  );
}
