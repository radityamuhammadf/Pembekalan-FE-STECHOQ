<template>
    <div>
        <!--change nullish to logical or bc param id is always provided in optional param-->
        <h1>
        {{ $route.params?.id||'User' }} Task Detail
        </h1>    
    </div>
</template>