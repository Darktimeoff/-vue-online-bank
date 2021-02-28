<template>
  <AppPage back title="Помощь">
    <QuestionItem v-for="q in questions" :key="q.title" :question="q"/>
  </AppPage>
</template>
<script>
import AppPage from '@/components/ui/AppPage.vue'
import QuestionItem from '@/components/question/QuestionItem.vue'

export default {
	components: { 
    QuestionItem,
    AppPage,
  },
  setup() {
    const questions = [
      {title: 'Что есть в данной системе', text: 'Тут есть все, для того,  что б смотреть,  какие заявки'},
      {title: 'Как тут работает авторизация', text: 'Все реадизовано через Firebase'},
    ];

    return {
      questions, 
    }
  }
}
</script>
