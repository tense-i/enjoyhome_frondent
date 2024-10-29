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
    />

    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom></DialogFrom>
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
import SearchFormBox from './components/SearchFrom.vue'
import TableList from './components/TableList.vue'
import { getNurseProjectListApi } from '@/api/serve'

/**
 * 搜索参数
 * @attention searchData没有限定类型、可能会在前端传递中进行修改。
 */
const searchData = ref<Object | any>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})

onMounted(() => {
  getNurseProjectList()
})

const handleSearch = () => {
  // 搜索后，默认回到第一页
  searchData.value.pageNum = 1
  getNurseProjectList()
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
  getNurseProjectList()
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
  getNurseProjectList()
}

const tableData = ref([])
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
  getNurseProjectList()
}

/**
 * 获取护理项目列表
 */
const getNurseProjectList = async () => {
  try {
    dataLoading.value = true
    const res = await getNurseProjectListApi(searchData.value)
    tableData.value = res.data.records
    total.value = Number(res.data.total)
  } catch (error) {
    console.log(error)
  } finally {
    dataLoading.value = false
  }
}
</script>
