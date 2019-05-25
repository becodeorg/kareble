/* becodeorg/kareble
 *
 * /scripts/fetch-data.js - setup script - fetch data from github API
 *
 * coded by leny@BeCode
 * started at 25/05/2019
 */

/* eslint-disable no-console */

const {GraphQLClient} = require("graphql-request");
const ora = require("ora");
const chalk = require("chalk");
const {promisify} = require("util");
const fs = require("fs");
const writeFile = promisify(fs.writeFile);

const spinner = ora();

const [, , token] = process.argv;

if (!token) {
    console.log("💣", chalk.red("error:"), error.message);
    process.exit(1);
}

const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {Authorization: `Bearer ${token}`},
});

let batchCount = 0;

const fetchBatch = async (cursor = null) => {
    spinner.start(`Fetch batch n°${++batchCount}`);

    const {
        organization: {
            membersWithRole: {
                pageInfo: {hasNextPage, endCursor},
                nodes,
            },
        },
    } = await client.request(
        `
        query fetch($cursor:String) {
            organization(login: "becodeorg") {
                membersWithRole(first: 25, after: $cursor) {
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  nodes {
                    login
                    contributionsCollection {
                      hasAnyContributions
                      contributionCalendar {
                        weeks {
                          contributionDays {
                            weekday
                            contributionCount
                            date
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
        `,
        {cursor},
    );

    spinner.succeed();

    if (hasNextPage) {
        const nextNodes = await fetchBatch(endCursor);
        nodes.push(...nextNodes);
    }

    return nodes;
};

(async () => {
    let members,
        contributions = {};

    try {
        members = await fetchBatch();
    } catch (error) {
        spinner.fail();
        console.log("💣", chalk.red("error:"), error.message);
    }

    members.forEach(
        ({
            login,
            contributionsCollection: {
                hasAnyContributions,
                contributionCalendar: {weeks},
            },
        }) => {
            if (!hasAnyContributions) {
                return;
            }

            weeks.forEach(({contributionDays}) => {
                contributionDays.forEach(
                    ({date, weekday, contributionCount}) => {
                        if (!contributionCount) {
                            return;
                        }

                        const [key] = date.split("T");

                        if (!contributions[key]) {
                            contributions[key] = {date, weekday, members: []};
                        }

                        contributions[key].members.push([
                            contributionCount,
                            login,
                        ]);
                    },
                );
            });
        },
    );

    const values = Object.values(contributions);

    values.sort((a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    });

    await writeFile(
        "./data/contributions.json",
        JSON.stringify(values, null, 2),
        "utf8",
    );
})();
