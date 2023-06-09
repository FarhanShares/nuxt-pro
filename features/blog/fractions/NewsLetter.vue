<template>
  <div class="p-1 rounded-lg shadow-md gradient-bg-a">
    <div
      class="w-full px-5 py-5 mx-auto text-white bg-gray-900 rounded-lg shadow"
    >
      <h3 class="text-2xl font-bold leading-7">My Newslater</h3>
      <p class="mt-3">
        I send out an email every so often about cool stuff I'm working on or
        launching. If you dig, go ahead and sign up!
      </p>
      <form>
        <input
          class="rounded-md shadow-sm border-gray-300 h-10 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full mt-3"
          type="email"
          name="email"
        />
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 h-10 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 justify-center block w-full mt-3 text-center !bg-blue-600 hover:!bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gradient-bg-a {
  background-image: linear-gradient(
    45deg,
    hsl(240deg 100% 20%) 0%,
    hsl(311deg 100% 25%) 10%,
    hsl(334deg 100% 40%) 20%,
    hsl(6deg 98% 61%) 30%,
    hsl(37deg 100% 50%) 40%,
    hsl(55deg 100% 50%) 50%,
    hsl(47deg 100% 50%) 60%,
    hsl(39deg 100% 50%) 70%,
    hsl(30deg 100% 50%) 80%,
    hsl(20deg 100% 50%) 90%,
    hsl(0deg 100% 50%) 100%
  );
}
</style>
