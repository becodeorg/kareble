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

const colors = ["highest", "high", "mid", "low", "lowest"];

if (!token) {
    console.log("💣", chalk.red("error:"), "No GitHub token given!");
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
                  totalCount
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
    let members;

    const contributions = {};

    try {
        members = await fetchBatch();

        spinner.start("Parsing data");

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
                                contributions[key] = {
                                    date,
                                    weekday,
                                    members: [],
                                };
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

        let weeks = [];

        let currentWeek = [],
            grandTotalContributions = 0;

        const contributionsCounts = new Set();

        values.forEach(day => {
            grandTotalContributions += day.totalContributions = day.members.reduce(
                (acc, [count]) => acc + count,
                0,
            );
            contributionsCounts.add(day.totalContributions);
            currentWeek.push(day);
            if (day.weekday === 6) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        spinner.succeed();

        spinner.start("Compute colors");

        const counts = Array.from(contributionsCounts);
        const min = Math.min(...counts);
        const max = Math.max(...counts);
        const delta = max - min;
        const tresholds = [
            max,
            Math.round(delta * 0.75),
            Math.round(delta * 0.5),
            Math.round(delta * 0.25),
            min,
        ];

        weeks = weeks.map(week =>
            week.map(day => {
                day.color =
                    colors[
                        /* eslint-disable-next-line arrow-body-style */
                        tresholds.reduce((cur, val, ind) => {
                            return val >= day.totalContributions ? ind : cur;
                        }, 0)
                    ];
                day.members = day.members.sort(([a], [b]) => +b - +a);
                return day;
            }),
        );

        spinner.succeed();

        spinner.start("Writing file");

        const targetFilePath = "./data/contributions.json";

        await writeFile(
            targetFilePath,
            JSON.stringify(
                {
                    buildDate: Date.now(),
                    totalMembers: members.length,
                    totalContributions: grandTotalContributions,
                    weeks,
                },
                null,
                2,
            ),
            "utf8",
        );

        spinner.succeed(
            `Contributions fetched and stored in ${chalk.cyan(targetFilePath)}`,
        );
    } catch (error) {
        spinner.fail();
        console.log("💣", chalk.red("error:"), error.message);
    }
})();
