<script setup>
import { ref } from 'vue';
import Alert from './Alert.vue';
import closeIcon from '/icons/close.svg';

const error = ref('');

const emit = defineEmits(['close-modal', 'save-expense', 'update:name', 'update:quantity', 'update:category']);
const props = defineProps({
  modal: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity:{
    type: [String, Number],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  available: {
    type: Number,
    required: true
  }
})

const addExpense = () => {
  const { quantity, category, name, available } = props
        if([quantity, category, name].includes('')) {
            error.value = 'All fields are required'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }

   if(quantity <= 0) {
            error.value = 'Invalid quantity'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }
        
        //Delete if you want to accept exceed the budget
        if(quantity > available) {
            error.value = 'You exceeded the budget'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }     
        
        emit('save-expense')
      }
</script>

<template>
  <div class="modal">
    <div class="closeModal">
      <img
        :src="closeIcon"
        @click="$emit('close-modal')"
      />
    </div>
    <div class="container form-container"
      :class="[modal.animate ? 'animate' : 'close']"
    >
      <form
        class="new-expense"
        @submit.prevent="addExpense"
      >
        <legend>Add expense</legend>
        <Alert v-if="error">{{ error }}</Alert>

        <div class="field">
          <label for="name">Expense name:</label>
          <input 
            type="text"
            id="name"
            placeholder="Add expense name"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
            />
        </div>
        <div class="field">
          <label for="quantity">Quantity:</label>
          <input 
            type="number"
            id="quantity"
            placeholder="Add quantity, ej. 300"
            :value="quantity"
            @input="$emit('update:quantity', parseFloat($event.target.value))"
            />
        </div>
        <div class="field">
          <label for="category">Category:</label>
          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
          >
            <option value="">--Select the expense--</option>
            <option value="saving">Savings</option>
            <option value="food">Food</option>
            <option value="hause">Hause</option>
            <option value="expenses">Miscellaneous expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <input 
          type="submit"
          >
      </form>
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

.form-container{
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.form-container.animate{
  opacity: 1;
}

.form-container.close{
  opacity: 0;
}

.new-expense{
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.new-expense legend{
  text-align: center;
  color: var(--white);
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
}

.new-expense input,
.new-expense select{
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}

.new-expense label{
  color: var(--white);
  font-size: 3rem;
}

.new-expense input[type="submit"]{
 background-color: var(--purple);
 color: var(--white);
 font-weight: 700;
 cursor: pointer;
}

.field{
  display: grid;
  gap: 2rem;
}

.field select{
  cursor: pointer;
}
</style>
