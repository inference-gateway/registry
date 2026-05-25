<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import type { CatalogAgent } from "../lib/types";
import {
  deriveDisplayName,
  deriveDocs,
  deriveImage,
  deriveLanguage,
  deriveProvider,
  deriveRepository,
  deriveTags,
} from "../lib/adl";

const props = defineProps<{ agent: CatalogAgent }>();

const copiedCommand = ref(false);
const copiedImage = ref(false);
type Panel = "tools" | "skills" | null;
const openPanel = ref<Panel>(null);

const displayName = computed(() => deriveDisplayName(props.agent));
const tags = computed(() => deriveTags(props.agent));
const image = computed(() => deriveImage(props.agent));
const repository = computed(() => deriveRepository(props.agent));
const docs = computed(() => deriveDocs(props.agent));
const provider = computed(() => deriveProvider(props.agent));
const model = computed(() => props.agent.spec?.agent?.model || "");
const language = computed(() => deriveLanguage(props.agent));
const capabilities = computed(() => props.agent.spec?.capabilities);
const tools = computed(() => props.agent.spec?.tools ?? []);
const skills = computed(() => props.agent.spec?.skills ?? []);
const installCommand = computed(
  () => `infer agents add ${props.agent.metadata.name}`,
);

const badgeText = computed(
  () => provider.value || model.value || language.value || "",
);

const languageLogo = computed<"go" | "rust" | "typescript" | null>(() => {
  const t = badgeText.value.toLowerCase();
  return t === "go" || t === "rust" || t === "typescript" ? t : null;
});

function togglePanel(p: Exclude<Panel, null>) {
  openPanel.value = openPanel.value === p ? null : p;
}

async function copyToClipboard(text: string, flag: Ref<boolean>) {
  try {
    await navigator.clipboard.writeText(text);
    flag.value = true;
    setTimeout(() => (flag.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
  }
}

function copyCommand() {
  copyToClipboard(installCommand.value, copiedCommand);
}

function copyImage() {
  if (!image.value) return;
  copyToClipboard(
    `${image.value.repository}:${image.value.tag}`,
    copiedImage,
  );
}
</script>

<template>
  <article class="reg-card">
    <header class="reg-card__head">
      <div style="min-width: 0">
        <h3 class="reg-card__title">{{ displayName }}</h3>
        <div class="reg-card__sub">
          v{{ agent.metadata.version }} ·
          <span class="reg-card__sub-accent">{{ agent.metadata.name }}</span>
        </div>
      </div>
      <span
        v-if="languageLogo"
        class="reg-card__lang"
        :class="`reg-card__lang--${languageLogo}`"
        role="img"
        :aria-label="languageLogo"
      ></span>
      <span v-else-if="badgeText" class="reg-card__badge">{{ badgeText }}</span>
    </header>

    <p class="reg-card__desc">{{ agent.metadata.description }}</p>

    <div class="reg-card__pills">
      <span v-if="capabilities?.streaming" class="reg-pill reg-pill--accent"
        >Streaming</span
      >
      <span
        v-if="capabilities?.pushNotifications"
        class="reg-pill reg-pill--accent"
        >Push</span
      >
      <span
        v-if="capabilities?.stateTransitionHistory"
        class="reg-pill reg-pill--accent"
      >
        State History
      </span>
      <button
        v-if="tools.length > 0"
        type="button"
        class="reg-pill reg-pill--button"
        :class="{ 'is-open': openPanel === 'tools' }"
        :aria-expanded="openPanel === 'tools'"
        @click="togglePanel('tools')"
      >
        <span class="reg-pill__chev" aria-hidden="true">›</span>
        {{ tools.length }} {{ tools.length === 1 ? "tool" : "tools" }}
      </button>
      <button
        v-if="skills.length > 0"
        type="button"
        class="reg-pill reg-pill--button"
        :class="{ 'is-open': openPanel === 'skills' }"
        :aria-expanded="openPanel === 'skills'"
        @click="togglePanel('skills')"
      >
        <span class="reg-pill__chev" aria-hidden="true">›</span>
        {{ skills.length }} {{ skills.length === 1 ? "skill" : "skills" }}
      </button>
    </div>

    <div v-if="openPanel === 'tools'" class="reg-card__panel">
      <ul class="reg-card__panel-list">
        <li v-for="tool in tools" :key="tool.id" class="reg-card__panel-item">
          <div class="reg-card__panel-head">
            <span class="reg-card__panel-name">{{ tool.name || tool.id }}</span>
            <span
              v-if="tool.name && tool.name !== tool.id"
              class="reg-card__panel-id"
            >
              {{ tool.id }}
            </span>
          </div>
          <p v-if="tool.description" class="reg-card__panel-desc">
            {{ tool.description }}
          </p>
          <div v-if="tool.tags && tool.tags.length > 0" class="reg-card__pills">
            <span
              v-for="tag in tool.tags"
              :key="tag"
              class="reg-pill reg-pill--tag"
            >
              #{{ tag }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="openPanel === 'skills'" class="reg-card__panel">
      <ul class="reg-card__panel-list">
        <li
          v-for="skill in skills"
          :key="skill.id"
          class="reg-card__panel-item"
        >
          <div class="reg-card__panel-head">
            <span class="reg-card__panel-name">{{
              skill.name || skill.id
            }}</span>
            <span v-if="skill.license" class="reg-card__panel-license">
              {{ skill.license }}
            </span>
          </div>
          <p v-if="skill.description" class="reg-card__panel-desc">
            {{ skill.description }}
          </p>
          <div
            v-if="skill.tags && skill.tags.length > 0"
            class="reg-card__pills"
          >
            <span
              v-for="tag in skill.tags"
              :key="tag"
              class="reg-pill reg-pill--tag"
            >
              #{{ tag }}
            </span>
          </div>
          <a
            v-if="skill.source"
            class="reg-card__panel-link"
            :href="skill.source"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source ↗
          </a>
        </li>
      </ul>
    </div>

    <div v-if="tags.length > 0" class="reg-card__pills">
      <span
        v-for="tag in tags.slice(0, 8)"
        :key="tag"
        class="reg-pill reg-pill--tag"
      >
        #{{ tag }}
      </span>
      <span v-if="tags.length > 8" class="reg-pill reg-pill--tag">
        +{{ tags.length - 8 }} more
      </span>
    </div>

    <div class="reg-card__spacer" />

    <div v-if="model" class="reg-card__section">
      <span class="reg-card__label">Model</span>
      <span class="reg-card__model">{{ model }}</span>
    </div>

    <div class="reg-card__section">
      <span class="reg-card__label">Add to CLI</span>
      <div class="reg-card__code-row">
        <code>{{ installCommand }}</code>
        <button
          class="reg-card__copy"
          :class="{ 'is-copied': copiedCommand }"
          :title="copiedCommand ? 'Copied' : 'Copy CLI command'"
          @click="copyCommand"
        >
          <svg
            v-if="copiedCommand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="image" class="reg-card__section">
      <span class="reg-card__label">OCI Image</span>
      <div class="reg-card__code-row">
        <code>{{ image.repository }}:{{ image.tag }}</code>
        <button
          class="reg-card__copy"
          :class="{ 'is-copied': copiedImage }"
          :title="copiedImage ? 'Copied' : 'Copy OCI image URL'"
          @click="copyImage"
        >
          <svg
            v-if="copiedImage"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="repository || docs" class="reg-card__actions">
      <a
        v-if="repository"
        class="reg-card__action reg-card__action--ghost"
        :href="repository"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        Repository
      </a>
      <a
        v-if="docs"
        class="reg-card__action reg-card__action--primary"
        :href="docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Documentation
      </a>
    </div>
  </article>
</template>
