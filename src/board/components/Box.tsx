import { type BoardBox, type BoxStatus } from "../types/boardTypes";
import { useDraggable, useDroppable } from '@dnd-kit/react';
import { useBoxFx } from "./boxFx";

export function Box({ box, capacity }: { box: BoardBox, capacity: number }) {
  const { ref: dragRef, isDragSource } = useDraggable({ id: box.id });
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: box.id,
    disabled: isDragSource
  });
  const { isShaking, isShakingTarget, shakeNonce, isBlinking, blinkNonce } = useBoxFx(box.id);

  let status: BoxStatus = 'single';
  if (box.entries.length >= capacity) status = 'full';
  else if (box.entries.length > 1) status = 'multiple';

  const fxKey = isShaking ? `shake-${shakeNonce}` : isBlinking ? `blink-${blinkNonce}` : 'idle';

  return (
    <div
      key={fxKey}
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      title={box.entries.join("\n")}
      className={`${status !== 'single' ? 'font-bold' : ''} ${isShakingTarget ? 'animate-shake border-red-500 hover:border-red-500 bg-red-100' : isShaking ? 'animate-shake border-slate-300 hover:border-slate-400 bg-white' : isBlinking ? 'animate-merge-blink border-green-500 hover:border-green-500 bg-green-100' : isDropTarget && !isDragSource ? (status === 'full' ? 'border-red-500 hover:border-red-500 bg-red-100' : 'border-green-500 hover:border-green-500 bg-green-100') : status === 'full' ? 'border-slate-700 hover:border-slate-800 bg-slate-700 text-white' : 'border-slate-300 hover:border-slate-400 bg-white'} relative w-24 h-16 shrink-0 border-2 rounded-md p-2 overflow-hidden text-xs flex items-center justify-center text-center cursor-grab shadow-sm transition hover:shadow-md`}
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
}
