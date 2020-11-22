<template>
  <div>
    <input
        type="text"
        class="form-control my-2"
        placeholder="Ingrese nombre"
        v-model.trim="tarea.nombre"
    >
    
    <div class="form-check form-check-inline">
    <input
        class="form-check-input"
        type="checkbox"
        id="check1"
        value="javascript"
        v-model="tarea.categorias"
    >
    <label class="form-check-label" for="check1">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
    <input
        class="form-check-input"
        type="checkbox"
        id="check2"
        value="nodejs"
        v-model="tarea.categorias"
    >
    <label class="form-check-label" for="check2">Node.js</label>
    </div>

    <div class="mt-2">
    <div class="form-check form-check-inline">
        <input
            class="form-check-input"
            type="radio"
            id="radio1"
            value="urgente"
            v-model="tarea.estado"
        >
        <label class="form-check-label" for="radio1">Urgente</label>
    </div>
    <div class="form-check form-check-inline">
        <input
            class="form-check-input"
            type="radio"
            id="radio2"
            value="relax"
            v-model="tarea.estado"
        >
        <label class="form-check-label" for="radio2">Relax</label>
    </div>
    </div>

    <input
        type="number"
        class="form-control my-2"
        placeholder="Ingrese número"
        v-model.number="tarea.numero"
    >
    <hr>
    <button :disabled="isDisabled" class="btn btn-dark mt-2 btn-block" type="submit">
        Procesar
    </button>
  </div>
</template>

<script>
export default {
    props: {
        tarea: Object,
    },
    computed: {
        isDisabled() {
            return this.tarea.nombre.trim() === "" ? true : false
        }
    },
}
</script>