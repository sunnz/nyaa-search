#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const { greet = null } = argv;
console.log(greet ?? 'usage: ./index.js --greet=something');
