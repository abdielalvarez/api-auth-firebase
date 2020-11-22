import { createStore } from 'vuex';
import router from '../router';

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0,
    },
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    },
  },
  actions: {
    cerrarSesion({commit}) {
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    },
    async ingresoUsuario({commit}, usuario) {
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfqlDxavlzD8T8dfatjIQFRU3e0NBmHyM`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const userDB = await res.json()
        if (userDB.error) {
          return console.log('userDB.error', userDB.error);
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
        console.log('userDB', userDB);
      } catch (error) {
        console.log('error', error);
      }
    },
    async registrarUsuario({commit}, usuario) {
      try {
        // Aquí no va ningún uid ni auth porque en teoría aún no existen por ser un registro y no un ingreso
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfqlDxavlzD8T8dfatjIQFRU3e0NBmHyM`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const userDB = await res.json()
        if (userDB.error) {
          return console.log('userDB.error', userDB.error);
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
        console.log('userDB', userDB);
      } catch (error) {
        console.log('error', error);
      }
    },
    async cargarLocalStorage({commit, state}) {
      const userJSON = localStorage.getItem('usuario')
      if (userJSON) {
        commit('setUser', JSON.parse(userJSON))
      } else {
        return commit('setUser', null)
      }
      try {
        // Esto solo funciona sin autorización
        // const res = await fetch(`https://udemy-vue-api.firebaseio.com/tareas.json`)
        // Esto solo funciona con autorización
        // const res = await fetch(`https://udemy-vue-api.firebaseio.com/tareas.json?auth=${state.user.idToken}`)
        // Esto solo funciona con autorización y login hecho
        const res = await fetch(`https://udemy-vue-api.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        const arrayTareas = []
        for (let id in dataDB) {
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)
      } catch (error) {
        console.log('error', error);
      }
    },
    async setTareas({commit, state}, tarea) {
      try {
        // No debes crear ninguna colección en data-realtime, solo hacer el post/put que necesites
        // No olvides el .json al final de la ruta de firebase
        const res = await fetch(`https://udemy-vue-api.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          body: JSON.stringify(tarea),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const dataDB = await res.json()
        console.log('dataDB', dataDB);
        commit('set', tarea)
      } catch (error) {
        console.log('error', error);
      }
    },
    async deleteTareas({commit, state}, id) {
      try {
        const res = await fetch(`https://udemy-vue-api.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
        })
        commit('eliminar', id)
      } catch (error) {
        console.log('error', error);
      }
    },
    setTarea({commit}, id) {
      commit('tarea', id)
    },
    async updateTarea({commit, state}, tarea) {
      try {
        const res = await fetch(`https://udemy-vue-api.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const dataDB = await res.json()
        console.log('dataDB', dataDB);
        commit('update', tarea)
      } catch (error) {}
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user
    },
  },
  modules: {}
})
