<template>
    <div id="app">
        <g-header />
        <router-view />
    </div>
</template>

<script>
import GHeader from './components/header/index.vue'
export default {
    components: {
        GHeader,
    }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
* {
    padding: 0;
    margin: 0;
}

html,
body {
    width: 100%;
    height: 100%;
    display: flow-root;
}

#app {
    width: 100%;
    height: 100%;
    position: relative;
}
.loading {
    position: relative;
}
.loading::after {
    content: 'loading...';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
    background-color: grey;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

a {
    color: rgb(0,0,238);
}
a:visited {
    color: rgb(0,0,238);
}

.box-sizing-border {
    box-sizing: border-box;
}

.main-container {
    padding: 20px;
}

/* @media screen and (max-width: 768px) {
    .main-container {
        left: 0;
        margin-left: 0;
    }
} */
</style>