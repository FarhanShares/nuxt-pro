// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import { IntlifyModuleOptions } from '@intlify/nuxt3'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // app
  app: {
    head: {
      title: 'Farhan Israq',
      titleTemplate: '%s - FarhanShares.Com',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Nuxt Pro | FarhanShares.Com',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
    buildAssetsDir: '/_app/',
  },

  // nitro: {
  //   plugins: ['~/server/index.ts'],
  // },

  // css
  css: ['~/assets/sass/app.scss'],

  // build
  build: {
    transpile: [
      '@headlessui/vue',
      'swiper',
      'vue-toastification',
      ...(process.env.NODE_ENV === 'production' ? ['@aspida/axios'] : []),
    ],
  },

  // modules
  modules: [
    [
      '@nuxtjs/tailwindcss',
      {
        configPath: '~/tailwind.config.cjs',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true,
      },
    ],
    ['@element-plus/nuxt'],
    [
      'nuxt-icon',
      {
        size: '24px',
      },
    ],
    [
      '@intlify/nuxt3',
      {
        localeDir: 'locales',
        vueI18n: {
          locale: 'en',
          fallbackLocale: 'en',
          availableLocales: ['en', 'bn'],
        },
      },
    ],
    [
      '@vueuse/nuxt',
      {
        ssrHandlers: true,
      },
    ],
    // NOTE: Currently unplugin is havving issues with it, maybe in the future we can work on it
    // [
    //   '@nuxt/content',
    //   {
    //     documentDriven: true,
    //     mdc: true,
    //     highlight: {
    //       theme: {
    //         default: 'github-light',
    //         dark: 'github-dark',
    //       },
    //     },
    //   },
    // ],
    '@pinia/nuxt',
    '@morev/vue-transitions/nuxt',
    'nuxt-svgo',
    [
      'nuxt-svg-transformer',
      {
        reactive: true,
        clearSize: 'parent',
        clearClasses: 'parent',
        clearStyles: 'parent',
        inlineBlock: true,
      },
    ],
    [
      '@nuxt/content',
      {
        documentDriven: false,
        layoutFallbacks: ['default'],
      },
    ],
  ],

  // experimental features
  experimental: {
    reactivityTransform: false,
    writeEarlyHints: false,
    inlineSSRStyles: (id: any) => !id.includes('windi'),
  },

  // auto import components
  components: {
    dirs: [
      // {
      //   path: '~/components/global',
      //   global: true,
      // },
      '~/components',
      '~/plugins/mystery/',
      '~/plugins/pop-stack/',
      '~/plugins/edge-stack/',
      '~/plugins/toast-stack/',
    ],
  },

  // vite plugins
  vite: {
    server: {
      hmr: {
        // host: 'localhost',
        clientPort: 24678,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/sass/_variables.scss" as *;`,
        },
      },
    },
    plugins: [
      // AutoImport({
      //   resolvers: [
      //     // ElementPlusResolver({ ssr: true })
      //   ],
      // }),
      // Components({
      //   dts: true,
      //   resolvers: [
      //     // ElementPlusResolver({ importStyle: 'sass', directives: true }),
      //   ],
      // }),
    ],
    ssr: {
      noExternal: ['element-plus'],
    },
  },

  runtimeConfig: {
    // Private config that is only available on the server
    secret: '',
    mongoUrl: process.env.NUXT_MONGO_URL,
    slackWebhookContact: process.env.NUXT_SLACK_WEBHOOK_CONTACT,
    // Config within public will be also exposed to the client
    public: {
      apiBaseUrl: 'https://arc.deenibondhon.com',
    },
  },
})
