<template>
  <button type="button" class="rt-input-pass__toogle-pas-btn toogle-pas-btn">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <g v-if="isPassword">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.1609 12.0521C15.1609 13.7981 13.7449 15.2131 11.9989 15.2131C10.2529 15.2131 8.83789 13.7981 8.83789 12.0521C8.83789 10.3051 10.2529 8.89014 11.9989 8.89014C13.7449 8.89014 15.1609 10.3051 15.1609 12.0521Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.998 19.354C15.806 19.354 19.289 16.616 21.25 12.052C19.289 7.488 15.806 4.75 11.998 4.75H12.002C8.194 4.75 4.711 7.488 2.75 12.052C4.711 16.616 8.194 19.354 12.002 19.354H11.998Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g v-else class="icon-hide">
        <path
          d="M9.76051 14.3684C9.18551 13.7944 8.83551 13.0144 8.83551 12.1394C8.83551 10.3864 10.2475 8.97344 11.9995 8.97344C12.8665 8.97344 13.6645 9.32444 14.2295 9.89844M15.1047 12.7005C14.8727 13.9905 13.8567 15.0085 12.5677 15.2425M6.65451 17.4739C5.06751 16.2279 3.72351 14.4079 2.74951 12.1389C3.73351 9.85994 5.08651 8.02994 6.68351 6.77394C8.27051 5.51794 10.1015 4.83594 11.9995 4.83594C13.9085 4.83594 15.7385 5.52794 17.3355 6.79294M19.4475 8.99244C20.1355 9.90644 20.7405 10.9614 21.2495 12.1384C19.2825 16.6954 15.8065 19.4404 11.9995 19.4404C11.1365 19.4404 10.2855 19.3004 9.46751 19.0274M19.8868 4.25L4.11279 20.024"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    isPassword: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  color: theme('colors.muted.300');
  &:focus,
  &:active {
    background-color: transparent;
  }
  &:hover {
    color: theme('colors.muted.DEFAULT');
  }
  svg {
    @screen lg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
