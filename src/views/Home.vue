<template>
  <div>
    <form @submit="procesaFormulario">
      <Input :tarea="tarea"/>
    </form>
    <hr>
    <ListaTareas />
  </div>
</template>

<script>
import Input from '../components/Input';
import ListaTareas from '../components/ListaTareas';
import { mapActions } from 'vuex';
const shortid = require('shortid');
export default {
  name: 'Home',
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
  components: {
    Input,
    ListaTareas,
  },
  methods: {
    ...mapActions(['setTareas', 'cargarLocalStorage']),
    procesaFormulario(e) {
      e.preventDefault()
      // Validar campo vacío
      if (this.tarea.nombre.trim() === "") {
        console.log('Campo Nombre vacío');
        return
      }
      // Generar id
      this.tarea.id = shortid.generate()
      console.log('this.tarea.id', this.tarea.id);
      // Envían los datos al store
      this.setTareas(this.tarea)
      // Limpiar el form
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
  created() {
    this.cargarLocalStorage()
  }
}
</script>
