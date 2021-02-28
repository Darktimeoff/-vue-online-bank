<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Начните писать имя" v-model="name" />
        </div>
        <div class="form-control">
            <RequestStatus :hideTitleOption="false" titleOptionText="Выберете статус из списка" v-model="status" />
        </div>
        <button class="btn warning" v-if="isActive" @click="reset">Отчистить</button>
    </div>
</template>
<script>
import RequestStatus from '@/components/request/RequestStatus';
import { computed, ref, watch } from 'vue';
export default {
    components: {
        RequestStatus,
    },
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(_, {emit}) {
        const name = ref('');
        const status = ref('');

        watch([name, status], values => {
            emit('update:modelValue', {
                name: values[0],
                status: values[1],
            });
        });

        const isActive = computed(() => name.value || status.value);

        const reset = () => {
            name.value = '';
            status.value = '';
        }

        return {
            name,
            status,
            isActive,
            reset,
        }
    }
}
</script>