import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FxContext, FxTriggersContext, type BlinkColor, type FxContextValue } from "./boxFx";

export function BoardFxProvider({ children }: { children: React.ReactNode }) {
  const [fx, setFx] = useState<FxContextValue>({
    shakingSourceId: null,
    shakingTargetId: null,
    shakeNonce: 0,
    blinkingId: null,
    blinkColor: 'green',
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

  const triggerBlink = useCallback((id: string, color: BlinkColor = 'green') => {
    if (blinkTimeoutRef.current !== null) window.clearTimeout(blinkTimeoutRef.current);
    setFx((prev) => ({
      ...prev,
      blinkingId: id,
      blinkColor: color,
      blinkNonce: prev.blinkNonce + 1,
    }));
    blinkTimeoutRef.current = window.setTimeout(() => {
      setFx((prev) => ({ ...prev, blinkingId: null }));
      blinkTimeoutRef.current = null;
    }, 800);
  }, []);

  useEffect(() => () => {
    if (shakeTimeoutRef.current !== null) window.clearTimeout(shakeTimeoutRef.current);
    if (blinkTimeoutRef.current !== null) window.clearTimeout(blinkTimeoutRef.current);
  }, []);

  const triggers = useMemo(
    () => ({ triggerShake, triggerBlink }),
    [triggerShake, triggerBlink]
  );

  return (
    <FxTriggersContext.Provider value={triggers}>
      <FxContext.Provider value={fx}>
        {children}
      </FxContext.Provider>
    </FxTriggersContext.Provider>
  );
}
