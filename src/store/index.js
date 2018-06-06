import Vue from 'vue';
import vuex from 'vuex';

import auth from './auth.js';

Vue.use(vuex);

const store = new vuex.Store({
    modules: {
        auth
    }
});

export default store;