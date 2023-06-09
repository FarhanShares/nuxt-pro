<script lang="ts" setup>
import { capitalize } from '~/utils/str'
import { BlogHero, BlogPostItem, BlogNewsLetter } from '~~/features/blog'

// import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
// interface PostsContent extends ParsedContent {
//   title: 'keys'
//   description: 'bar'
//   baz: 'bar'
// }
// import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'
// interface Article extends MarkdownParsedContent {
//   author: string
// }
// composable
const { t } = useLang()
useHead(() => ({
  title: capitalize(t('pages.post.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.post.description'),
    },
  ],
}))

const { data: posts } = await useAsyncData(
  `all-posts`,
  async () => await queryContent().find()
)
console.log(posts.value)
</script>

<template>
  <div>
    <BlogHero
      :title="'Posts'"
      :subttle="'A Tech blog by Farhan Israq.'"
      :centered="true"
      class="bg-gray-900"
    />

    <div class="app-container md:grid grid-cols-12 gap-4 my-10">
      <div class="col-span-8">
        <BlogPostItem
          v-for="post in posts"
          :key="post._path"
          :post="post"
          class="border mb-4"
        >
        </BlogPostItem>
      </div>

      <div class="col-span-4 w-full">
        <BlogNewsLetter />
      </div>
    </div>
  </div>
</template>
