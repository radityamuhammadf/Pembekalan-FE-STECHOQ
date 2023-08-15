<script>
export default {
    name: 'ListView',
    data: () => ({
        list: [
            {
                name: 'First List'
            },
            {
                name: 'Second List'
            }
        ]
    })
}
</script>

<template>
    <div>
        <h1>This is List</h1>
        <ol>
            <template v-for="(item,index) in list" :key="index">
                <li>{{ item.name }}</li>       
            </template>
        </ol>
    </div>
</template>