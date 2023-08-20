<script>
import { useListStore } from '@/stores/list'
import { mapState, mapActions } from 'pinia'

//import component
import BaseInput from '@/components/BaseInput.vue'

// create initial input object
const initialInput ={
    name:'',
    description:'',
    completed: false
}
export default {
  name: 'ListView',
  data: () => ({
    input: { ...initialInput }
  }),
  //declare component, after import
  components:{
    BaseInput
  },
  computed: {
    // gangerti ini apa
    ...mapState(useListStore, ['getList'])
  },
    // ini juga kurang ngerti, tapi saya manut hehe
  methods: {
    ...mapActions(useListStore, ['addList','removeIndex']),
    // submit isi dari form
    addForm(event){
        console.log(event)
        //input string into action addList from list.js
        this.addList({...this.input})//still confused abt these "..." tho
        //empty the form section after passing the string 
        Object.assign(this.input,initialInput)
    }
  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <form @submit.prevent="($event)=>addForm($event)" method="post">
        <base-input
            v-model="input.name"
            class="input"
            placeholder="Input Task Here"
            >
        </base-input>
        
        <base-input
            v-model="input.description"
            class="input"
            placeholder="Description"
        ></base-input>
        <br>
        <input v-model="input.completed" type="checkbox"/>
        <br>
        <button type="submit">Add</button>
    </form>

    <ol class="list">
      <template v-for="(item, index) in getList" :key="index">
        <li>
            <button class="red" @click="($event) => removeIndex(index)">
              &times;
            </button>
            {{ item.name }}
            {{ item?.description ? `- ${item.description}`:'' }}
        </li>
      </template>
    </ol>
  </div>
</template>

<!-- ngga ngerti scoped itu buat apa -->
<style scoped>
/* styling buat input */
.input{
    padding: 0.5rem;
    font-size: 1rem;
}
/* styling tampilan buat listnya */
.list{
    margin-block: 0.5rem;
}
button.red{
  color:red;
}
</style>