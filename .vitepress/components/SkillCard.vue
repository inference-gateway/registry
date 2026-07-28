<script setup lang="ts">
import { computed, ref } from "vue";
import type { Skill } from "../lib/types";

const props = defineProps<{ skill: Skill }>();

const copiedNpx = ref(false);
const copiedCommand = ref(false);
const copiedSource = ref(false);
const npxCommand = computed(() => `npx skills add ${props.skill.source}`);
const installCommand = computed(
  () => `infer skills install ${props.skill.name}`,
);

async function copy(text: string, flag: { value: boolean }) {
  try {
    await navigator.clipboard.writeText(text);
    flag.value = true;
    setTimeout(() => (flag.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
  }
}
</script>

<template>
  <article class="reg-card">
    <header class="reg-card__head">
      <div style="min-width: 0">
        <h3 class="reg-card__title">{{ skill.name }}</h3>
        <div class="reg-card__sub">
          <span class="reg-card__sub-accent">{{ skill.vendor }}</span>
        </div>
      </div>
      <div class="reg-card__head-end">
        <img
          v-if="skill.logo"
          :src="skill.logo"
          :alt="skill.language ?? ''"
          class="reg-card__lang-logo"
          :title="skill.language ?? ''"
        />
        <span class="reg-card__badge">{{ skill.license }}</span>
      </div>
    </header>

    <p class="reg-card__desc">{{ skill.description }}</p>

    <div v-if="skill.categories.length > 0" class="reg-card__pills">
      <span
        v-for="category in skill.categories"
        :key="category"
        class="reg-pill reg-pill--accent"
      >
        {{ category }}
      </span>
    </div>

    <div v-if="skill.tags.length > 0" class="reg-card__pills">
      <span v-for="tag in skill.tags" :key="tag" class="reg-pill reg-pill--tag">
        #{{ tag }}
      </span>
    </div>

    <div class="reg-card__spacer" />

    <div class="reg-card__section">
      <span class="reg-card__label">Install via npx</span>
      <div class="reg-card__code-row">
        <code>{{ npxCommand }}</code>
        <button
          class="reg-card__copy"
          :class="{ 'is-copied': copiedNpx }"
          :title="copiedNpx ? 'Copied' : 'Copy npx command'"
          @click="copy(npxCommand, copiedNpx)"
        >
          <svg
            v-if="copiedNpx"
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

    <div class="reg-card__section">
      <span class="reg-card__label">Install via CLI</span>
      <div class="reg-card__code-row">
        <code>{{ installCommand }}</code>
        <button
          class="reg-card__copy"
          :class="{ 'is-copied': copiedCommand }"
          :title="copiedCommand ? 'Copied' : 'Copy CLI command'"
          @click="copy(installCommand, copiedCommand)"
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

    <div class="reg-card__section">
      <span class="reg-card__label">Source</span>
      <div class="reg-card__code-row">
        <code>{{ skill.source }}</code>
        <button
          class="reg-card__copy"
          :class="{ 'is-copied': copiedSource }"
          :title="copiedSource ? 'Copied' : 'Copy source URL'"
          @click="copy(skill.source, copiedSource)"
        >
          <svg
            v-if="copiedSource"
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

    <div class="reg-card__actions">
      <a
        class="reg-card__action reg-card__action--ghost"
        :href="skill.source"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        View Source
      </a>
      <a
        v-if="skill.homepage"
        class="reg-card__action reg-card__action--primary"
        :href="skill.homepage"
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
        Homepage
      </a>
    </div>
  </article>
</template>
