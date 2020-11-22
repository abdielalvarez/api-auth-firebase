<template>
    <div>
        <div>Editar {{$route.params.id}} - {{tarea}}</div>
        <!-- Al usar .prevent ya no necesitas e.preventDefault() -->
        <form @submit.prevent="updateTarea(tarea)">
            <Input :tarea="tarea" />
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Input from '../components/Input';
export default {
    components: {
        Input,
    },
    computed: {
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['setTarea', 'updateTarea']),
        
    },
    created() {
        this.setTarea(this.$route.params.id)
    }
}
</script>

<style>

</style>