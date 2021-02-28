<template>
    <span :class="['badge', className]">{{text}}</span>
</template>

<script>
import {ref, watch} from 'vue'
export default {
    props: {
        type: String,
    },
    setup(props) {
        const classesMap = {
            active: 'primary',
            cancel: 'danger',
            done: 'primary',
            pending: 'warning',
        }

        const textMap = {
            active: 'Активен',
            cancel: 'Отмёнен',
            done: 'Завершен',
            pending: 'Выполняеться',
        }

        const className = ref(classesMap[props.type])
        const text = ref(textMap[props.type]);

        watch(() => props.type, (value) => {
            console.log(value)
            className.value = classesMap[value];
            text.value = textMap[value];
        })

        return {
            className,
            text,
        }
    }
}
</script>