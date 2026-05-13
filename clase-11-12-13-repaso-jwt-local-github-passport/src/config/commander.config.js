import { Command } from 'commander';

const program = new Command();

program
  .option('-m, --mode <mode>', 'development o production', 'development')
  .parse();

export const options = program.opts();
