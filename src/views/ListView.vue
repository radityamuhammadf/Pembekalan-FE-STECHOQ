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
    input: { ...initialInput },
    editing:false
  }),
  //declare component, after import
  components:{
    BaseInput
  },
  computed: {
    // gangerti ini apa
    ...mapState(useListStore, ['getList','getDetail'])
  },
    // ini juga kurang ngerti, tapi saya manut hehe
  methods: {
    ...mapActions(useListStore, ['addList','editIndex','removeIndex']),
    resetForm(){
      //reset input using initial value --> yang blank itu
      Object.assign(this.input,initialInput)
      //reset editing state to false
      this.editing=false
    },
    // submit isi dari form
    addForm(event){
        console.log(event)
        //check if the editing state is false
        if (this.editing===false){
          //input string into action addList from list.js
          this.addList({...this.input})//still confused abt these "..." tho
        }
        else{//if the editing state is true
          this.editIndex(this.editing,{...this.input})
        }
        //newly made resetform function
        this.resetForm()
    },
    detailList(index){
      //set editing state into true in these index parameter
      this.input={...this.getDetail(index)}
    },
    // THE checklist function
    toggleCompleted(index){
      const detail=this.getDetail(index)
      this.editIndex(index,{...detail,completed: !detail.completed})
    } 

  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <form @submit.prevent="($event)=>addForm($event)" method="post" @reset="()=>resetForm()">
        <base-input
            v-model="input.name"
            class="input"
            placeholder="Input Task Here"
            required
            >
        </base-input>
        
        <base-input
            v-model="input.description"
            class="input"
            placeholder="Description"
            required
        ></base-input>
        <br>
        <input v-model="input.completed" type="checkbox"/>
        <br>
        <button type="submit">Add</button>
        <button type="reset">Cancel</button>
    </form>

    <!--THE list view after inputing -->
    <ol class="list">
      <template v-for="(item, index) in getList" :key="index">
        <li @dblclick="()=>toggleCompleted(index)" :class="{ strike:item.completed}">
          <!--trigger edit by index-->
            <button class="red" @click="($event) => removeIndex(index)" :disabled="editing!==false">
              &times;
            </button>
            <button class="orange" @click="()=>detailList(index)" :disabled="editing !==false">
              <!--ini teh apa....-->
              &#9998;
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
.strike{
  text-decoration: line-through;
}
button.red{
  color:red;
}
button.orange{
  color:orange;
}
</style>