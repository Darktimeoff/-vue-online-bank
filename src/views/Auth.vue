<template>
    <form class="card" @submit.prevent="onSubmit">
        <h2>Войти в систему</h2>

        <div :class="['form-control', {invalid: eError}]">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" @blur="eBlur">
            <small v-if="eError">{{eError}}</small>
        </div>
        <div :class="['form-control', {invalid: pError}]">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" @blur="pBlur">
            <small v-if="pError">{{pError}}</small>
        </div>

        <button type="submit" class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Войти в систему</button>
        <div class="text-danger" v-if="isTooManyAttempts">Вы слишком часто пытаетесь войти систему попробуйте позже</div>
    </form>
</template>
<script>
import {useLoginForm} from "@/hooks/login-form";
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { error } from '@/utils/error';

export default {
    setup() {
        const {query} = useRoute();
        const {dispatch} = useStore();

        if(query.message) {
            dispatch('actionSetMessage', {
                value: error(query.message),
                type: 'warning',
            })
        }

        return {
            ...useLoginForm(),
        }
    }
};
</script>