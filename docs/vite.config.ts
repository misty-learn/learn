import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
// import { SearchPlugin } from 'vitepress-plugin-search'

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
    // SearchPlugin({}),
  ],
  ssr: {},
})
