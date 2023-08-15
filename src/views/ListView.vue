<script setup>
import {ref} from 'vue'
import {useListStore} from '@/stores/list'

const store = useListStore();
const nameInput=ref('')

</script>

<template>
    <h1>This is List</h1>
    <input 
     v-model="nameInput" 
     type="text"
     name="name" 
     @keyup.enter="store.addList(nameInput);nameInput=''"
    />
    <ol>
        <template v-for="item in store.getList" v-bind:key="item">
            <li>{{ item.name }}</li>       
        </template>
    </ol>
</template>