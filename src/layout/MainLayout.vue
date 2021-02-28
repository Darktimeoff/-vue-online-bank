<template>
    <TheNavbar></TheNavbar>
    <TheSideBar></TheSideBar>
    <div class="container with-nav">
        <AppMessage />
        <router-view />
    </div>
</template>
<script>
import TheNavbar from "@/components/TheNavbar.vue";
import AppMessage from '@/components/ui/AppMessage';
import TheSideBar from '@/components/TheSideBar.vue';

export default {
    components: {
        TheNavbar,
        AppMessage,
        TheSideBar,
    }
}
</script>