import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

//AWS Stuff
import { Amplify } from '@aws-amplify/core';
import awsExports from './aws/aws-exports';
Amplify.configure(awsExports);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
