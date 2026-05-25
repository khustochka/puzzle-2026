import type { BoardState, BoardAction, BoardBox, Board } from "../types/boardTypes";
import { constructBoard } from "../data/constructBoard";

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'fileLoadResult':
      if (action.result.ok) {
        try {
          const board = constructBoard(action.result.data);
          return {
            board: board,
            loading: false,
            loadingError: null,
            selectedBox: null,
          }
        }
        catch {
          return {
            board: null,
            loading: false,
            loadingError: "Failed to load board",
            selectedBox: null,
          }
        }
      }
      else
        return {
          board: null,
          loading: false,
          loadingError: "Failed to load board",
          selectedBox: null,
        }
    case 'selectBox':
      if (!state.board) return state;
      return {
        ...state,
        selectedBox: action.box
      }
    case 'boxClicked': {
      if (!state.board) return state;
      const { box, capacity } = action;
      const isFull = box.entries.length >= capacity;
      const selected = state.selectedBox;
      if (!selected) {
        if (isFull) return state;
        return { ...state, selectedBox: box };
      }
      if (selected.id === box.id) return { ...state, selectedBox: null };
      if (selected.category.id === box.category.id) {
        return {
          ...state,
          board: mergeBoxes(state.board, selected, box),
          selectedBox: null,
        };
      }
      return { ...state, selectedBox: null };
    }
    case 'gapClicked': {
      if (!state.board) return state;
      const selected = state.selectedBox;
      if (!selected) return state;
      return {
        ...state,
        board: moveBox(state.board, selected, action.rowId, action.insertIndex),
        selectedBox: null,
      };
    }
    case 'resetBoard':
      return {
        board: null,
        loading: true,
        loadingError: null,
        selectedBox: null,
      }
    default: {
      const _exhaustive: never = action;
      void _exhaustive;
      return state;
    }
  }
}

function moveBox(board: Board, source: BoardBox, targetRowId: string, insertIndex: number): Board {
  const sourceRow = board.rows.find((row) => row.cells.some((cell) => cell.id === source.id));
  if (!sourceRow) return board;
  const sourceIndex = sourceRow.cells.findIndex((cell) => cell.id === source.id);

  if (sourceRow.id === targetRowId && (insertIndex === sourceIndex || insertIndex === sourceIndex + 1)) {
    return board;
  }

  return {
    size: board.size,
    rows: board.rows.map((row) => {
      if (row.id === sourceRow.id && row.id === targetRowId) {
        const without = row.cells.filter((cell) => cell.id !== source.id);
        const adjusted = insertIndex > sourceIndex ? insertIndex - 1 : insertIndex;
        return { ...row, cells: [...without.slice(0, adjusted), source, ...without.slice(adjusted)] };
      }
      if (row.id === sourceRow.id) {
        return { ...row, cells: row.cells.filter((cell) => cell.id !== source.id) };
      }
      if (row.id === targetRowId) {
        return { ...row, cells: [...row.cells.slice(0, insertIndex), source, ...row.cells.slice(insertIndex)] };
      }
      return row;
    }).filter((row) => row.cells.length !== 0),
  };
}

function mergeBoxes(board: Board, source: BoardBox, target: BoardBox) {
  if (source.id === target.id) return board;
  if (source.category.id !== target.category.id) return board;
  return {
    size: board.size,
    rows: board.rows.map((row) => (
      {
        ...row,
        cells: row.cells.map(
          (box) => box.id === target.id ? { ...box, entries: [...box.entries, ...source.entries] } : box
        ).filter(cell => cell.id !== source.id)
      }
    )).filter(row => row.cells.length !== 0)
  }
}
