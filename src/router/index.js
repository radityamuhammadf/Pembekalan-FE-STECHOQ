import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/list',
      name:'list',
      component: () => import('@/views/ListView.vue'),
      //protect route
      meta:{auth:true}
    },
    {
      path:'/profile',
      //nested routes
      children:[
        {
          path:'',
          name:'Login',
          component:()=>import('@/views/Profile/LoginView.vue')
        },
      ]
    },
    {
      path:'detail/:id?',
      name:'Authenticated',
      component:()=>import('@/views/Profile/AuthenticatedView.vue'),
      //protect route
      meta:{auth:true}
    },
    {
      //get all routes. i mean, what for?
      path:'/:pathMatch(.*)*',
      name: 'Match All',
      component:()=>import('@/views/NotFoundView.vue')
    },
  ]
})
//dont understand this
router.beforeEach((to,from,next)=>{
  //get auth state
  const loggedIn=useAuthStore().isLoggedIn
  //check if target route requires auth & no logged in user
  //redirect to login
  if(to.meta.auth && !loggedIn){
    next({name:'Login'})
  }
  else{
    //proceeds to the next view
    next()
  } 
})

export default router
