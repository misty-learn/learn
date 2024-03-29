import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { VitePluginVitepressDemo } from 'vite-plugin-vitepress-demo'
import { VitePluginVitepressDumi } from 'vitepress-dumi-theme'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 4096,
  },
  plugins: [
    VitePluginVitepressDemo(),
    VitePluginVitepressDumi(),
    Unocss({
      shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
      ],
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
  ssr: {
    noExternal: ['vitepress-dumi-theme'],
  },
})
