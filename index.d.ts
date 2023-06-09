declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    appURL: string
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
