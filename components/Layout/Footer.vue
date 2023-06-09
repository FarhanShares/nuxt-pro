<script setup lang="ts">
import dayjs from 'dayjs'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
// import { useI18n } from "vue-i18n";
// import { isDark, toggleDark } from "~/utils";

// const { t, availableLocales, locale } = useI18n();

/* const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
}; */
</script>

<template>
  <div>
    <div class="mt-6 border-t border-gray-400 border-dashed" />
    <nav class="py-4 mx-auto max-w-7xl">
      <div
        class="flex flex-col items-center gap-2 px-1 md:justify-between md:flex-row"
      >
        <div>
          <h5
            class="font-normal text-center text-sm text-gray-900 md:text-left"
          >
            Copyright © 2020-{{ dayjs().format('YY') }}
            {{ $t('app.nameEnFull') }} | All rights reserved.
          </h5>
        </div>

        <div
          class="flex gap-3 text-2xl flex justify-center items-center leading-4"
        >
          <a
            href="https://facebook.com/DeeniBondhon"
            target="_blank"
            class="text-[#3b5998] icon-btn hover:bg-[#3b5998]"
            to="/"
            :title="$t('app.nameEn') + ' on Facebook'"
          >
            <!-- <jam:facebook-square /> -->
            <Icon name="jam:facebook-square" />
          </a>

          <a
            href="https://twitter.com/DeeniBondhon"
            target="_blank"
            class="text-[#326ada] icon-btn hover:bg-[#326ada]"
            to="/"
            :title="$t('app.nameEn') + ' on Twitter'"
          >
            <!-- <jam:twitter-square /> -->
            <Icon name="jam:twitter-square" />
          </a>

          <a
            href="https://instagram.com/DeeniBondhon"
            target="_blank"
            class="text-[#fd1d1d] icon-btn hover:bg-[#fd1d1d]"
            to="/"
            :title="$t('app.nameEn') + ' on Instagram'"
          >
            <!-- <jam:instagram /> -->
            <Icon name="jam:instagram" />
            <!-- <Icon name=""/> -->
          </a>

          <NuxtLink
            class="!text-hex-098ffa !hover:bg-hex-098ffa"
            to="/"
            :title="$t('button.home')"
          >
            <!-- <mdi:home-circle-outline /> -->
            <Icon name="mdi:home-circle-outline" />
          </NuxtLink>

          <!-- <button
            class="icon-btn mx-2 !outline-none"
            :title="t('button.toggle_dark')"
            @click="toggleDark()"
          >
            <carbon-moon v-if="isDark" />
            <carbon-sun v-else />
          </button>-->

          <!-- <a
            class="mx-2 icon-btn"
            :title="t('button.toggle_langs')"
            @click="toggleLocales"
          >
            <carbon-language />
          </a>-->

          <!-- <router-link class="mx-2 icon-btn" to="/about" :title="$t('button.about')">
            <carbon-dicom-overlay />
          </router-link>-->
        </div>
      </div>

      <div
        class="flex items-center justify-center gap-2 px-1 mt-3 md:mt-0 md:justify-start text-sm"
      >
        <router-link class="footer-nav-link" to="/">Home</router-link>
        <div class="text-xs">/</div>
        <router-link class="footer-nav-link" to="/privacy">Privacy</router-link>
        <div class="text-xs">/</div>
        <router-link class="footer-nav-link" to="/support">Help</router-link>

        <template v-if="!authStore.isAuthenticated">
          <div class="text-xs">/</div>
          <router-link class="footer-nav-link" to="/auth/login"
            >Login</router-link
          >
          <div class="text-xs">/</div>
          <router-link class="footer-nav-link" to="/auth/signup"
            >Registration</router-link
          >
        </template>
      </div>
    </nav>
  </div>
</template>

<style>
.icon-btn {
  @apply inline-block p-1 transition duration-200 ease-in-out opacity-75 cursor-pointer select-none hover:text-white;
  font-size: 0.9em;
  @apply transition duration-200 ease-in-out;
}
.footer-nav-link {
  @apply inline-block p-1 transition duration-200 ease-in-out opacity-75 cursor-pointer select-none hover:opacity-100 hover:text-blue-500 hover:underline;
  font-size: 0.9em;
  @apply transition duration-200 ease-in-out;
}
</style>
