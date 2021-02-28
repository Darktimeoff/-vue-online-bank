<template>
    <select :value="modelValue" @change.="$emit('update:modelValue', $event.target.value)">
        <option v-if="!hideTitleOption" disabled selected>{{titleOptionText}}</option>
        <option value="done">Завершен</option>
        <option value="cancel">Отмёнен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняеться</option>
    </select>
</template>
<script>
export default {
    props: {
        modelValue: String,
        hideTitleOption: {
            type: Boolean,
            default: true,
        },
        titleOptionText: String,
    }
}
</script>