import { ThemeManager } from './theme'
import { LanguageManager } from './lang'
import { UserToken, UserData, UserRegistration } from '~~/services'

export interface IApp {
  name: string
  url: string
  author: {
    name: string
    link: string
  }
}

export function AppSetup() {
  // declare app information
  const app: IApp = {
    name: 'RateItAll',
    url: 'https://rateitall.com',
    author: {
      name: '',
      link: '',
    },
  }
  useState('app', () => app)

  const userToken = UserToken()

  const userData = UserData()

  const userRegistration = UserRegistration()

  // use theme manager
  const themeManager = ThemeManager()

  // use language manager
  const languageManager = LanguageManager()

  // vue transition bug handle
  const messages = [
    `Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`, // chromium based
    `NotFoundError: The object can not be found here.`, // safari
  ]
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (ev) => {
      if (messages.includes(ev.message)) {
        ev.preventDefault()
        window.location.reload()
      }
    })
  }

  // return
  return {
    app,
    userToken,
    userData,
    userRegistration,
    themeManager,
    languageManager,
  }
}
