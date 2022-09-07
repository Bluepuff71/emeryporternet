<template>
  <input
    ref="input"
    v-on:change="onUploadFile"
    type="file"
    class="form-control-file"
  />
</template>

<script setup lang="ts">
import awsExports from "../aws-exports";
import { v4 as uuidv4 } from "uuid";
import { ensure } from "@/utils/ensure";
import { ref } from "vue";
import type { FileInputData } from "@/utils/file-input";

let fileData: FileInputData | undefined = undefined;
const inputElement = ref<HTMLInputElement | null>(null);
const emit = defineEmits(["fileReady"]);

defineExpose({
  getFileData,
  clearInput,
});

function getFileData() {
  return fileData;
}

function clearInput(): void {
  inputElement.value = null;
}

async function onUploadFile(payload: Event) {
  const target = ensure(payload.target) as HTMLInputElement;

  const file = ensure(target.files)[0];
  const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket,
  } = awsExports;

  const key = `${uuidv4()}-${file.name}`;

  fileData = {
    s3InputData: {
      bucket: bucket,
      key: key,
      region: region,
    },
    file: file,
  };

  emit("fileReady", fileData);
}
</script>
