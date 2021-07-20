Simple command line application to search the data and return the results in
prettified json format.

It interactively prompts the user to choose entities and fields, and enter terms to search for.
A search can be done on all fields of an entity, and all its related entities will
be bundled in the result.

An internal lookup table provided by `makeObjectLookupMap()` function to ensure that the
search time does not increase linearly as the number of records in the data, and memoisation
technique is used to ensure the same lookup table doesn't need to be re-generated on
subsequent calls, so it can be used throughout the codebase without unnecessary performance
penalty - only the first call needs additional setup time.

## requirements

- node 15.x
- pnpm 6.x

## data

I have not committed json files into this repository, it may contain private data such as email
address, please copy the following json files into `./data`:

- organizations.json
- tickets.json
- users.json

alternatively you may copy the files from `./test-data` directory, which are sanitised
data used by unit tests.

## docker

    docker-compose run --rm nyaa-search

the docker container will run with all the required dependencies. the data directory
will be mounted to the container.

## install node modules

    pnpm install

this step is required for running the main script and unit tests unless you are running
it in the provided docker container.

## test

    pnpm test

## main script

    ./nyaa-search

press ctrl-d when you are done :)
