import { ref } from "vue";

export function useModal() {
    const showModal = ref(false);
    
    const closeModal = () => showModal.value = false;

    const openModal = () => showModal.value = true;
    
    const toggleModal = () =>  showModal.value = !showModal.value;

    return {showModal, closeModal, openModal, toggleModal};
}