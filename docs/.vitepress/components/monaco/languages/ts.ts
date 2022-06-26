import * as monaco from 'monaco-editor'

export const loadTsLang = async() => {
  const data = await fetch('https://cdn.jsdelivr.net/npm/@type-challenges/utils@0.1.1/index.d.ts')
  const text = await data.text()
  const path = 'file:///type-challenges.ts'
  const uri = monaco.Uri.parse(path)
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    moduleResolution: 2,
    module: monaco.languages.typescript.ModuleKind.ESNext,
  })
  monaco.editor.createModel(text, 'typescript', uri)
  console.log(monaco.editor.getModels())
}
