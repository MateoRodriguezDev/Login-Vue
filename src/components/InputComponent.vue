<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { Input } from '@/models/InputModel.ts';
const props = defineProps<{
    input: Input

}>()
</script>

<template>
    <div class="input-bx">
        <input v-bind:name="input.name" v-bind:type="input.type" v-bind:placeholder="input.placeholder" required>
        <ion-icon class="icon" v-bind:name="input.iconName"></ion-icon>
    </div>
</template>

<style>
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