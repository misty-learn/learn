import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
export function loadMonacoEnv() {
  (self as any).MonacoEnvironment = {
    async getWorker(_: any, label: string) {
      if (label === 'typescript' || label === 'ts')
        return new tsWorker()

      return new editorWorker()
    },
  }
}
