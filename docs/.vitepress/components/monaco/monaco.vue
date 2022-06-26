<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { nextTick, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { loadMonacoEnv } from './env'
import { loadTsLang } from './languages/ts'
import { loadTheme } from './themes'
loadMonacoEnv()
loadTheme()
loadTsLang()
const containerRef = shallowRef<HTMLDivElement | null>()
const currentModel = shallowRef<monaco.editor.ITextModel>
(
  monaco.editor.createModel(
    'import {} from "/type-challenges.ts"',
    'typescript',
    monaco.Uri.parse('file:///type.ts'),
  ),
)
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | undefined>(undefined)
onMounted(async() => {
  await nextTick()
  if (!containerRef.value)
    throw new Error('\'containerRef\' is not defined')

  const editorInstance = monaco.editor.create(containerRef.value, {
    model: currentModel.value,
    theme: 'mist-dark',
  })
  editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    // eslint-disable-next-line no-console
    console.log('save')
  })
  editor.value = editorInstance
})

onBeforeUnmount(() => {
  if (editor.value)
    editor.value.dispose()
})

</script>
<template>
  <div ref="containerRef" text-left class="coder-container" />
</template>

<style scoped>
.coder-container{
  min-height: 400px;
  width: 100%;
}
</style>
