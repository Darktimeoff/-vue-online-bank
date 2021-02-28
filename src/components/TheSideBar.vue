<template>
    <div v-if="sideBar" class="sidebar">
        <span class="sidebar-close" @click="close">&times;</span>

        <div class="sidebar-content">
            <p>Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпивающую информацию</p>
        </div>
    </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore();

        const sideBar = computed(() => store.state.sideBar);

        return {
            sideBar,
            close: () => store.commit('closeSideBar')
        }
    }
}
</script>