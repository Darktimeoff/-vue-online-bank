<template>
    <h4 v-if="!requests?.length" class="text-center">Заявок пока нет</h4>
    <table v-else class="table">
        <thead>
            <tr>
                <th v-for="column in columnName" :key="column" @click="$emit('sortedBy', column)">{{column}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(r, idx) in requests" :key="r.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ r.fio }}</td>
                <td>{{ r.phone }}</td>
                <td>{{ currency(r.amount) }}</td>
                <td><AppStatus :type="r.status" /> </td>
                <td>
                    <router-link custom :to="{name: 'Request', params: {id: r.id}}" v-slot="{navigate}">
                        <button class="btn" @click="navigate">Открыть</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { currency } from '@/utils/currency';
import AppStatus from '@/components/ui/AppStatus';

export default {
    props: {
        requests: Array,
    },
    components: {
        AppStatus,
    },
    setup(props) {
        const columnName = ['#', 'ФИО', 'Телефон', 'Сумму', 'Статус', 'Действие'];
        return {
            columnName,
            currency,
        };
    }
}
</script>