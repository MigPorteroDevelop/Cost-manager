<script setup>
import { ref, reactive } from 'vue';
import Filter from './components/Filter.vue';
import Budget from './components/Budget.vue';
import budgetControl from './components/budgetControl.vue';
import expenseIcon from '/icons/new_expense.svg'
import Modal from './components/Modal.vue'

const modal = reactive({
  show: false,
  animate: false  
})
const budget = ref(0);
const available = ref(0);
const expenses = ref([]);

const expense = reactive({
  name: '',
  quantity: '',
  category: '',
  id: null,
  date: Date.now()
})

const defineBudget = (quantity) => {
  budget.value = quantity;
  available.value = quantity;
}

const showModal = () => {
  modal.show = true
  setTimeout(() => {
  modal.animate = true 
  },400);
}

const closeModal = () => {
  modal.animate = false 
  setTimeout(() => {
  modal.show = false 
  },400)
}

const saveExpense = () => {
  expenses.value.push({
    ...expense, 
    id: 123
  })
}
</script>

<template>
  <div>
    <header>
      <h1>Expense planner</h1>

      <div class="container-header container shadow">
        <Budget 
          v-if="budget === 0" 
          @define-budget="defineBudget" 
        />

        <budgetControl 
          v-else 
          :budget="budget"
          :available="available"
          />
      </div>
    </header>

    <main v-if="budget > 0">
      <div class="create-expense">
        <img 
          :src="expenseIcon" 
          alt="newExpense icon"
          @click="showModal"
        />
      </div>
      
      <Modal 
        v-if="modal.show === true"
        @close-modal="closeModal"
        @save-expense="saveExpense"
        :modal="modal"
        v-model:name="expense.name"
        v-model:quantity="expense.quantity"
        v-model:category="expense.category"
      />
    </main>
  </div>
</template>

<style>
:root {
  --purple: #b58883;
  --dark-green: #064237;
  --white: #FFF;
  --light-gray: #F5F5F5;
  --gray: #94a3b8;
  --dark-gray: #64748b;
  --black: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
* :before,
* :after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato";
}

h1 {
  font-size: 4rem;
  transform: translateY(3rem);
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--purple);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header {
  margin-top: -5rem;
  transform: translateY(12rem);
  padding: 5rem;
}

.shadow {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  background-color: var(--white);
}

.create-expense{
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expense img{
  width: 5rem;
  cursor: pointer;
}

</style>
