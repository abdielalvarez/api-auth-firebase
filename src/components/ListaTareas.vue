<template>
  <div>
    {{tareas}}
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categorías</th>
                <th scope="col">Estado</th>
                <th scope="col">Número</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tarea in tareas" :key="tarea.id">
                <th scope="row">{{tarea.id}}</th>
                <td>{{tarea.nombre}}</td>
                <!-- Esto es un v-for dentro de un v-for en vue -->
                <!-- <td>
                    <span v-for="(categoria, index) in tarea.categorias" :key="index">
                        {{tarea.categorias.length === index + 1 ?
                            categoria : categoria + ', '
                        }} 
                    </span>
                </td> -->
                <td>{{tarea.categorias && tarea.categorias.length ? tarea.categorias.join(', ') : '' }}</td>
                <td>{{tarea.estado}}</td>
                <td>{{tarea.numero}}</td>
                <td>
                    <button @click="deleteTareas(tarea.id)" class="btn btn-danger btn-sm">
                        Eliminar
                    </button>
                    <router-link
                        class="btn btn-warning ml-2 btn-sm"
                        :to="{
                            name: 'Editar',
                            params: { id: tarea.id }
                        }"
                    >
                        Editar
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['deleteTareas'])
    }
}
</script>
