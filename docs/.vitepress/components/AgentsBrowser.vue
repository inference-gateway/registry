<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { CatalogAgent } from "../lib/types";
import { loadAgents } from "../lib/agentService";
import { deriveTags } from "../lib/adl";
import AgentCard from "./AgentCard.vue";
import AddEntryDialog from "./AddEntryDialog.vue";

const agents = ref<CatalogAgent[]>([]);
const loading = ref(true);
const loadError = ref<string | null>(null);
const searchTerm = ref("");
const selectedTag = ref("");
const showAddDialog = ref(false);

const agentSnippet = `  - url: https://github.com/<owner>/<repo>
    ref: main
`;

async function fetchAgents() {
  loading.value = true;
  loadError.value = null;
  try {
    agents.value = await loadAgents();
  } catch (err) {
    console.error("Failed to load agents:", err);
    loadError.value = err instanceof Error ? err.message : String(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchAgents);

const tagsByAgent = computed(() => {
  const map = new Map<string, string[]>();
  for (const agent of agents.value) {
    map.set(agent.metadata.name, deriveTags(agent));
  }
  return map;
});

const allTags = computed(() => {
  const tags = new Set<string>();
  for (const list of tagsByAgent.value.values()) {
    for (const tag of list) tags.add(tag);
  }
  return Array.from(tags).sort();
});

const filteredAgents = computed(() => {
  const q = searchTerm.value.toLowerCase();
  return agents.value.filter((agent) => {
    const tags = tagsByAgent.value.get(agent.metadata.name) ?? [];
    const matchesSearch =
      searchTerm.value === "" ||
      agent.metadata.name.toLowerCase().includes(q) ||
      agent.metadata.description.toLowerCase().includes(q) ||
      tags.some((tag) => tag.toLowerCase().includes(q));
    const matchesTag =
      selectedTag.value === "" || tags.includes(selectedTag.value);
    return matchesSearch && matchesTag;
  });
});

function clearFilters() {
  searchTerm.value = "";
  selectedTag.value = "";
}
</script>

<template>
  <ClientOnly>
    <section>
      <div class="reg-browser__controls">
        <div class="reg-browser__search">
          <svg
            class="reg-browser__search-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search agents by name, description, or tag…"
            aria-label="Search agents"
          />
        </div>
        <select
          v-model="selectedTag"
          class="reg-browser__filter"
          aria-label="Filter by tag"
        >
          <option value="">All tags</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">
            #{{ tag }}
          </option>
        </select>
        <button
          type="button"
          class="reg-browser__add"
          @click="showAddDialog = true"
        >
          <span class="reg-browser__add-icon" aria-hidden="true">+</span>
          Add agent
        </button>
      </div>

      <div class="reg-browser__meta">
        <span>
          {{ filteredAgents.length }}
          {{ filteredAgents.length === 1 ? "agent" : "agents" }} found
        </span>
        <button
          v-if="searchTerm || selectedTag"
          class="reg-browser__clear"
          type="button"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <div v-if="loading" class="reg-browser__loading">Loading agents…</div>

      <div v-else-if="loadError" class="reg-browser__error">
        <h3>Couldn't load the agents catalog</h3>
        <code>{{ loadError }}</code>
        <button class="reg-browser__retry" type="button" @click="fetchAgents">
          Retry
        </button>
      </div>

      <div v-else-if="filteredAgents.length === 0" class="reg-browser__empty">
        No agents found matching your criteria.
      </div>

      <div v-else class="reg-browser__grid">
        <AgentCard
          v-for="agent in filteredAgents"
          :key="agent.metadata.name"
          :agent="agent"
        />
      </div>

      <div class="reg-browser__footer">
        The full catalog is also served as JSON at
        <a
          href="https://cdn.jsdelivr.net/gh/inference-gateway/agents@latest/catalog.json"
          target="_blank"
          rel="noopener noreferrer"
          ><code>catalog.json</code></a
        >. To list a new agent, open a PR against
        <a
          href="https://github.com/inference-gateway/agents"
          target="_blank"
          rel="noopener noreferrer"
          >inference-gateway/agents</a
        >
        with the repo URL of any public agent that ships an
        <code>agent.yaml</code> at its root.
      </div>

      <AddEntryDialog
        v-model:open="showAddDialog"
        title="List a new agent"
        filename="agents.yaml"
        instructions="Append this entry to the end of agents.yaml in inference-gateway/agents, then replace <owner>/<repo> with your agent's repo path. The repo must ship an agent.yaml at its root. GitHub will fork the repo and open a pull request for you."
        :snippet="agentSnippet"
        snippet-lang="yaml"
        edit-url="https://github.com/inference-gateway/agents/edit/main/agents.yaml"
      />
    </section>
  </ClientOnly>
</template>
