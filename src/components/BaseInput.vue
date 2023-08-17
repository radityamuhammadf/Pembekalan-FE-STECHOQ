<script>
export default{
    props: {

        modelValue:{
            type:String,
            default:''
        },
        //input type? wdym
        type:{
            type:String,//value type
            default:'text',
            validator:(value)=>['text','password'].includes(value)
        }
    },
    emits: ['update:modelValue']
}
</script>

<template>
    <input 
        :type="type"
        :value="modelValue"
        @input="($event)=>$emit('update:modelValue',$event.target.value)"
    />
</template>