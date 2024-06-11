<template>
  <div 
    class="alert"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
  .alert{
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 2rem;
    text-align: center;
    background-color: var(--white);
    color: #B91C1C;
    margin-bottom: 2rem;
  }
</style>