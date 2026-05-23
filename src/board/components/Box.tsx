import type { BoardBox } from "../types/boardTypes";
import { useDraggable, useDroppable } from '@dnd-kit/react';

export function Box({ box }: { box: BoardBox }) {
  const { ref: dragRef, isDragSource } = useDraggable({ id: box.id });
  const { ref: dropRef, isDropTarget } = useDroppable({ id: box.id,
    disabled: isDragSource });

  return (
    <div
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      style={{ background: isDropTarget ? 'lightblue' : 'white' }}
      title={box.entries.map((entry) => entry.value).join("\n")}
      className="w-24 h-16 shrink-0 border border-gray-300 rounded-md bg-white p-2 overflow-hidden text-xs flex items-center justify-center text-center cursor-grab"
    >
      {box.entries.map((entry) => entry.value).join("; ")}
    </div>
  )
}
