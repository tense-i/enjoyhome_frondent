<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" label-width="98">
      <t-row>
        <t-col>
          <t-form-item label="护理项目名称：" name="name">
            <t-input
              v-model="searchData.name"
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
              v-model="searchData.status"
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
          <button type="button" class="bt wt-60" @click="handleSearch()">
            搜索
          </button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { statusData } from '@/utils/commonData'

const form = ref(null)
/* const searchData = ref({
    name: '',
    status: 0
}); */
// 接收变量
defineProps({
  searchData: {
    type: Object,
    default: () => ({})
  }
})

// 声明方法
const emits = defineEmits(['handleReset', 'handleSearch', 'handleClear'])

// 重置搜索框
const handleReset = () => {
  emits('handleReset')
}

// 搜索
const handleSearch = () => {
  emits('handleSearch')
}

// 清空
const handleClear = (val) => {
  emits('handleClear', val)
}
</script>
