import * as coder from 'monaco-editor/esm/vs/editor/editor.api'
import dark from './dark'
import light from './light'

export const loadTheme = () => {
  coder.editor.defineTheme('mist-dark', dark as any)
  coder.editor.defineTheme('mist-light', light as any)
}
