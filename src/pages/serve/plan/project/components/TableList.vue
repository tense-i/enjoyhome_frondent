<script setup lang="ts">
import { COLUMNS } from '../constants'

// 行的key
const rowKey = 'index'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 加载状态
  dataLoading: {
    type: Boolean,
    default: false
  }
})

// 声明方法
const emit = defineEmits(['onPageChange'])

// 点击翻页
const onPageChange = (val) => {
  emit('onPageChange', val)
}

const isDecimals = (val) => {
  if (String(val).indexOf('.') > -1) {
    return true
  }
  return false
}
</script>

<template>
  <div class="baseList">
    <div class="tableBoxs">
      <!-- 当数据为空需要占位时，会显示 cellEmptyContent -->
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
        <!-- 处理序号 -->
        <template #rowIndex="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <!-- 图片预览及展示 -->
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
        <!-- 价格拼接 -->
        <template #price="{ row }">
          {{ isDecimals(row.price) ? row.price : row.price + '.00' }}
        </template>
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl">删除</a>
            <a class="font-bt">编辑</a>
            <a class="delete">禁用</a>
          </div>
        </template>
      </t-table>
      <t-pagination
        v-if="total > 10"
        v-model:current="pagination.pageNum"
        v-model:pageSize="pagination.pageSize"
        :total="total"
        @change="onPageChange"
      />
    </div>
  </div>
</template>
