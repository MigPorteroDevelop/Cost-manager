<script setup>
defineProps(['filter'])
defineEmits(['update:filter'])
</script>

<template>
  <div class="filters shadow container">
    <form>
      <div class="field">
        <label for="filter">Filter expenses</label>
        <select
            id="filter"
            :value="filter"
            @input="$emit('update:filter', $event.target.value)"
            class="selector"
          >
            <option value="">--Select category--</option>
            <option value="saving">Savings</option>
            <option value="food">Food</option>
            <option value="hause">Hause</option>
            <option value="expenses">Miscellaneous expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.filters{
  margin-top: 10rem;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem;
}

.filters .field{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.filters label{
  font-size: 3rem;
  font-weight: 900;
  color: var(--dark-gray);
}

.selector{
  flex: 1;
  text-align: center;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--light-gray);
}
</style>
