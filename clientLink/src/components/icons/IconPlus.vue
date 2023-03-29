<template>
  <div class="plus">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 12H12M12 12H9M12 12V9M12 12V15M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z"
        stroke="#00BD7E" stroke-width="2" stroke-linecap="round" />
    </svg>
  </div>
</template>

<style>
.plus {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
  transition: transform .15s;
  cursor: pointer;
}

.plus:hover {
  transform: scale(1.2);
}
</style>