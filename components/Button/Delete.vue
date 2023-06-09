<template>
  <BaseButton class="btn-del">
    <svg
      :style="{ transform: 'scale(3)' }"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5341 12.534L4 3.99988"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.00293 12.534L12.537 3.99988"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </BaseButton>
</template>

<style scoped lang="scss">
.btn-del {
  font-size: 16px;
  margin-left: auto;
  margin-right: var(--btns-gap);
  position: absolute;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 25px;
  height: 25px;
  color: theme('colors.secondary-text.300');
  &:hover {
    color: theme('colors.secondary-text.DEFAULT');

    ~ .rt-input-search-home__input {
      outline-color: theme('colors.primary.DEFAULT');
    }
  }
  &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    z-index: -1;
    width: 60px;
    height: 100%;
    right: 0;
    background-image: linear-gradient(
      -90deg,
      #fff 34%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  @screen md {
    --close-x-pos: 56px;
  }
}
</style>
