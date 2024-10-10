<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/models/UserModel';




const uStore = useUserStore()
const user: any = reactive<any>({
    userName: '',
    password: '',
    rememberMe: false
})

const router = useRouter()

function onSubmit() {
    uStore.setUser(user)
    console.log(uStore.user)
    router.push('home')
}


</script>

<template>
    <div class="wrapper">
        <form @submit.prevent="onSubmit" id="loginForm">
            <h1>Login</h1>
            <div class="input-bx">
                <input v-model="user.userName" name="user" type="text" placeholder="Usuario" required>
                <ion-icon class="icon" name="person-circle"></ion-icon>
            </div>
            <div class="input-bx">
                <input v-model="user.password" name="password" type="password" placeholder="Contraseña" required>
                <ion-icon class="icon" name="lock-closed"></ion-icon>
            </div>
            <div class="remember-forgot">
                <label><input v-model="user.rememberMe" type="checkbox" name="remember"> Recordarme</label>
                <a href="#">Olvidaste tu contraseña</a>
            </div>
            <button type="submit" class="btn">Ingresar</button>
        </form>
    </div>
</template>

<style scoped>
/* estilos del componente */

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

.wrapper h1 {
    font-size: 3em;
    text-align: center;
}



.wrapper .remember-forgot {
    display: flex;
    justify-content: space-between;
    font-size: 1.2em;
    margin: -15px 0 15px;
}

.wrapper .remember-forgot label input {
    accent-color: #fff;
    margin-right: 3px;
}

.wrapper .remember-forgot a {
    color: #fff;
    text-decoration: none;
}

.wrapper .remember-forgot a:hover {
    text-decoration: underline;
}

.wrapper button {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
}

.input-bx {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.input-bx input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 15px;
    color: #fff;
    padding: 20px 45px 20px 20px;
}

.input-bx input::placeholder {
    color: #fff;
}

.input-bx .icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
}
</style>