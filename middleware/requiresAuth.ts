// fire up the auth popup & then continue after logging in / signin up
// TODO: define middleware

export default defineNuxtRouteMiddleware((to) => {
  const { $config } = useNuxtApp()
  if ($config) {
    console.log('Accessed runtime config within middleware.')
  }
  console.log(
    'Heading to',
    to.path,
    'but I think we should go somewhere else...'
  )
  return '/secret'
})
