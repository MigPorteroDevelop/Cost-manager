<script setup>
import { ref, computed } from 'vue';
import Alert from './Alert.vue';
import closeIcon from '/icons/close.svg';

const error = ref('');

const emit = defineEmits(['close-modal', 'save-expense', 'update:name', 'update:quantity', 'update:category', 'delete-expense']);
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
  },
  id: {
    type: [String, null],
    required: true
  }
})

const oldQuantity = props.quantity

const addExpense = () => {
  const { quantity, category, name, available, id } = props
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

        //If we have id, means that we're editing
        if(id){
          if(quantity > oldQuantity + available){
            error.value = 'You exceeded the budget'
              setTimeout(() => {
                  error.value = ''
              }, 3000);
              return
          }
          emit('close-modal')
        }else{
          //Delete if you want to accept exceed the budget
          if(quantity > available) {
              error.value = 'You exceeded the budget'
              setTimeout(() => {
                  error.value = ''
              }, 3000);
              return
          }     
        }       
        emit('save-expense')
      }

const isEditing = computed(() => {
  return props.id
})

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
        <legend>{{ isEditing ? 'Save changes' : 'Add expense'}}</legend>
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
            step="0.01"
            />
        </div>
        <div class="field">
          <label for="category">Category:</label>
          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
            class="selector"
          >
            <option value="">Select the category</option>
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
          :value="[ isEditing ? 'Save changes' : 'Add expense']"
        >
      </form>

      <button
        type="button"
        class="btn-delete"
        v-if="isEditing"
        @click="$emit('delete-expense')"
      >
        Delete expense
      </button>

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

.btn-delete{
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
  background-color: #d50000;
  font-weight: 700;
  font-size: 2.2rem;
  color: var(--white);
  margin-top: 2rem;
  cursor: pointer;
}

.selector option:first-of-type {
  color: #02866d;
  font-style: italic;
  text-transform: uppercase;
  font-weight: 900;
}
</style>
