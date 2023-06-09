/**
 * Due to using yarn berry (yarn version > 2.x), node_modules/.bin aren't available
 * npm could have been used for this particular script but to keep it consistent & stick to one package manager,
 * this script is created. now both 'yarn api:build' or 'npm run api:build' command can be run, but recommended to use yarn.
 *
 * Dependencies: aspida
 * Enhancements: check if the package is installed & then run the script
 */

function main() {
  require('aspida/dist/cli').run(process.argv.slice(2))
  // eslint-disable-next-line no-console
  console.log(
    '\x1B[32m',
    '>> aspida:',
    '\x1B[33mapi build process completed, file has been generated.\x1B[0m'
  )
}

main()
