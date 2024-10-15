<script setup lang="ts">
import { formatTime } from '@/helpers/formatDate';
import type { User } from '@/models/UserModel';
import { useAuthStore } from '@/stores/authStore';
import { useSesionStore } from '@/stores/sesionStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

//Llamo a todos los stores y almaceno el user
const authStore = useAuthStore()
const userStore = useUserStore()
const sesionStore = useSesionStore()
const user = authStore.auth.data as User


//Mini delay de carga para la lista de usuarios
let isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000);


function logout() {
  authStore.logout()
  sesionStore.remove()
}

</script>



<template>
  <div class="wrapper">
    <h1>Hola, {{ user.firstName }}</h1>

    <div class="limit"></div>

    <div>
      <h2>Información del usuario: </h2>
      <p>Nombre: {{ `${user.firstName} ${user.lastName}` }}</p>
      <p>Rol: {{ user.isAdmin ? 'Admin' : 'Usuario' }}</p>
    </div>

    <div class="limit"></div>

    <div>
      <div class="title">
        <h2>Información de sesión: </h2>
        <p v-show="sesionStore.loading" class="loader"></p>
      </div>
      <p>JWT Payload: <span>{{ sesionStore.data?.payload }}</span></p>
      <p>JWT Creado a las: <span>{{ formatTime(sesionStore.data?.createdAt!) }}</span></p>
      <p>JWT Expira a las: <span>{{ formatTime(sesionStore.data?.expiresAt!) }}</span></p>
      <p>JWT se refresca a las: <span>{{ formatTime(sesionStore.data?.refreshAt!) }}</span></p>
    </div>

    <div class="limit"></div>

    <div>
      <div class="title">
        <h2>Lista de Usuarios: </h2>
        <p v-show="isLoading" class="loader"></p>
      </div>
      <div v-for="user in userStore.users" v-bind:key="user.id" v-show="!isLoading">
        <p>{{ `${user.firstName} ${user.lastName} [${user.isAdmin ? 'Admin' : 'Usuario'}]` }}</p>
      </div>
      <button v-show="user.isAdmin" class="add">+ Agregar Nuevo</button>
    </div>

    <div class="limit"></div>

    <button @click="logout" class="logout">
      Salir
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  width: 450px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  color: #fff;
  padding: 20px 30px;
  border-radius: 15px;
}

h1 {
  font-size: 30px;
  font-weight: 600;
}

h2 {
  font-size: 25px;
  font-weight: 600;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

p {
  font-size: 20px;
  font-weight: 400;
}

p span {
  font-weight: 200;
}

.add {
  all: unset;
  border: solid 2px #fff;
  border-radius: 20px;
  padding: 5px;
  transition: ease-out;
}

.add:hover {
  background-color: #fff;
  color: black;
  cursor: pointer;
}

.logout {
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  outline: none;
  border: none;
  margin: 0;

}

.logout:hover {
  cursor: pointer;
  background-color: #c5c5c5;
}

.logout p {
  font-weight: 600;
}

.limit {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 5px 0 5px 0;
}

.loader {
  margin: 0;
  width: 17px;
  height: 17px;
  border: 2px solid white;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>