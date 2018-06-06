import Vue from 'vue';
import vuex from 'vuex';

import auth from './auth.js';
import manger from './manger.js';

Vue.use(vuex);

const store = new vuex.Store({
    modules: {
        auth,
        manger
    }
});

export default store;