<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" label-width="98">
      <t-row>
        <t-col>
          <t-form-item label="护理项目名称：" name="name">
            <t-input
              v-model="localSearchData.name"
              placeholder="请输入内容"
              class="form-item-content"
              type="search"
              clearable
              @clear="handleClear('name')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="状态：" name="status">
            <t-select
              v-model="localSearchData.status"
              clearable
              placeholder="请输入内容"
              @clear="handleClear('status')"
            >
              <t-option
                v-for="(item, index) in statusData"
                :key="index"
                :value="item.id"
                :label="item.value"
                title=""
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col class="searchBtn">
          <button type="button" class="bt-grey wt-60" @click="handleReset()">
            重置
          </button>
          <button
            type="button"
            class="bt wt-60"
            @click="handleSearch(localSearchData)"
          >
            搜索
          </button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { statusData } from '@/utils/commonData'
import type { SEARCH_PARAMS } from '@/api/model/serveModel'

const form = ref(null)

// 接收变量
const props = defineProps<{
  searchData: SEARCH_PARAMS
}>()

// 创建一个本地副本
const localSearchData = ref({ ...props.searchData })

// 监听 props 的变化并更新本地副本
watch(
  () => props.searchData,
  (newVal) => {
    localSearchData.value = { ...newVal }
  }
)
// 声明方法
const emits = defineEmits(['handleReset', 'handleSearch', 'handleClear'])

// 重置搜索框
const handleReset = () => {
  emits('handleReset')
}

// 搜索
const handleSearch = (val: SEARCH_PARAMS) => {
  debugger
  console.log(val)
  emits('handleSearch', val)
}

// 清空
const handleClear = (val) => {
  emits('handleClear', val)
}
</script>
