<!-- 护理项目列表页 -->
<template>
  <div class="min-h serveProject bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :searchData="searchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
      @handleClear="handleClear"
    />
    <!-- end -->
    <!-- 表格 -->
    <TableList
      :data="tableData"
      :total="total"
      :pagination="pagination"
      :dataLoading="dataLoading"
      @onPageChange="onPageChange"
      @handleBulid="handleBulid"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"
      @handleForbidden="handleForbidden"
    />

    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :title="title"
      @handleClose="handleClose"
      @handleAdd="handleAdd"
    />
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete></Delete>
    <!-- end -->
    <!-- 禁用弹层 -->
    <Forbidden></Forbidden>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import SearchFormBox from './components/SearchFrom.vue'
import TableList from './components/TableList.vue'
import DialogFrom from './components/DialogForm.vue'
import { getNurseProjectListApi, projectAdd } from '@/api/serve'
import type { ProjecListModel, SEARCH_PARAMS } from '@/api/model/serveModel'
/**
 * 搜索参数
 * @attention searchData没有限定类型、可能会在前端传递中进行修改。
 */
const searchData = ref<SEARCH_PARAMS>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})

onMounted(() => {
  getNurseProjectList(searchData.value)
})

const handleSearch = (val: SEARCH_PARAMS) => {
  // 搜索后，默认回到第一页
  searchData.value.pageNum = 1
  getNurseProjectList(val)
}

/**
 * 重置为默认值
 */
const handleReset = () => {
  console.log('重置')
  searchData.value = {
    pageNum: 1,
    pageSize: 10
  }
  getNurseProjectList(searchData.value)
}

/**
 * 清空搜索条件
 * @attention 清空搜索条件后，需要重新获取数据
 */
const handleClear = (key: string) => {
  console.log(key)
  if (key === 'name') {
    delete searchData.value.name
  } else if (key === 'status') {
    delete searchData.value.status
  }
  // 深拷贝
  searchData.value = {
    ...searchData.value
  }
  getNurseProjectList(searchData.value)
}

const tableData = ref<ProjecListModel[]>([])
const total = ref(0)
const pagination = ref({})
const dataLoading = ref(false)

/**
 * 翻页或改变每页条数
 * @param data 包括Current、pageSize
 */
function onPageChange(data: any) {
  console.log(data)
  if (data.current) {
    searchData.value.pageNum = data.current
  }
  if (data.pageSize) {
    searchData.value.pageSize = data.pageSize
  }
  getNurseProjectList(searchData.value)
}

/**
 * 获取护理项目列表
 */
const getNurseProjectList = async (val: SEARCH_PARAMS) => {
  debugger
  try {
    dataLoading.value = true
    const res = await getNurseProjectListApi(val)
    tableData.value = res.data.records
    total.value = Number(res.data.total)
  } catch (error) {
    console.log(error)
  } finally {
    dataLoading.value = false
  }
}

// 新增护理项目
const visible = ref(false)
const title = ref('新增')
const formRef = ref(null)
const handleBulid = () => {
  visible.value = true
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false
}

// 向父组件暴露方法
defineExpose({
  handleClear
})
// 新增护理项目
const handleAdd = async (params: any) => {
  console.log(params)
  const res = await projectAdd(params)
  console.log(res)
  if (res.code === 200) {
    MessagePlugin.success('新增成功')
    getNurseProjectList(searchData.value)
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.message)
  }
}

// 删除护理项目
const handleDelete = (row: any) => {
  console.log(row)
}
// 编辑护理项目
const handleEdit = (row: any) => {
  console.log(row)
}
// 禁用护理项目
const handleForbidden = (row: any) => {
  console.log(row)
}
</script>
