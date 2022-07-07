import 'monaco-editor/esm/vs/editor/editor.all'
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export const loadTsLang = async() => {
  const data = await fetch('https://cdn.jsdelivr.net/npm/@type-challenges/utils@0.1.1/index.d.ts')
  const text = await data.text()
  const path = '@type-challenges/utils'
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    strict: true,
  })
  monaco.languages.typescript.typescriptDefaults.addExtraLib(`
    declare module '${path}' {
      ${text}
    }
  `)
}
