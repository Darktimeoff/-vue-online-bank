<template>
    <AppLoader v-if="loading" />
    <AppPage v-else-if="request" title="Заявка" :back="true"> 
        <p><strong>Имя владельца</strong>: {{request.fio}}</p>
        <p><strong>Телефон</strong>: {{request.phone}}</p>
        <p><strong>Cумма</strong>: {{currency(request.amount)}}</p>
        <p><strong>Статус</strong>: <AppStatus :type="request.status" /></p>

        <div class="form-control">
            <label for="status">Статус</label>
            <RequestStatus id="status" v-model="status" />
        </div>

        <button class="btn danger" @click="remove">Удалить</button>
        <button  v-if="statusChanged" class="btn" @click="update">Обновить</button>
    </AppPage>
    <h3 v-else class="text-center text-white">
        Заявки с ID = {{id}} нету.
    </h3>
</template>
<script>
import AppPage from '@/components/ui/AppPage';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import {currency} from '@/utils/currency'
import AppStatus from '../components/ui/AppStatus.vue';
import RequestStatus from '../components/request/RequestStatus.vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    components: {
        AppPage,
        AppLoader,
        AppStatus,
        RequestStatus,
    },
    setup(props) {
        const loading = ref(false);
        const router = useRouter();
        const status = ref('');
        const {dispatch } = useStore();
        const request = ref(null);

        onMounted(async () => {
            loading.value = true;

            request.value =  await dispatch('request/actionLoadById', props.id);
            status.value = request.value.status;

            loading.value = false;
        });

        const statusChanged = computed(() => {
            return status.value !== request.value.status;
        })

        const remove = async () => {
            await dispatch('request/actionDeleteRequest', props.id);
            router.push('/');
        }

        const update = async () => {
            await dispatch('request/actionUpdateRequest', {
                id: props.id,
                status: status.value,
            });

            request.value.status = status.value;
        }

        return {
            loading,
            request,
            currency,
            update,
            remove,
            status,
            statusChanged,
        }
    }
}
</script>