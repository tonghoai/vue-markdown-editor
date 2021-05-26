import { exit } from '@/utils/constants/command';

export default {
  name: exit,
  icon: 'v-md-icon-exit',
  title: (editor) => {
    const exitLang = editor.langConfig.exit;

    return exitLang.toolbar;
  },
  active: () => false,
  action(editor) {
    editor.exit();
  },
};
