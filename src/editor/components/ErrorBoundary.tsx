import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Render error:', error, info)
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div
          role="alert"
          className="min-h-screen flex items-center justify-center bg-slate-100 p-6"
        >
          <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-slate-200 p-8 flex flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Something went wrong.
            </h2>
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              Start over
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
