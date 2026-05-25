<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Skill } from "../lib/types";
import { loadSkills } from "../lib/skillService";
import SkillCard from "./SkillCard.vue";

const skills = ref<Skill[]>([]);
const loading = ref(true);
const loadError = ref<string | null>(null);
const searchTerm = ref("");
const selectedVendor = ref("");

async function fetchSkills() {
  loading.value = true;
  loadError.value = null;
  try {
    skills.value = await loadSkills();
  } catch (err) {
    console.error("Failed to load skills:", err);
    loadError.value = err instanceof Error ? err.message : String(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchSkills);

const allVendors = computed(() => {
  const vendors = new Set<string>();
  skills.value.forEach((skill) => vendors.add(skill.vendor));
  return Array.from(vendors).sort();
});

const filteredSkills = computed(() => {
  const q = searchTerm.value.toLowerCase();
  return skills.value.filter((skill) => {
    const matchesSearch =
      searchTerm.value === "" ||
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q) ||
      skill.vendor.toLowerCase().includes(q) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      skill.categories.some((cat) => cat.toLowerCase().includes(q));
    const matchesVendor =
      selectedVendor.value === "" || skill.vendor === selectedVendor.value;
    return matchesSearch && matchesVendor;
  });
});

function clearFilters() {
  searchTerm.value = "";
  selectedVendor.value = "";
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
            placeholder="Search skills by name, description, vendor, or tag…"
            aria-label="Search skills"
          />
        </div>
        <select
          v-model="selectedVendor"
          class="reg-browser__filter"
          aria-label="Filter by vendor"
        >
          <option value="">All vendors</option>
          <option v-for="vendor in allVendors" :key="vendor" :value="vendor">
            {{ vendor }}
          </option>
        </select>
      </div>

      <div class="reg-browser__meta">
        <span>
          {{ filteredSkills.length }}
          {{ filteredSkills.length === 1 ? "skill" : "skills" }} found
        </span>
        <button
          v-if="searchTerm || selectedVendor"
          class="reg-browser__clear"
          type="button"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <div v-if="loading" class="reg-browser__loading">Loading skills…</div>

      <div v-else-if="loadError" class="reg-browser__error">
        <h3>Couldn't load the skills catalog</h3>
        <code>{{ loadError }}</code>
        <button class="reg-browser__retry" type="button" @click="fetchSkills">
          Retry
        </button>
      </div>

      <div v-else-if="filteredSkills.length === 0" class="reg-browser__empty">
        No skills found matching your criteria.
      </div>

      <div v-else class="reg-browser__grid">
        <SkillCard
          v-for="skill in filteredSkills"
          :key="`${skill.vendor}/${skill.name}`"
          :skill="skill"
        />
      </div>

      <div class="reg-browser__footer">
        The full catalog is also served as JSON at
        <a
          href="https://cdn.jsdelivr.net/gh/inference-gateway/skills@main/catalog.json"
          target="_blank"
          rel="noopener noreferrer"
          ><code>catalog.json</code></a
        >. To submit a skill, open a PR against
        <a
          href="https://github.com/inference-gateway/skills"
          target="_blank"
          rel="noopener noreferrer"
          >inference-gateway/skills</a
        >.
      </div>
    </section>
  </ClientOnly>
</template>
