import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 4096,
  },
  plugins: [
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
      ],
      theme: {
        preflightBase: false,
      },
    }),
  ],
  // @ts-expect-error ts config
  ssr: {
    noExternal: [
      'monaco-editor/esm/vs/editor/editor.api',
    ],
  },
})
