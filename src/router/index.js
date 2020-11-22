import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {rutaProtegida: true}
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "ingreso" */ '../views/Ingreso.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// OBSERVABLE USANDO VUE-ROUTER Y GETTERS DEL STORE PARA CAPTURAR EL STATUS DE USER (true o false)
// el param "to" es para poder acceder a los datos la ruta en donde me encuentro
// el param "from" es para poder acceder a los datos la ruta de donde vine anteriormente
// el param "next" es para permitir el acceso a component
// si next() entonces viaja al component que le corresponde
// pero si next('/algunaOtraRuta) viaja a esa ruta
router.beforeEach((to, from, next) => {
  if (to.meta.rutaProtegida) {
    if (store.getters.usuarioAutenticado) {
      next()
    } else {
      next('/ingreso')
    }
  } else {
    next()
  }
})

export default router
