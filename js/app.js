const App = {
    data() {
        return {
            showHome: true,
            showCreateForm: false,
            showStudentsList: false,
        };
    },
};

Vue.createApp(App).mount("#app");
