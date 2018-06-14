let routes = [
    {
        path:'/',
        component:require('./pages/meteorPage')
    },
    {
        path:'/earth',
        component:require('./pages/earthPage')
    },
    {
        path:'/earth/project/admin',
        component:require('./pages/adminPage')
    }
];

export default new VueRouter({
    routes
});