<script setup>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
import { formatQuantity } from '../helpers'

defineEmits(['reset-app'])

const props = defineProps({
  budget: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
  spent: {
    type: Number,
    required: true
  }
})

</script>

<template>
  <div class="columns">
    <div class="graphic-container">
      <CircleProgress
        :percent="20"
        :size="250"
        :border-width="30"
        :border-bg-width="30"
        fill-color="#b58883"
        empty-color="#F5F5F5"
      />
    </div>

    <div class="budget-container">
      <p><span>Budget:</span> {{ formatQuantity(budget) }}</p>
      <p><span>Spent:</span> {{ formatQuantity(spent) }}</p>
      <p><b><span>Available:</span> {{ formatQuantity(available) }}</b></p>
      <button 
        class="reset-app"
        type="button"
        @click="$emit('reset-app')"
      >Reset</button>
    </div>
  </div>
</template>

<style scoped>
.columns {
  display: flex;
  flex-direction: column;
}

.columns> :first-child {
  margin-bottom: 1rem;
}

@media(min-width: 768px) {
  .columns {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
    justify-content: center;
  }

  .columns> :first-child {
    margin-bottom: 0;
  }
}


.reset-app {
  background-color: var(--purple);
  border: none;
  padding: 1rem;
  width: 100%;
  color: var(--white);
  font-weight: 900;
  border-radius: 1rem;
}

.reset-app:hover {
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: scale(1.1);
}

.budget-container {
  width: 100%;
}

.budget-container p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--dark-gray);
}

@media(min-width: 768px) {
  .budget-container p {
    text-align: left;
  }
}

.budget-container span {
  font-weight: 900;
  color: var(--purple);
}
</style>