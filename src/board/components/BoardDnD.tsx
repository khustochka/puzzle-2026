import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/abstract";
import { useBoard } from "../hooks/useBoard";
import { findBoxById } from "../reducers/boardSelectors";

export function BoardDnD({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useBoard();

  const handleDrop = (event: DragEndEvent) => {
    if (event.canceled || !event.operation.source || !event.operation.target) return;

    const sourceId = event.operation.source.id as string;
    const targetId = event.operation.target.id as string;

    const source = findBoxById(state, sourceId);
    const target = findBoxById(state, targetId);


    if (source && target && source.category.id === source.category.id) {
      dispatch({ type: 'mergeBoxes', source, target });
    } else {
      // playRejectAnimation(sourceId); // optional
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDrop}>
      {children}
    </DragDropProvider>
  );
}
