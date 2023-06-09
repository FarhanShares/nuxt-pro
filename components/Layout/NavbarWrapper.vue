<script lang="ts" setup>
// import { IApp } from '~/utils/app'

// state
// const app = useState<IApp>('app')
const navbarRef = ref<HTMLElement | null>(null)
const showDrawer = useState<boolean>('navbar.showDrawer', () => false)
const showOptions = useState<boolean>('navbar.showOptions', () => false)

interface IProps {
  isAuthenticated?: boolean
  headerBgEnabled?: boolean
  headerBgSize?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<IProps>(), {
  isAuthenticated: false,
  headerBgEnabled: true,
  headerBgSize: 280,
})

let timer: NodeJS.Timer
onMounted(() => {
  if (!navbarRef.value) return

  // scroll
  const { onScroll } = useSticky({
    el: navbarRef.value,
    offset: 80,
    className: 'header--sticky',
    pseudoElementHeight: 98.78, // 98.78 is measured by inspecting the header
  })
  setTimeout(() => onScroll(), 50)

  // on show on mobile
  setInterval(() => {
    // must in mobile
    const minW = 1024
    if (window.innerWidth < minW) {
      updateDrawerOptions()
    }
  }, 100)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

// methods
const updateDrawerOptions = () => {
  // drawer
  if (showDrawer.value || showOptions.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}
// const toggleDrawer = () => (showDrawer.value = !showDrawer.value)

const toggleOptions = (show: boolean = false) => {
  showOptions.value = show
}
</script>

<template>
  <div>
    <div ref="navbarRef" :class="['header']">
      <header class="header__container">
        <div class="flex items-center justify-between">
          <!-- left -->
          <slot name="left">
            <AppLogo />
          </slot>

          <slot name="middle" />

          <!-- right -->
          <slot name="right" />

          <!-- options:toggle -->
          <LayoutNavbarMenuButton
            v-if="$slots['mobile-menu']"
            class="md:hidden"
            :is-menu-open="showOptions"
            @handleClick="toggleOptions(true)"
          />
        </div>
      </header>

      <ClientOnly>
        <Teleport to="#app-after">
          <!-- mobile-menu  -->
          <div v-if="showOptions && $slots['mobile-menu']">
            <slot
              name="mobile-menu"
              :toggle-options="toggleOptions"
              :show-options="showOptions"
            />
          </div>
        </Teleport>
      </ClientOnly>
    </div>

    <!-- <picture v-if="props.headerBgEnabled">
      <source srcset="/assets/img/hero/bg-xl.svg" media="(min-width: 1340px)" />
      <source srcset="/assets/img/hero/bg-lg.svg" media="(min-width: 1024px)" />
      <source srcset="/assets/img/hero/bg-md.svg" media="(min-width: 767px)" />
      <source srcset="/assets/img/hero/bg-sm.svg" media="(min-width: 667px)" />
      <img
        class="hero-bg"
        src="/assets/img/hero/bg-xs.svg"
        width="320"
        :height="props.headerBgSize"
      />
    </picture> -->
  </div>
</template>

<style lang="scss">
.header {
  position: relative;
  z-index: 50;
  background: #fff;
}

.header--sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: theme('colors.white');
  box-shadow: 0px 10px 50px rgba(0, 33, 63, 0.08);
  @screen lg {
    .header__container {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}

.header__container {
  min-width: 290px;
  margin: 0 auto;
  padding: 10px;
  // max-width: 1280px;
  @apply max-w-8xl px-2 py-4;

  // @screen md {
  //   padding: 11px 20px;
  // }
  // @screen lg {
  //   padding: 14px 24px;
  // }
  // @screen xl {
  //   padding: 14px 33px 15px 32px;
  // }
  // @screen 2xl {
  //   padding: 24px 32px 24px 31px;
  // }
}

.hero-bg {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  // width: 668px;
  height: 180px;
  object-fit: cover;
  width: 100%;

  @screen lg {
    height: 300px;
  }
}

a.router-link-active {
  font-weight: bold;
}
a.router-link-exact-active {
  color: theme('colors.slate.900');
}
html.dark {
  a.router-link-exact-active {
    color: theme('colors.white');
  }
}
</style>
