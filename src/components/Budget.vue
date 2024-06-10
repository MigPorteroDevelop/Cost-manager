<script setup>
import {ref} from 'vue';

const budget = ref(0)
</script>

<template>
  <form
    class="budget"
  >
    <div class="field">
      <input 
        id="new-budget"
        class="new-budget" 
        placeholder="Add your budget" 
        type="number"
      />

      <input 
        type="submit" 
        value="Define budget" 
      />
    </div>
  </form>
</template>

<style scoped>
  .budget{
    width: 100%;
  }

  .field{
    display: grid;
    gap: 2rem;
  }

  .budget input[type="number"]{
    background-color: var(--light-gray);
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    font-size: 2rem;
    text-align: center;
  }

  .budget input[type="submit"]{
    background-color: var(--purple);
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--white);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
  }

  .budget input[type="submit"]:hover{
    background-color: #064237;
  }
</style>
