import { useEffect, useState } from "react";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { BoardContext } from "../contexts/BoardContext";
import type { Board, BoardState } from "../types/boardTypes";

export function BoardProvider({ children, initialBoard }: { children: React.ReactNode, initialBoard: Board }) {
  const [savedBoard, setSavedBoard] = useLocalStorage('puzzle-board', initialBoard)

  const initialState = {
    board: savedBoard,
  }
  //const [state, dispatch] = useReducer(editorReducer, initialState);
  const [state] = useState<BoardState>(initialState)

  useEffect(
    () => setSavedBoard(state.board),
    [state.board, setSavedBoard]
  )

  return (
    <BoardContext.Provider value={{ state }}>
      {children}
    </BoardContext.Provider>
  );
}
