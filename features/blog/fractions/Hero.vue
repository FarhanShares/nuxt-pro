<script lang="ts" setup>
export interface IProps {
  title: string
  subttle?: string
  centered?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  title: '',
  subttle: '',
  centered: false,
})
</script>

<template>
  <div class="min-h-16rem bg-hex-171717 relative w-full">
    <div class="y-lines">
      <div class="y-line"></div>
      <div class="y-line"></div>
      <div class="y-line"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10 pt-20 pb-10 text-white">
      <h2
        class="text-2xl lg:text-5xl font-bold leading-6"
        :class="[centered && 'text-center']"
      >
        {{ props.title }}
      </h2>
      <h4 class="mt-5 text-xl font-bold" :class="[centered && 'text-center']">
        {{ props.subttle }}
      </h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// bg
.y-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin: auto;
  width: 90vw;
}

.y-line {
  position: absolute;
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 15vh;
    width: 100%;
    top: -50%;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 75%,
      #ffffff 100%
    );
    animation: drop 7s 0s infinite;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
  }

  &:nth-child(1) {
    margin-left: -25%;

    &::after {
      animation-delay: 2s;
    }
  }

  &:nth-child(3) {
    margin-left: 25%;

    &::after {
      animation-delay: 2.5s;
    }
  }
}

@keyframes drop {
  0% {
    top: -50%;
  }

  100% {
    top: 110%;
  }
}
</style>
