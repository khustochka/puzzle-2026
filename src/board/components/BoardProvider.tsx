import { useEffect, useReducer } from "react";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { BoardContext } from "../contexts/BoardContext";
import { boardReducer } from "../reducers/boardReducer";
import type { Board, BoardState } from "../types/boardTypes";

export function BoardProvider({ children, initialBoard }: { children: React.ReactNode, initialBoard: Board }) {
  const [savedBoard, setSavedBoard] = useLocalStorage('puzzle-board', initialBoard)

  const [state, dispatch] = useReducer(
    boardReducer,
    savedBoard,
    (board): BoardState => ({ board }),
  );

  useEffect(
    () => setSavedBoard(state.board),
    [state.board, setSavedBoard]
  )

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
