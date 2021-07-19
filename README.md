## requirements

- node 15.x
- pnpm 6.x

## data

I have not committed json files into this repository, it may contain private data such as email
address, please copy the following json files into `./data`:

- organizations.json
- tickets.json
- users.json

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
