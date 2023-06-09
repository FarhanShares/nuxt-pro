<script lang="ts" setup>
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'

AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const authModalState = useState<boolean>('auth.modal.state', () => false)
const authModalScreen = useState<'login' | 'register' | 'forgotPassword'>(
  'auth.modal.screen',
  () => 'register'
)
const appModal = useAppModal()
</script>

<template>
  <el-config-provider size="large" :z-index="300">
    <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
      <Body class="app">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>

      <Teleport to="body">
        <ClientOnly>
          <PopStack
            id="auth.modal.component"
            v-model="authModalState"
            :animation="'zoom'"
            :custom-body-class="'auth-modal'"
            @close="authModalState = false"
          >
            <AuthFeature :screen="authModalScreen" />
          </PopStack>

          <PopStack
            id="app.modal.component"
            :model-value="appModal.state"
            :animation="appModal.animation"
            :close-button="false"
            @close="appModal.close()"
          >
            <AppModal :screen="appModal.name" />
          </PopStack>
        </ClientOnly>
      </Teleport>
    </Html>
  </el-config-provider>
</template>

<style lang="scss">
.auth-modal {
  @apply bg-white dark:bg-gray-900 relative;
  width: 100%;
  height: 100%;

  @screen md {
    // max-width: 680px;
  }
  @screen lg {
    height: auto;
    border-radius: 30px;
    max-width: 720px;
  }
  @screen xl {
    max-width: 960px;
  }
}
</style>
