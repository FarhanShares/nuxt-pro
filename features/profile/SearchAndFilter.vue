<script lang="ts" setup>
// import { toBengaliNumber } from '~/utils'
// import { Search } from '@element-plus/icons-vue'

// TODO: Farhan: you can't use app storage here, need to create a service that will hold data in cookie. AppStorage uses localstorage
import { httpService } from '~/services'
import './searchAndFilter.css'
// import { useProfileStore } from '~/stores/profile'

// const router = useRouter()
// const profileStore = useProfileStore()

const props = withDefaults(
  defineProps<{
    redirectTo?: any
    hideCancelButton?: boolean
  }>(),
  {
    redirectTo: false,
    hideCancelButton: false,
  }
)

const genderOptions = ref([
  { value: 'ANY', text: 'সকল প্রোফাইল' },
  { value: 'MALE', text: 'পাত্রের প্রোফাইল' },
  { value: 'FEMALE', text: 'পাত্রীর প্রোফাইল' },
])
const maritalStatusOptions = ref([
  { value: 'ANY', text: 'যেকোনো' },
  { value: 'NEVER_MARRIED', text: 'অবিবাহিত' },
  { value: 'MARRIED', text: 'বিবাহিত' },
  { value: 'Divorced', text: 'ডিভোর্সড' },
  { value: 'Widowed', text: 'বিধবা' },
  { value: 'Widower', text: 'বিপত্নীক' },
])

// const filter = ref({
//   division: 0,
//   district: 0,
//   subdistrict: 0,
//   gender: "ANY",
//   maritalStatus: "ANY",
//   age: [18, 0],
// });

onBeforeMount(() => {
  // if (AppStorage.getDistricts().length < 2) {
  httpService.get('/v1/geo-bd?type=district').then(({ data }) => {
    // AppStorage.setDistricts(data?.data)
    console.log(
      'fetched districts length is: ',
      data.length
      // AppStorage.getDistricts().length
    )
  })
  // }
})
// const expanded = ref(false)
// const divisions = computed(() => [
//   { id: 0, name: 'All', bn_name: 'সকল বিভাগ' },
//   ...AppStorage.store.bdDivisions.value,
// ])
// const districts = computed(() => {
//   if (profileStore.filters.division === 0) {
//     return [
//       { id: 0, name: 'All', bn_name: 'সকল জেলা' },
//       ...AppStorage.store.bdDistricts.value,
//     ]
//   }
//   return [
//     { id: 0, name: 'All', bn_name: 'সকল জেলা' },
//     ...AppStorage.store.bdDistricts.value.filter(
//       (d) => d.division_id === profileStore.filters.division
//     ),
//   ]
// })

// const emit = defineEmits<{
//   (e: 'search', event: any): void
//   (e: 'cancel', event: any): void
// }>()

async function onSearch() {
  // emit('search', profileStore.filters)
  // console.log('on search')
  // if (props.redirectTo) {
  //   router.push(props.redirectTo)
  // }
  // await profileStore.fetch()
}
const labelPosition = ref<'right' | 'left' | 'top'>('right')

const formItems = reactive({
  gender: '',
  maritalStatus: '',
  division: '',
  district: '',
  age: [19, 19],
})
</script>

<template>
  <div>
    <!-- @click="expanded = !expanded" -->
    <!-- {{ districts[0] }} -->
    <!-- <CollapsibleItem :expanded="expanded"> -->
    <client-only>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formItems"
        class="max-w-xl"
      >
        <div class="form-field-grid-fixed text-black">
          <el-form-item
            label="আমি খুঁজছি"
            class="flex flex-col custom-lebel !mb-0"
          >
            <el-select
              v-model="formItems.gender"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="বৈবাহিক অবস্থা"
            class="flex flex-col custom-lebel !mb-0"
          >
            <el-select
              v-model="formItems.maritalStatus"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in maritalStatusOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="form-field-grid-fixed">
          <el-form-item label="বিভাগ" class="flex flex-col custom-lebel !mb-0">
            <el-select
              v-model="formItems.district"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="জেলা" class="flex flex-col custom-lebel !mb-0">
            <el-select
              v-model="formItems.division"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>

        <div class="mt-2">
          <!-- <label class="block mb-2">
          বয়স ({{ toBengaliNumber(profileStore.filters.age[0]) }} -
          {{
            profileStore.filters.age[1] === 0 ||
            profileStore.filters.age[1] === profileStore.filters.age[0]
              ? 'যেকোনো'
              : toBengaliNumber(profileStore.filters.age[1])
          }}
          )
        </label> -->
          <el-form-item label="বয়স" class="flex flex-col custom-lebel">
            <el-slider v-model="formItems.age" range :min="18" :max="65" />
          </el-form-item>
        </div>

        <div class="flex justify-end gap-5">
          <div class="">
            <el-button
              v-if="!props.hideCancelButton"
              icon-class="text-lg"
              type="primary"
              rounded
              width="120px"
              @click="$emit('cancel', '')"
              >না, থাক</el-button
            >
          </div>
          <div class="">
            <el-button
              type="primary"
              round
              color="#000000"
              backdrop="blur-lg"
              class="!py-0 !px-6 !h-8 !text-base !font-normal"
              style="width: 100%"
              @click="onSearch"
              ><Icon
                name="material-symbols:search"
                class="mr-1 text-xl"
              />খুঁজুন</el-button
            >
          </div>
        </div>
      </el-form>
    </client-only>
    <!-- <div class="form-field-grid-fixed">
      <FormField
        v-model="profileStore.filters.gender"
        field-label="আমি খুঁজছি"
        field-type="richselect"
        :can-clear="false"
        :options="genderOptions"
        :label="`text`"
        :track-by="`value`"
        :value-prop="`value`"
      />

      <FormField
        v-model="profileStore.filters.maritalStatus"
        field-label="বৈবাহিক অবস্থা"
        field-type="richselect"
        :can-clear="false"
        :options="maritalStatusOptions"
        :label="`text`"
        :track-by="`value`"
        :value-prop="`value`"
      />
    </div>

    <div class="form-field-grid-fixed">
      <FormField
        v-model="profileStore.filters.division"
        field-label="বিভাগ"
        field-type="richselect"
        :can-clear="false"
        :options="divisions"
        :label="`bn_name`"
        :track-by="`name`"
        :value-prop="`id`"
        @change="
          () => {
            profileStore.filters.district = 0
            profileStore.filters.subdistrict = 0
          }
        "
      />

      <FormField
        v-model="profileStore.filters.district"
        field-label="জেলা"
        field-type="richselect"
        :can-clear="false"
        :options="districts"
        :label="`bn_name`"
        :track-by="`name`"
        :value-prop="`id`"
      />
    </div>

    <div class="mt-2">
      <label class="block mb-2">
        বয়স ({{ toBengaliNumber(profileStore.filters.age[0]) }} -
        {{
          profileStore.filters.age[1] === 0 ||
          profileStore.filters.age[1] === profileStore.filters.age[0]
            ? 'যেকোনো'
            : toBengaliNumber(profileStore.filters.age[1])
        }}
        )
      </label>
    </div>
    <FormSlider
      v-model="profileStore.filters.age"
      :min="18"
      :max="65"
      :show-tooltip="`drag`"
    />

    <div class="flex justify-end gap-5 mt-4">
      <FormButton
        v-if="!props.hideCancelButton"
        :text="'না, থাক'"
        icon-class="text-lg"
        variant="muted"
        width="120px"
        @click="$emit('cancel', '')"
      />

      <FormButton
        :text="'খুঁজুন'"
        icon="heroicons-solid:search"
        icon-class="text-lg"
        variant="dark"
        width="120px"
        @click="onSearch"
      />
    </div> -->

    <!-- </CollapsibleItem> -->
    <!-- {{ profileStore.filters }} -->
  </div>
</template>
