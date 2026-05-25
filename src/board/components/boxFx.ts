import { createContext, useContext } from "react";

export type BlinkColor = 'green' | 'blue';

export type FxContextValue = {
  shakingSourceId: string | null;
  shakingTargetId: string | null;
  shakeNonce: number;
  blinkingId: string | null;
  blinkColor: BlinkColor;
  blinkNonce: number;
};

export const FxContext = createContext<FxContextValue>({
  shakingSourceId: null,
  shakingTargetId: null,
  shakeNonce: 0,
  blinkingId: null,
  blinkColor: 'green',
  blinkNonce: 0,
});

export type FxTriggers = {
  triggerShake: (sourceId: string, targetId: string) => void;
  triggerBlink: (id: string, color?: BlinkColor) => void;
};

export const FxTriggersContext = createContext<FxTriggers>({
  triggerShake: () => {},
  triggerBlink: () => {},
});

export function useFxTriggers() {
  return useContext(FxTriggersContext);
}

export function useBoxFx(id: string) {
  const fx = useContext(FxContext);
  return {
    isShaking: fx.shakingSourceId === id || fx.shakingTargetId === id,
    isShakingTarget: fx.shakingTargetId === id,
    shakeNonce: fx.shakeNonce,
    isBlinking: fx.blinkingId === id,
    blinkColor: fx.blinkColor,
    blinkNonce: fx.blinkNonce,
  };
}
