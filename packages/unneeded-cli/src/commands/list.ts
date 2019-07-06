import { Command, flags } from '@oclif/command';
import { unneeded } from '@unneeded/unneeded';

export default class List extends Command {
  public static description = 'list all unneeded files';

  public static examples = [
    `$ unneeded list --entry /path/to/a.js --audit /path/to
/path/to/b.js
`,
  ];

  public static flags = {
    help: flags.help({ char: 'h' }),
    entry: flags.string({
      char: 'e',
      description: 'entry file',
      multiple: true,
      required: true,
    }),
    audit: flags.string({
      char: 'a',
      description: 'directory to audit',
      multiple: true,
      required: true,
    }),
    context: flags.string({
      char: 'c',
      description: 'context',
      default: process.cwd(),
    }),
  };

  public async run() {
    const { flags } = this.parse(List);

    const unneededFiles = await unneeded({
      context: flags.context,
      entry: flags.entry,
      audit: flags.audit,
    });

    unneededFiles.forEach(item => console.log(item));
  }
}
