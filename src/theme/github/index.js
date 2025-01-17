import createGithubTheme from './theme';

// style
import '@/assets/css/theme/base';
import '@/assets/css/theme/github-markdown';

const install = function (VMdEditor, options = {}) {
  const { extend, config, codeHighlightExtensionMap } = options;
  const theme = createGithubTheme({
    baseConfig: config,
    codeHighlightExtensionMap,
  });

  if (extend) theme.extend(extend);
  VMdEditor.theme(theme);
};

if (typeof window !== 'undefined' && window.VMdEditor) {
  install(window.VMdEditor);
}

export default {
  install,
};
