import { memo } from "react";
import { type BoardBox, type BoxStatus } from "../types/boardTypes";
import { useBoxFx } from "./boxFx";

type BoxProps = {
  box: BoardBox;
  capacity: number;
  isSelected: boolean;
  onClick: (box: BoardBox, capacity: number) => void;
};

export const Box = memo(function Box({ box, capacity, isSelected, onClick }: BoxProps) {
  const { isShaking, isShakingTarget, shakeNonce, isBlinking, blinkColor, blinkNonce } = useBoxFx(box.id);

  let status: BoxStatus = 'single';
  if (box.entries.length >= capacity) status = 'full';
  else if (box.entries.length > 1) status = 'multiple';

  const fxKey = isShaking ? `shake-${shakeNonce}` : isBlinking ? `blink-${blinkNonce}` : 'idle';
  const blinkClasses = blinkColor === 'blue'
    ? 'animate-merge-blink border-blue-500 hover:border-blue-500 bg-blue-100'
    : 'animate-merge-blink border-green-500 hover:border-green-500 bg-green-100';

  return (
    <div
      key={fxKey}
      onClick={() => onClick(box, capacity)}
      title={box.entries.join("\n")}
      className={`${status !== 'single' ? 'font-bold' : ''} ${isShakingTarget ? 'animate-shake border-red-500 hover:border-red-500 bg-red-100' : isShaking ? 'animate-shake border-slate-300 hover:border-slate-400 bg-white' : isBlinking ? blinkClasses : isSelected ? 'border-blue-500 hover:border-blue-600 bg-blue-100 ring-2 ring-blue-300' : status === 'full' ? 'border-slate-700 hover:border-slate-800 bg-slate-700 text-white' : 'border-slate-300 hover:border-slate-400 bg-white'} relative w-24 h-16 shrink-0 border-2 rounded-md p-2 overflow-hidden text-xs flex items-center justify-center text-center cursor-pointer shadow-sm transition hover:shadow-md`}
    >
      {status === 'multiple' && (
        <span className="absolute top-0.5 left-1 text-red-600 font-bold leading-none">
          {box.entries.length}
        </span>
      )}
      <span className="line-clamp-3">
        {status === 'full' ? box.category.name : box.entries.join("; ")}
      </span>
    </div>
  )
});
