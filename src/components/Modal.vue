<script setup>
import closeIcon from '/icons/close.svg'

const emit = defineEmits(['close-modal']);
const props = defineProps({
  modal: {
    type: Object,
    required: true
  }
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
      >
        <legend>Add expense</legend>

        <div class="field">
          <label for="name">Expense name:</label>
          <input 
            type="text"
            id="name"
            placeholder="Add expense name"
            />
        </div>

        <div class="field">
          <label for="quantity">Quantity:</label>
          <input 
            type="number"
            id="quantity"
            placeholder="Add quantity, ej. 300"
            />
        </div>
        <div class="field">
          <label for="quantity">Category:</label>
          <select
            id="category"
          >
            <option value="">Select the expense</option>
            <option value="savings">Savings</option>
            <option value="food">Food</option>
            <option value="hause">Hause</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <input 
          type="submit"
          value="Add expense"
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
