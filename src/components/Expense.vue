<script setup>
import { formatQuantity, formatDate } from '../helpers/index'
import SavingIcon from '../../public/icons/savings_icon.svg'
import HomeIcon from '../../public/icons/home_icon.svg'
import FoodIcon from '../../public/icons/food_icon.svg'
import ExpensesIcon from '../../public/icons/miscellaneous_icon.svg'
import LeisureIcon from '../../public/icons/leisure_icon.svg'
import HealthIcon from '../../public/icons/health_icon.svg'
import SubscriptionsIcon from '../../public/icons/subscriptions_icon.svg'

const IconDictionary = {
  saving: SavingIcon,
  food: FoodIcon,
  home: HomeIcon,
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
        <p class="name">{{ expense.name }}</p>
        <p class="date">{{ formatDate(expense.date) }}</p>
      </div>
      <p class="quantity">{{ formatQuantity(expense.quantity) }}</p>
    </div>
  </div>
</template>

<style scoped></style>