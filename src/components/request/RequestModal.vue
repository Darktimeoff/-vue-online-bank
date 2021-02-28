<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{invalid: fError}">
            <label for="fio">ФИО</label>
            <input type="text" id="fio" v-model="fio" @blur="fBlur"/>
            <small>{{fError}}</small>
        </div>
         <div class="form-control" :class="{invalid: pError}">
            <label for="phone">Телефон</label>
            <input type="text" id="phone" v-model="phone" @blur="pBlur"/>
            <small>{{pError}}</small>
        </div>
         <div class="form-control" :class="{invalid: aError}">
            <label for="amount">Суммы</label>
            <input type="number" id="amount" v-model.number="amount" @blur="aBlur"/>
            <small>{{aError}}</small>
        </div>
        <div class="form-control">
            <label for="status">Статус</label>
            <RequestStatus id='status' v-model="status" />
        </div>

        <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
</template>
<script>
import {useRequestForm} from '@/hooks/request-form';
import RequestStatus from '@/components/request/RequestStatus';
import { useStore } from 'vuex';

export default {
    emits: ['created'],
    components: {
        RequestStatus,
    },
    setup(_, {emit}) {
        const {dispatch} = useStore();

        const submit = async values => {
            if(!values) return;
            console.log(values);
            dispatch('request/actionCreateRequest', values);
            emit('created');
        }

        return {
            ...useRequestForm(submit)
        }
    }
}
</script>