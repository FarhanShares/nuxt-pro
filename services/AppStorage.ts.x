// TODO: Farhan: you can't use app storage here, need to create a service that will hold data in cookie. AppStorage uses localstorage
import { useStorage, toReactive } from '@vueuse/core'

export class AppStorage {
  public static stores = {
    user: {
      key: 'app_user',
      default: {
        id: 0,
        public_id: 0,
        name: '',
        email: '',
        phone: '',
        email_verified_at: '',
        published_status: '',
        about_me: '',
        additional_notes: '',
        allergies: '',
        allergies_enabled: false,
        blood_type: '',
        created_at: '',
        date_of_birth: '',
        gender: '',
        health_status: '',
        height: 0,
        marital_status: '',
        marital_status_notes: '',
        marital_status_notes_enabled: false,
        medical_notes: '',
        medical_notes_enabled: false,
        medications: '',
        medications_enabled: false,
        skin_tone: '',
        updated_at: '',
        weight: 0,
        roles: [
          {
            id: 0,
            name: 'unknown-role',
            display_name: 'Unknown Role',
            description: 'Unknown',
            created_at: '',
            updated_at: '',
          },
        ],
        permissions: [
          {
            id: 0,
            name: 'unknown-permission',
            display_name: 'Unknown Permission',
            description: 'Unknown Permission',
            created_at: '',
            updated_at: '',
          },
        ],
      },
    },
    userToken: {
      key: 'app_user_token',
      default: {
        type: '',
        expiresIn: 0,
        accessToken: '',
        refreshToken: '',
        lastUpdated: 0,
      },
    },
    userAttempts: {
      key: 'app_user_attempts',
      default: {
        login: 0,
        refreshToken: 0,
        registration: 0,
        resendVerificationPhone: 0,
        resendVerificationEmail: 0,
        resendVerificationEmailAt: 0,
      },
    },
    userRegistered: {
      key: 'app_user_registered',
      default: {
        name: '',
        email: '',
        message: '',
        is_email_verified: false,
        is_registration_completed: false,
        is_verification_email_sent: false,
        created_at: '',
        updated_at: '',
      },
    },
    userContactVerification: {
      key: 'app_user_contact_verification',
      default: {
        context: '', // e.g 'registration', 'login', 'forgotPassword', 'resendVerificationEmail'
        email: '',
        phone: '',
        contactEmail: '',
        contactPhone: '',
      },
    },

    bdDivisions: {
      key: 'app_divisions',
      default: [
        {
          id: 1,
          name: 'Chattagram',
          bn_name: 'চট্টগ্রাম',
          url: 'www.chittagongdiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 2,
          name: 'Rajshahi',
          bn_name: 'রাজশাহী',
          url: 'www.rajshahidiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 3,
          name: 'Khulna',
          bn_name: 'খুলনা',
          url: 'www.khulnadiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 4,
          name: 'Barisal',
          bn_name: 'বরিশাল',
          url: 'www.barisaldiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 5,
          name: 'Sylhet',
          bn_name: 'সিলেট',
          url: 'www.sylhetdiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 6,
          name: 'Dhaka',
          bn_name: 'ঢাকা',
          url: 'www.dhakadiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 7,
          name: 'Rangpur',
          bn_name: 'রংপুর',
          url: 'www.rangpurdiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
        {
          id: 8,
          name: 'Mymensingh',
          bn_name: 'ময়মনসিংহ',
          url: 'www.mymensinghdiv.gov.bd',
          created_at: null,
          updated_at: null,
        },
      ],
    },
    bdDistricts: {
      key: 'app_districts',
      default: [
        {
          id: 0,
          division_id: 0,
          name: '',
          bn_name: '',
          created_at: null as string | null,
          updated_at: null as string | null,
        },
      ],
    },

    lastFetchedAt: {
      key: 'app_last_fetched_at',
      default: {
        user: 0,
      },
    },
  }

  public static store = {
    user: useStorage(this.stores.user.key, this.stores.user.default),
    userToken: useStorage(
      this.stores.userToken.key,
      this.stores.userToken.default
    ),
    userAttempts: useStorage(
      this.stores.userAttempts.key,
      this.stores.userAttempts.default
    ),
    userRegistered: useStorage(
      this.stores.userRegistered.key,
      this.stores.userRegistered.default
    ),
    userContactVerification: useStorage(
      this.stores.userContactVerification.key,
      this.stores.userContactVerification.default
    ),

    bdDivisions: useStorage(
      this.stores.bdDivisions.key,
      this.stores.bdDivisions.default
    ),
    bdDistricts: useStorage(
      this.stores.bdDistricts.key,
      this.stores.bdDistricts.default
    ),

    lastFetchedAt: useStorage(
      this.stores.lastFetchedAt.key,
      this.stores.lastFetchedAt.default
    ),
  }

  // todo: implement driver support
  public static driver: 'localStorage' | 'sessionStorage' = 'localStorage'

  public static setDriver(
    driver: typeof AppStorage.driver = 'localStorage'
  ): typeof self {
    this.driver = driver
    return self
  }

  public static isUsingLocalStorage(): boolean {
    return this.driver === 'localStorage'
  }

  public static isUsingSessionStorage(): boolean {
    return this.driver === 'sessionStorage'
  }

  public static useDriver(): // driver: typeof AppStorage.driver = 'localStorage'
  typeof localStorage | typeof sessionStorage {
    if (AppStorage.isUsingLocalStorage()) return localStorage
    else return sessionStorage
  }
  // todo: end of todo -> implement driver support

  // get & set user
  public static getUser() {
    return toReactive(this.store.user)
  }

  public static setUser(
    value: typeof this.stores.user.default = this.stores.user.default
  ) {
    this.store.user.value = value
    return this
  }

  // get & set user token
  public static getUserToken() {
    return toReactive(this.store.userToken)
  }

  public static setUserToken(
    value: typeof this.stores.userToken.default = this.stores.userToken.default
  ) {
    this.store.userToken.value = value
    return this
  }

  // get & set user registered
  public static getUserRegistered() {
    return toReactive(this.store.userRegistered)
  }

  public static setUserRegistered(
    value: typeof this.stores.userRegistered.default = this.stores
      .userRegistered.default
  ) {
    this.store.userRegistered.value = value
    return this
  }

  // get & set user registered
  public static getUserContactVerification() {
    return toReactive(this.store.userContactVerification)
  }

  public static setUserContactVerification(
    values: Partial<typeof this.stores.userContactVerification.default> = this
      .stores.userContactVerification.default
  ) {
    const data = {
      ...this.store.userContactVerification.value,
      ...values,
    }
    this.store.userContactVerification.value = data
    return this
  }

  // todo: test refresh token with count & show popup
  // get & set user failed attempt
  public static getUserAttempts() {
    return toReactive(this.store.userAttempts)
  }

  public static setUserAttempts(
    value: Partial<typeof this.stores.userAttempts.default> = this.stores
      .userAttempts.default
  ) {
    this.store.userAttempts.value = {
      ...this.store.userAttempts.value,
      ...value,
    }

    return this
  }

  public static increaseUserAttempts(
    type: keyof typeof this.stores.userAttempts.default
  ) {
    const {
      login,
      refreshToken,
      registration,
      resendVerificationPhone,
      resendVerificationEmail,
      resendVerificationEmailAt,
    } = this.store.userAttempts.value
    this.store.userAttempts.value = {
      login: type === 'login' ? login + 1 : login,
      refreshToken: type === 'refreshToken' ? refreshToken + 1 : refreshToken,
      registration: type === 'registration' ? registration + 1 : registration,
      resendVerificationPhone:
        type === 'resendVerificationPhone'
          ? resendVerificationPhone + 1
          : resendVerificationPhone,
      resendVerificationEmail:
        type === 'resendVerificationEmail'
          ? resendVerificationEmail + 1
          : resendVerificationEmail,
      resendVerificationEmailAt:
        type === 'resendVerificationEmail' ||
        type === 'resendVerificationEmailAt'
          ? Date.now()
          : resendVerificationEmailAt,
    }

    return this
  }

  public static clearUserAttempts() {
    this.store.userAttempts.value = this.stores.userAttempts.default
    return this
  }

  public static getDivisions({ country = 'BD' } = {} as { country: 'BD' }) {
    if (country === 'BD') return toReactive(this.store.bdDivisions)

    return []
  }

  public static setDivisions(
    value: [],
    { country = 'BD' } = {} as { country: 'BD' }
  ) {
    if (country === 'BD') this.store.bdDivisions.value = value

    return this
  }

  public static getDistricts({ country = 'BD' } = {} as { country: 'BD' }) {
    if (country === 'BD') return toReactive(this.store.bdDistricts)

    return []
  }

  public static setDistricts(
    value: [],
    { country = 'BD' } = {} as { country: 'BD' }
  ) {
    if (country === 'BD') this.store.bdDistricts.value = value

    return this
  }

  public static getLastFetchedAt() {
    return toReactive(this.store.lastFetchedAt)
  }

  public static setLastFetchedAt(
    type: keyof typeof this.stores.lastFetchedAt.default = 'user',
    value: number = Date.now()
  ) {
    this.store.lastFetchedAt.value = {
      ...this.store.lastFetchedAt.value,
      [type]: value,
    }
    return this
  }
}
