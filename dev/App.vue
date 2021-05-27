<template>
  <div>
    <v-md-editor
      v-model="text"
      height="500px"
      autofocus
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      @fullscreen-change="handleFullscreenChange"
      @save="handleSave"
      @copy-code-success="handleCopyCodeSuccess"
      @exit="handleSave"
      mode="edit"
      :default-fullscreen="true"
      right-toolbar="preview exit"
      ref="editor"
    />
  </div>
</template>

<script>
import text from './text';

export default {
  data() {
    return {
      text,
    };
  },
  methods: {
    handleFullscreenChange(v) {
      console.log(v);
    },
    handleUploadImage(e, insertImage, files) {
      console.log(files);

      insertImage({
        url: '111',
        desc: '111',
      });
    },
    handleSave(v, html) {
      console.log(v, html);
    },
    handleCopyCodeSuccess(code) {
      console.log(code);
    },
    listenClick(v) {
      console.log("listenClick", v);
    }
  },
};
</script>
