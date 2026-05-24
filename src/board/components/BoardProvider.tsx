import { useEffect, useReducer } from "react";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { BoardContext } from "../contexts/BoardContext";
import { boardReducer } from "../reducers/boardReducer";
import type { Board, BoardState } from "../types/boardTypes";

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [savedBoard, setSavedBoard] = useLocalStorage<Board | null>('puzzle-board', null)

  const [state, dispatch] = useReducer(
    boardReducer,
    savedBoard,
    (board): BoardState => (board ?
      { board, loading: false, loadingError: null, selectedBox: null } :
      { board, loading: true, loadingError: null, selectedBox: null }
    ),
  );

  useEffect(
    () => { if (state.board) setSavedBoard(state.board) },
    [state.board, setSavedBoard]
  )

  useEffect(
    () => {
      if (state.loading && !state.loadingError) {
        fetch(import.meta.env.BASE_URL + 'demo.json')
          .then(r => r.json())
          .then(data => dispatch({ type: 'fileLoadResult', result: { ok: true, data } }))
          .catch(err => dispatch({ type: 'fileLoadResult', result: { ok: false, error: String(err) } }));
      }
    },
    [state.loading, state.loadingError]
  )

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
