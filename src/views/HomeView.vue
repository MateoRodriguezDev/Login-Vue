<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const uStore = useUserStore()

const user = uStore.user.userName

</script>



<template>
  <div class="wrapper">
    Hola {{ user || 'invitado' }}
  </div>
</template>

<style scoped>
.wrapper {
  width: 400px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}
</style>