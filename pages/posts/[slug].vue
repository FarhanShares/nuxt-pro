<script lang="ts" setup>
import { BlogHero } from '~~/features/blog'
const conf: any = useAppConfig()
const appUrl = conf?.appUrl ?? 'https://farhanshares.com'
const getUrl = (path?: string) => new URL(path ?? '', appUrl)
</script>

<template>
  <div class="flex flex-col">
    <ContentDoc>
      <template #default="{ doc }">
        <BlogHero
          :title="doc.title"
          :subttle="doc.createdAt"
          :centered="true"
          :class="'bg-gray-700'"
        />
        <div
          class="max-w-5xl w-full mx-auto mt-5 bg-white shadow-md rounded-md -mt-8 relative z-20 p-4"
        >
          <div class="prose-lg">
            <ContentRenderer :value="doc" />
          </div>
        </div>

        <div class="max-w-5xl mx-auto w-full mt-8 mb-8 px-2">
          <a
            :href="`https://twitter.com/intent/tweet?text=Reading+${getUrl(
              doc._path
            )}+by+@FarhanShares`"
            target="_blank"
            class="font-mono opacity-50 hover:opacity-75"
          >
            comment on twitter
          </a>
          <br />
          <NuxtLink to="/posts" class="font-mono opacity-50 hover:opacity-75">
            cd ..
          </NuxtLink>
        </div>
      </template>

      <template #empty>
        <h1>No content</h1>
      </template>

      <template #not-found>
        <h1>404! Not found.</h1>
      </template>
    </ContentDoc>
  </div>
</template>
