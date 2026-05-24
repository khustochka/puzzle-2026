import { type BoardBox, type BoxStatus } from "../types/boardTypes";
import { useDraggable, useDroppable } from '@dnd-kit/react';
import { useShake } from "./BoardDnD";

export function Box({ box, capacity }: { box: BoardBox, capacity: number }) {
  const { ref: dragRef, isDragSource } = useDraggable({ id: box.id });
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: box.id,
    disabled: isDragSource
  });
  const { isShaking, isShakingTarget, shakeNonce } = useShake(box.id);

  let status: BoxStatus = 'single';
  if (box.entries.length >= capacity) status = 'full';
  else if (box.entries.length > 1) status = 'multiple';

  return (
    <div
      key={isShaking ? `shake-${shakeNonce}` : 'idle'}
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      title={box.entries.join("\n")}
      className={`${status !== 'single' ? 'font-bold' : ''} ${isShakingTarget ? 'animate-shake border-red-500 hover:border-red-500 bg-red-100' : isShaking ? 'animate-shake border-slate-300 hover:border-slate-400 bg-white' : isDropTarget && !isDragSource ? 'border-green-500 hover:border-green-500 bg-green-100' : 'border-slate-300 hover:border-slate-400 bg-white'} w-24 h-16 shrink-0 border-2 rounded-md p-2 overflow-hidden text-ellipsis text-xs flex items-start justify-center text-center cursor-grab shadow-sm transition hover:shadow-md`}
    >
      {status === 'full' ? box.category.name : box.entries.join("; ")}
    </div>
  )
}
