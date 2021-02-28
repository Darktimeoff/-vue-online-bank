<template>
  <AppLoader v-if="loading" />
  <AppPage title="Список Заявок">
    <template #header>
      <button class="btn primary" @click="openModal">Создать</button>
    </template>

    <RequestFilter  v-model="filter" />
    <RequestTable :requests="requests" />

    <teleport to="body">
      <AppModal v-if="showModal" title='Создать заявку' @close="closeModal">
        <RequestModal @created="closeModal" :disabled="isSubmitting" />
      </AppModal>
    </teleport>
  </AppPage>
</template>

<script>
import AppPage from '@/components/ui/AppPage';
import RequestTable from '@/components/request/RequestTable';
import RequestModal from '@/components/request/RequestModal';
import RequestFilter from '@/components/request/RequestFilter';
import AppModal from '@/components/ui/AppModal';
import AppLoader from '@/components/ui/AppLoader';
import {useModal } from '@/hooks/modal';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    AppPage,
    AppModal,
    RequestModal,
    RequestTable,
    AppLoader,
    RequestFilter,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const filter = ref({});

    const requests = computed(() => store.getters['request/requests']
      .filter(request => {
        if(filter.value.name) {
          return request.fio.includes(filter.value.name)
        }
        return request;
      })
      .filter(request => {
        if(filter.value.status) {
          return filter.value.status === request.status;
        }
        return request;
      })
    );

    watch(filter, (value) => {
      console.log(value);
    })

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('request/actionLoadRequest');
      loading.value = false;
    })

    return { 
      ...useModal(),
      requests,
      loading,
      filter,
    }
  }
};
</script>
