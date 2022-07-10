<script lang="ts" setup>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { nextTick, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { loadMonacoEnv } from './env'
import { loadTsLang } from './languages/ts'
import { loadTheme } from './themes'
const props = withDefaults(
  defineProps<{ value?: string; filename?: string;dir?: string }>(),
  {
    value: '',
  },
)
loadMonacoEnv()
loadTheme()
loadTsLang()
const containerRef = shallowRef<HTMLDivElement | null>()
let uri

if (props.filename) {
  uri = monaco.Uri.parse(`file:///root/${props.dir ? `${props.dir}/` : ''}${props.filename}.ts`)
}
else {
  // 时间戳
  uri = monaco.Uri.parse(`file:///root/${props.dir ? `${props.dir}/` : ''}${new Date().getTime()}.ts`)
}
const model = monaco.editor.getModel(uri)
const currentModel = shallowRef<monaco.editor.ITextModel>()
if (model) {
  currentModel.value = model
}
else {
  currentModel.value = monaco.editor.createModel(
    props.value,
    'typescript',
    uri,
  )
}

const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | undefined>(
  undefined,
)
onMounted(async() => {
  await nextTick()
  if (!containerRef.value) throw new Error('\'containerRef\' is not defined')

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
  if (editor.value) {
    editor.value.dispose()
    if (!props.filename && currentModel.value)
      currentModel.value.dispose()
  }
})
</script>
<template>
  <div ref="containerRef" text-left class="coder-container" />
</template>

<style scoped>
.coder-container {
  min-height: 400px;
  width: 100%;
}
</style>
