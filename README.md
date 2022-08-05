# Software Analytics Canvas

This project has React JS App as ui client and Java Spring Boot App as the backend server.

## What is this project?

This [paper](http://ksiresearch.org/seke/seke19paper/seke19paper_146.pdf) is the motivation of this project.

Also this [video](https://youtu.be/Atlr2td0URw) has come from the bachelor Thesis of Filippi Davide who implemented the initial phase of this project.

For more undrestanding the purpose of the project this [talk](https://www.sfscon.it/talks/a-lean-software-analytics-canvas-for-agile-small-teams/) by prof.Eduardo Guerra is suggested which is about A Lean Software Analytics Canvas for Agile Small Teams and took place at SNSCON 2021.

## Local Development

To develop locally there are a few steps that need to be taken, for both ui-client and backend-server.

### backend-server

So this project uses MongoDB as database,
MongoDB can be installed from [here](https://www.mongodb.com/docs/manual/administration/install-community/),

Too complicated to install? This [video](https://www.youtube.com/watch?v=FwMwO8pXfq0) might be helpful.

For running backend-server locally, Java version `11` is needed.
After running the mongodb, it is now time to run the backend-server with this command: `mvn spring-boot:run`

### ui-client

If you don't have `node` installed on your machine,
You can get the latest version [here](nodejs.org)

`npm install` would be installing the dependecies needed.

After that you're good to go in the front end side,
Just need to run `npm start` and open the project on [localhost:3000](localhost:3000)
