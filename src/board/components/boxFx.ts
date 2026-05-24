import { createContext, useContext } from "react";

export type FxContextValue = {
  shakingSourceId: string | null;
  shakingTargetId: string | null;
  shakeNonce: number;
  blinkingId: string | null;
  blinkNonce: number;
};

export const FxContext = createContext<FxContextValue>({
  shakingSourceId: null,
  shakingTargetId: null,
  shakeNonce: 0,
  blinkingId: null,
  blinkNonce: 0,
});

export function useBoxFx(id: string) {
  const fx = useContext(FxContext);
  return {
    isShaking: fx.shakingSourceId === id || fx.shakingTargetId === id,
    isShakingTarget: fx.shakingTargetId === id,
    shakeNonce: fx.shakeNonce,
    isBlinking: fx.blinkingId === id,
    blinkNonce: fx.blinkNonce,
  };
}
