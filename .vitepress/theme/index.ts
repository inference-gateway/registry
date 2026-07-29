import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import AgentsBrowser from "../components/AgentsBrowser.vue";
import SkillsBrowser from "../components/SkillsBrowser.vue";
import "./custom.css";

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("AgentsBrowser", AgentsBrowser);
    app.component("SkillsBrowser", SkillsBrowser);
  },
};

export default theme;
