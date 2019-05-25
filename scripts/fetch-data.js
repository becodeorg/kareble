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
                    name
                    login
                    contributionsCollection {
                      hasAnyContributions
                      startedAt
                      endedAt
                      contributionCalendar {
                        totalContributions
                        weeks {
                          firstDay
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

    if (false && hasNextPage) {
        const nextNodes = await fetchBatch(endCursor);
        nodes.push(...nextNodes);
    }

    return nodes;
};

(async () => {
    let members;

    try {
        members = await fetchBatch();
    } catch (error) {
        spinner.fail();
        console.log("💣", chalk.red("error:"), error.message);
    }

    console.log(members);
})();
