# BeCode: [kareble](http://kareble.becode.xyz)

> ⚙️ An overview of all BeCodian's Contributions on GitHub

* * *

## About

Just a _pet_ project to play with [GitHub's **GraphQL** API](https://developer.github.com/v4/explorer/) and [**SvelteJS**](http://svelte.dev/): displaying the same "Green squares' overview of contributions", but for all members of BeCode teams.

## Installation & usage

Run `npm install` to install the dependencies of the project.

The codebase is divided in two parts :

- a script to fetch the users' data from the GitHub API and parse them into a structured JSON file
- the Svelte SPA, used to render the JSON file onto front-end components, built with [Rollup](http://rollupjs.org)

### Fetching the data

To fetch and parse the data, use the following command :

	npm run fetch:data YOUR_PERSONNAL_ACCESS_TOKEN

> ☝️ **NOTE:** you'll need to [generate](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) a GitHub **Personnal access token** with the following scopes: `admin:org, repo, user`

⚠️ The script can take up to two minutes to run. Be patient.

### Build / run the app

All the code for the app is inside the `src` folder.

To build the app (for production purposes), simply run `npm run build`.  
The compiled result is inside the `public` folder.

You can also use the `npm run work` command to run a local preview server ([localhost:5000](http://localhost:5000)) and a rollup process to watch your changes in the sources to rebuild.

### Deploy

The app is hosted on GitHub Pages. Simply run `npm run deploy` (after a build) to deploy the app.

> **NOTE:** a _GitHub Workflow_ is configured to fetch data, build & deploy the code _every sunday_.

* * *

## TODO

When **GitHub Actions** will be out of *beta*, configure them to fetch and build the site once a week.

* * *

May 2019, leny.
