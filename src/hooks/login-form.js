import {computed, watch} from 'vue'
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from "vue-router"

export function useLoginForm() {
    const MIN_LENGTH = 6;
    const store = useStore();
    const router = useRouter();

    const {handleSubmit, isSubmitting, submitCount} = useForm();

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите email')
            .email('Пожалуйста введите корректный email')
    );
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите password')
            .min(MIN_LENGTH, `Пароль должен быть не меньше ${MIN_LENGTH} cимволов`)
        
    );

    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    watch(isTooManyAttempts, (value) => {
        if(value) {
            setTimeout(() => {
                submitCount.value = 0;
            }, 1500)
        }
    })

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values)
            router.push('/');
        } catch(e) {
            console.error(e);
        }
    })

    return {
        email, 
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    }
}