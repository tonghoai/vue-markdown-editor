## 在 vue3 中使用报错？

请确认编辑器的版本是否安装正确。参考文档：[安装支持 vue3 的版本](./quick-start.md)

## 保存后的 markdown 或 html 文本如何渲染在页面上？

1. 渲染 markdown 文本

如果你的项目中引入了编辑器。你可以直接使用编辑器的预览模式来渲染。例如：

```vue
<template>
  <v-md-editor :value="markdown" mode="preview"></v-md-editor>
</template>

<script>
export default {
  data() {
    return {
      markdown: '### 标题',
    };
  },
};
</script>
```

如果你的项目不需要编辑功能，只需要渲染 markdown 你可以只引入 preview 组件来渲染。例如：

```js
// main.js
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VMdPreview.use(githubTheme);
Vue.use(VMdPreview);
```

```vue
<template>
  <v-md-preview :text="markdown"></v-md-preview>
</template>

<script>
export default {
  data() {
    return {
      markdown: '### 标题',
    };
  },
};
</script>
```

2. 渲染 html 文本

如果你的项目不需要编辑功能，只需要渲染 html 你可以只引入 preview-html 组件来渲染。例如：

```js
// main.js
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

// 引入使用主题的样式
import '@kangc/v-md-editor/lib/theme/style/vuepress';

Vue.use(VMdPreviewHtml);
```

```vue
<template>
  <!-- preview-class 为主题的样式类名，例如vuepress就是vuepress-markdown-body -->
  <v-md-preview-html :html="html" preview-class="vuepress-markdown-body"></v-md-preview-html>
</template>

<script>
export default {
  data() {
    return {
      html: '<div data-v-md-line="1"><h1 align="center">Markdown Editor built on Vue</h1>',
    };
  },
};
</script>
```

## 如何自定义导航来定位到对应标题所在的位置？

具体实现思路参考自定义锚点示例：[自定义锚点](/vue-markdown-editor/senior/anchor)

## 如何自定义渲染样式？

如果你不需要使用 github 或者 vuepress 主题。按照下面的方法使用，可以在保留编辑器基础功能的情况下不包含任何 html 样式。

如果你代码高亮选择使用 highlight.js：

```js
// main.js
import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import createHljsTheme from '@kangc/v-md-editor/lib/theme/hljs';
// 按需引入 highlightjs 的语言包，此处以 json 为例
import json from 'highlight.js/lib/languages/json';

const hljsTheme = createHljsTheme();
hljsTheme.extend((md, hljs) => {
  // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
  // md.set(option).use(plugin);

  // 注册语言包
  hljs.registerLanguage('json', json);
});
VueMarkdownEditor.theme(hljsTheme);

Vue.use(VueMarkdownEditor);
```

如果你代码高亮选择使用 prismjs：

```js
// main.js
import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import creatPrismTheme from '@kangc/v-md-editor/lib/theme/prism';
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json';

const prismTheme = creatPrismTheme();
prismTheme.extend((md) => {
  // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
  // md.set(option).use(plugin);
});
VueMarkdownEditor.theme(prismTheme);

Vue.use(VueMarkdownEditor);
```

## 如何调用函数将 markdown 转为 html？

```js
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';

// 调用方法将 markdown 转换成 html 并使用 xss 过滤
// Vue2
const html = xss.process(VueMarkdownEditor.themeConfig.markdownParser.render('### 标题'));
// Vue3
const html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render('### 标题'));
```

::: warning 注意
themeConfig.markdownParser.render 方法只有在使用主题之后才能调用
:::

## 在 vite 中使用报错，无法正常运行？

错误示例：

<img :src="$withBase('/images/vite-error.png')">

解决方法：在 `vite.config.js` 中添加代码

```js
export default {
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
};
```

## Vuepress 主题引用 php 语言包报错？

错误：Cannot read property 'tokenizePlaceholders' of undefined

解决方法：

```js
// 在引入 php 语言包之前需要先引入它的依赖包 prism-markup-templating
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
```

具体参考 prism 官方 [issue](https://github.com/PrismJS/prism/issues/1395)

## 在 vue3 + typescript 中使用报错？

错误示例：Could not find a declaration file for module '@kangc/v-md-editor/lib/theme/vuepress.js'.

解决方法：

```ts
// src/shims.d.ts
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
```
