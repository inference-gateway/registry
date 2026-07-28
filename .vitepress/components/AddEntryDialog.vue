<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{
  open: boolean;
  title: string;
  filename: string;
  instructions: string;
  snippet: string;
  snippetLang: "yaml" | "json";
  editUrl: string;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const isCopied = ref(false);
let copyTimer: number | undefined;

function sync(open: boolean) {
  const dlg = dialogRef.value;
  if (!dlg) return;
  if (open && !dlg.open) dlg.showModal();
  else if (!open && dlg.open) dlg.close();
}

onMounted(() => sync(props.open));
watch(() => props.open, sync);

function close() {
  emit("update:open", false);
}

function onNativeClose() {
  if (props.open) emit("update:open", false);
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === dialogRef.value) close();
}

async function copySnippet() {
  try {
    await navigator.clipboard.writeText(props.snippet);
    isCopied.value = true;
    if (copyTimer) window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => (isCopied.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
  }
}

function continueToGitHub() {
  window.open(props.editUrl, "_blank", "noopener,noreferrer");
  close();
}

onBeforeUnmount(() => {
  if (copyTimer) window.clearTimeout(copyTimer);
});
</script>

<template>
  <ClientOnly>
    <dialog
      ref="dialogRef"
      class="reg-dialog"
      :aria-labelledby="`reg-dialog-title-${filename}`"
      @close="onNativeClose"
      @click="onBackdropClick"
    >
      <div class="reg-dialog__content">
        <header class="reg-dialog__head">
          <h3 :id="`reg-dialog-title-${filename}`" class="reg-dialog__title">
            {{ title }}
          </h3>
          <button
            type="button"
            class="reg-dialog__close"
            aria-label="Close"
            @click="close"
          >
            ×
          </button>
        </header>

        <div class="reg-dialog__body">
          <p class="reg-dialog__instructions">{{ instructions }}</p>

          <div class="reg-dialog__snippet">
            <pre><code :class="`language-${snippetLang}`">{{ snippet }}</code></pre>
            <button
              type="button"
              class="reg-card__copy reg-dialog__snippet-copy"
              :class="{ 'is-copied': isCopied }"
              :title="isCopied ? 'Copied' : 'Copy snippet'"
              :aria-label="isCopied ? 'Copied' : 'Copy snippet'"
              @click="copySnippet"
            >
              <svg
                v-if="isCopied"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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

        <footer class="reg-dialog__actions">
          <button type="button" class="reg-dialog__cancel" @click="close">
            Cancel
          </button>
          <button
            type="button"
            class="reg-dialog__primary"
            @click="continueToGitHub"
          >
            Continue to GitHub
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </footer>
      </div>
    </dialog>
  </ClientOnly>
</template>
