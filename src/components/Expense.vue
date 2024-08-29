<script setup>
import { formatQuantity, formatDate } from '../helpers/index'
import SavingIcon from '/icons/savings_icon.svg'
import HomeIcon from '/icons/home_icon.svg'
import FoodIcon from '/icons/food_icon.svg'
import ExpensesIcon from '/icons/miscellaneous_icon.svg'
import LeisureIcon from '/icons/leisure_icon.svg'
import HealthIcon from '/icons/health_icon.svg'
import SubscriptionsIcon from '/icons/subscriptions_icon.svg'

const IconDictionary = {
  saving: SavingIcon,
  food: FoodIcon,
  hause: HomeIcon,
  expenses: ExpensesIcon,
  leisure: LeisureIcon,
  health: HealthIcon,
  subscriptions: SubscriptionsIcon
}

const props = defineProps({
  expense: {
    type: Object,
    required: true
  }
})

defineEmits(['select-expense'])
</script>

<template>
  <div class="expense shadow">
    <div class="content">
      <img 
        :src="IconDictionary[expense.category]" 
        alt="expenses_icon"
        class="icon"
        >
      <div class="details">
        <p class="category">{{ expense.category }}</p>
        <p 
        class="name"
        @click="$emit('select-expense', expense.id)"
        >{{ expense.name }}</p>
        <p class="date"><span>{{ formatDate(expense.date) }}</span></p>
      </div>
    </div>
    <p class="quantity">{{ formatQuantity(expense.quantity) }}</p>
  </div>
</template>


<style scoped>
.expense {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 3rem;
}

.content{
  display: flex;
  gap: 2rem;
  align-items: center;
}

.icon{
  width: 5rem;
}

.details p{
  margin: 0 0 1rem 0;
}

.category{
  color: var(--dark-gray);
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 900;
}

.name{
  color: var(--dark-gray);
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
}

.date{
  color: var(--dark-gray);
  font-size: 1.6rem;
  font-weight: 900;
}

.date span{
  font-weight: 400;
}

.quantity{
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
</style>