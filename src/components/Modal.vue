<script setup>
import closeIcon from '/icons/close.svg'

const emit = defineEmits(['close-modal']);
</script>
<template>
  <div class="modal">
    <div class="closeModal">
      <img
        :src="closeIcon"
        @click="$emit('close-modal')"
      />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.closeModal{
  position: absolute;
  
  right: 3rem;
  top: 3rem;
}

.closeModal img{
  width: 4rem;
  cursor: pointer;
}
</style>
