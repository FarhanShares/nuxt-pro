<template>
  <div class="flex-1 flex justify-end md:hidden">
    <button
      type="button"
      aria-hidden="false"
      :aria-expanded="isMenuOpen"
      aria-label="open/close menu"
      class="header-content__on-mobile-search-button"
      @click="$emit('handleClick', 'search')"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_774_39563)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 13.5455C7 17.1604 9.9305 20.0909 13.5455 20.0909C17.1586 20.0865 20.0865 17.1586 20.0909 13.5455C20.0909 9.9305 17.1604 7 13.5455 7C9.9305 7 7 9.9305 7 13.5455ZM8.4543 13.5454C8.4543 10.7338 10.7336 8.45454 13.5452 8.45454C16.3555 8.45775 18.6329 10.7351 18.6361 13.5454C18.6361 16.3571 16.3568 18.6364 13.5452 18.6364C10.7336 18.6364 8.4543 16.3571 8.4543 13.5454Z"
            fill="#66737F"
          />
          <path
            d="M22.7867 21.7586L19.6914 18.6633C19.3806 19.0366 19.0364 19.3808 18.6631 19.6916L21.7584 22.7869C22.0437 23.0625 22.4973 23.0586 22.7779 22.7781C23.0584 22.4975 23.0623 22.0439 22.7867 21.7586Z"
            fill="#66737F"
          />
        </g>
        <defs>
          <clipPath id="clip0_774_39563">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(7 7)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
    <button
      type="button"
      aria-hidden="false"
      :aria-expanded="isMenuOpen"
      aria-label="open/close menu"
      class="header-content__menu-button menu-button"
      @click="$emit('handleClick', 'menu')"
    >
      <svg
        v-if="!isMenuOpen"
        width="30"
        height="30"
        class="menu-button__icon-open"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 9.40001C7 8.95818 7.35817 8.60001 7.8 8.60001H22.2C22.6418 8.60001 23 8.95818 23 9.40001C23 9.84183 22.6418 10.2 22.2 10.2H7.8C7.35817 10.2 7 9.84183 7 9.40001Z"
          fill="currentColor"
        />
        <path
          d="M7 15C7 14.5582 7.35817 14.2 7.8 14.2H22.2C22.6418 14.2 23 14.5582 23 15C23 15.4418 22.6418 15.8 22.2 15.8H7.8C7.35817 15.8 7 15.4418 7 15Z"
          fill="currentColor"
        />
        <path
          d="M13.4 20.6C13.4 20.1582 13.7582 19.8 14.2 19.8H22.2C22.6418 19.8 23 20.1582 23 20.6C23 21.0418 22.6418 21.4 22.2 21.4H14.2C13.7582 21.4 13.4 21.0418 13.4 20.6Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="30"
        height="30"
        class="menu-button__icon-close"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.6767 10.7928C20.0673 11.1833 20.0673 11.8165 19.6767 12.207L16.649 15.2347L19.6745 18.2602C20.065 18.6507 20.065 19.2839 19.6745 19.6744C19.2839 20.0649 18.6508 20.0649 18.2602 19.6744L15.2348 16.6489L12.2094 19.6743C11.8189 20.0649 11.1857 20.0649 10.7952 19.6743C10.4046 19.2838 10.4046 18.6507 10.7952 18.2601L13.8206 15.2347L10.7929 12.2071C10.4024 11.8165 10.4024 11.1834 10.7929 10.7928C11.1834 10.4023 11.8166 10.4023 12.2071 10.7928L15.2348 13.8205L18.2625 10.7928C18.653 10.4023 19.2862 10.4023 19.6767 10.7928Z"
          fill="#66737F"
        />
        <circle cx="15" cy="15" r="14.5" stroke="#D5DDE7" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
