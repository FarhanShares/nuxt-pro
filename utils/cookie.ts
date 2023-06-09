/**
 * This is for reading cookies in the client side only.
 * useCookie() from nuxt should be used whereever possible.
 *
 * @param name the name of the cookie
 * @returns value of the cookie or empty string
 */

export const readCookie = (name: string): string => {
  if (!process.client) {
    console.warn(
      `Can not read cookie (${name}) on this environment (${
        process.server ? 'server' : 'unknown'
      }`
    )
    return ''
  }

  return (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )
}
