import { memo } from "react";

type GapProps = {
  rowId: string;
  insertIndex: number;
  active: boolean;
  onClick: (rowId: string, insertIndex: number) => void;
};

export const Gap = memo(function Gap({ rowId, insertIndex, active, onClick }: GapProps) {
  return (
    <div
      onClick={active ? () => onClick(rowId, insertIndex) : undefined}
      className={`w-4 shrink-0 self-stretch rounded-sm transition-colors ${active ? 'cursor-pointer hover:bg-blue-200' : ''}`}
    />
  );
});
