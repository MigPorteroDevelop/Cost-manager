<script setup>
import Filter from './components/Filter.vue';
import Budget from './components/Budget.vue';

</script>

<template>
  <div>
    <header>
      <h1>Expense planner</h1>

      <div class="container-header container shadow">
        <Budget 
        
        />
      </div>
    </header>



  </div>
</template>

<style>
:root {
  --purple: #b58883;
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

.container{
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header{
  margin-top: -5rem;
  transform: translateY(12rem);
  padding: 5rem;
}
.shadow{
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  background-color: var(--white);
}
</style>
