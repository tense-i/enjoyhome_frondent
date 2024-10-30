<script setup lang="ts">
defineProps<{
  visible: boolean
  title: string
  body: string
}>()

const emits = defineEmits([
  'handleNursingProjectDelete',
  'handleNursingProjectForbidden',
  'handleOperationDlgConfirm',
  'handleOperationDlgCancel',
  'handleOperationConfirm',
  'onClose'
])

const onConfirm = () => {
  emits('handleOperationConfirm')
}

const onClose = () => {
  emits('handleOperationDlgCancel')
}
</script>

<template>
  <div class="check-dialog">
    <t-dialog
      :visible="visible"
      :header="title"
      :body="body"
      confirm-btn="确认"
      cancel-btn="取消"
      :on-confirm="onConfirm"
      :on-close="onClose"
    />
  </div>
</template>

<style scoped lang="css"></style>
