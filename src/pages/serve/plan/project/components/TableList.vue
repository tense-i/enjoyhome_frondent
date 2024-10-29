<script setup lang="ts">
import { ref, watch } from 'vue'
import { COLUMNS } from '../constants'
import type { ProjecListModel } from '@/api/model/serveModel'
import type { PaginationType } from '@/api/model/common'

// 行的key
const rowKey = 'index'

const props = defineProps<{
  data: ProjecListModel[]
  total: number
  pagination: PaginationType
  dataLoading: boolean
}>()

// 创建一个本地副本
const localPagination = ref({ ...props.pagination })

// 监听 props 的变化并更新本地副本
watch(
  () => props.pagination,
  (newVal) => {
    localPagination.value = { ...newVal }
  },
  { deep: true }
)

// 声明emit事件及参数类型
const emit = defineEmits<{
  (e: 'onPageChange', val: any): void
  (e: 'handleBulid'): void
  (e: 'handleDelete', row: ProjecListModel): void
  (e: 'handleEdit', row: ProjecListModel): void
  (e: 'handleForbidden', row: ProjecListModel): void
}>()

// 点击翻页
const onPageChange = (val) => {
  emit('onPageChange', val)
}

const isDecimals = (val) => {
  return String(val).indexOf('.') > -1
}

// 新增护理项目
const handleBulid = () => {
  emit('handleBulid')
}

// 删除护理项目
const handleDelete = (row) => {
  emit('handleDelete', row)
}

// 编辑护理项目
const handleEdit = (row) => {
  emit('handleEdit', row)
}

// 禁用护理项目
const handleForbidden = (row) => {
  emit('handleForbidden', row)
}
</script>

<template>
  <div class="newBox">
    <button class="bt wt-120" @click="handleBulid">新增护理项目</button>
  </div>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="fixed"
        table-content-width="100%"
      >
        <template #rowIndex="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template #image="{ row }">
          <div class="tdesign-demo-image-viewer__base">
            <t-image-viewer :images="[row.image]">
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="row.image"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span> <BrowseIcon size="1.4em" /> 预览 </span>
                  </div>
                </div>
              </template>
            </t-image-viewer>
          </div>
        </template>
        <template #price="{ row }">
          {{ isDecimals(row.price) ? row.price : row.price + '.00' }}
        </template>
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl" @click="handleDelete(row)">删除</a>
            <a class="font-bt" @click="handleEdit(row)">编辑</a>
            <a class="delete" @click="handleForbidden(row)">禁用</a>
          </div>
        </template>
      </t-table>

      <t-pagination
        v-if="total > 10"
        v-model:current="localPagination.pageNum"
        v-model:pageSize="localPagination.pageSize"
        :total="total"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="css">
.newBox {
  margin-bottom: 10px;
}
</style>
