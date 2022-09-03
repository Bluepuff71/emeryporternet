import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//AWS Stuff
import { Amplify } from "aws-amplify";
import { PubSub } from "@aws-amplify/pubsub";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
PubSub.configure(awsExports);

import "bootswatch/dist/darkly/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
