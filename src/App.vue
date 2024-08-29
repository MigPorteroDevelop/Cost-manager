<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import Filter from './components/Filter.vue';
import Budget from './components/Budget.vue';
import budgetControl from './components/budgetControl.vue';
import Modal from './components/Modal.vue';
import Expense from './components/Expense.vue';
import expenseIcon from '/icons/new_expense.svg';
import { idGenerate } from './helpers/index';

const modal = reactive({
  show: false,
  animate: false  
})
const budget = ref(0);
const available = ref(0);
const spent = ref(0);
const filter = ref('');
const expense = reactive({
  name: '',
  quantity: '',
  category: '',
  id: null,
  date: Date.now()
})
const expenses = ref([]);

//Observing the expenses
watch(expenses, () => {
  const totalSpent = expenses.value.reduce((total, expense) => total + expense.quantity, 0);
  spent.value = totalSpent
  available.value = budget.value - totalSpent
  
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
},{
  deep: true
  
})

watch(modal, () => {
  if(!modal.show){
    //Reset the object
    resetStateExpense();
  }
}, {
    deep: true
})

watch(budget, () => {
  localStorage.setItem('budget', budget.value)
})

onMounted(() => {
  const storageBudget = localStorage.getItem('budget')
  if(storageBudget){
    budget.value = Number(storageBudget)
  }

  const storageExpenses = localStorage.getItem('expenses')
  if(storageExpenses){
    expenses.value = JSON.parse(storageExpenses)
  }

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
  },500)
}

const saveExpense = () => {
  if(expense.id ) {
    //editing
    const { id } = expense
    const i = expenses.value.findIndex((expense => expense.id === id))
    expenses.value[i] = {...expense}
  }else{
    //new register
    expenses.value.push({
      ...expense, 
      id: idGenerate()
  })
}

  resetStateExpense();
  
}

const resetStateExpense = () => {
  Object.assign(expense, {
    name: '',
    quantity: '',
    category: '',
    id: null,
    date: Date.now()
  })
}

const selectExpense = id => {
  const editExpense = expenses.value.filter(expense => expense.id === id)[0]
  Object.assign(expense, editExpense);
  showModal();
}

const deleteExpense = () => {
  if(confirm('Delete expense?')) {  
  expenses.value = expenses.value.filter(expenseState => expenseState.id !== expense.id)
  closeModal();
  }
}

const filteredExpenses = computed(() => {
  if(filter.value){
    return expenses.value.filter(expense => expense.category === filter.value)
  }
  return expenses.value
})

const resetApp = () => {
  if(confirm('Dou you want to restart the budget and expenses?')){
    expenses.value = [];
    budget.value = 0;
  }
}
</script>

<template>
  <!--add class : if condition = true-->
  <div
    :class="{fix : modal.show}"
  >
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
          :spent="spent"
          @reset-app="resetApp"
          />
      </div>
    </header>

    <main v-if="budget > 0">
      
      <div class="expenses-list container">
        <Filter 
          v-model:filter="filter"
        />
          <h2>{{filteredExpenses.length > 0 ? 'Expenses' : 'No expenses yet'}}</h2>

          <Expense
            v-for="expense in filteredExpenses"
            :key="expense.id"
            :expense="expense"
            @select-expense="selectExpense"
          />
      </div>

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
        @delete-expense="deleteExpense"
        :modal="modal"
        :id="expense.id"
        :available="available"
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

.fix{
  overflow: hidden;
  height: 100vh;
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

.expenses-list{
  margin-top: 15rem;
}

.expenses-list h2{
  font-weight: 900;
  color: var(--dark-gray);
  text-align: center;
}

</style>
