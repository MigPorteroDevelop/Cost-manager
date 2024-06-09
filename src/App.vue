<script setup>
import Filter from './components/Filter.vue';

</script>

<template>
  <div>
    <header>
      <h1>Expense planner</h1>
    </header>
    <!--<Filter />-->
  </div>
</template>

<style>
:root {
  --blue: #3b82f6;
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
}

h2 {
  font-size: 3rem;
}
header{
  background-color: var(--blue);
}
header h1{
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
}
</style>
