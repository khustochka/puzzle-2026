import { type BoardBox, type BoxStatus } from "../types/boardTypes";
import { useDraggable, useDroppable } from '@dnd-kit/react';

export function Box({ box, capacity }: { box: BoardBox, capacity: number }) {
  const { ref: dragRef, isDragSource } = useDraggable({ id: box.id });
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: box.id,
    disabled: isDragSource
  });

  let status: BoxStatus = 'single';
  if (box.entries.length >= capacity) status = 'full';
  else if (box.entries.length > 1) status = 'multiple';

  return (
    <div
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      style={{ background: isDropTarget ? 'lightblue' : 'white' }}
      title={box.entries.join("\n")}
      className={`${status !== 'single' ? 'font-bold' : ''} w-24 h-16 shrink-0 border border-gray-300 rounded-md bg-white p-2 overflow-hidden text-ellipsis text-xs flex items-start justify-center text-center cursor-grab`}
    >
      {status === 'full' ? box.category.name : box.entries.join("; ")}
    </div>
  )
}
