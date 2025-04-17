# Bright Network Hiring Challenge

## Requirements

- NodeJS v18 or higher
- Yarn v1

## How to run

Install deps by running `yarn`

To see matching output in the console, run `yarn start`
To run tests, run `yarn test`

## Challenges Encountered

**Recommendation Algorithm**
This is using a naive matching mechanism based on string similarity between each of the job titles and locations. There is no functionality to guage the context of any location/job title in the user's bio, and therefore this mechanism won't discern between a bio such as "I don't want a job in London" and "I'd love a job in London".

To resolve this issue, the easiest thing would be to refactor the members API to return member criteria as discrete fields, eg `desiredLocation` instead of a single free-text `bio` field.

Alternatively, I'd have to leverage some NLP lib and try get a more sophisticated contextual understanding of the `bio`.

With this current mechanism, there is no threshold set on the string similarity score, this was intentional as I think it's better to have some unexpected results rather than no results at all.

There would be a big issue of efficiency with this kind of approach in a real-world setting too. We're getting all members and all jobs, loading them into memory, then looping over them all with a nested loop (for each member we search all jobs).

If we were running this solution at scale we'd quickly run into memory issues.

In a real-world setting this process could be ran as an ETL job on a regular interval, using something like AWS Glue.

Alternatively, we could consider an event-based approach where we look for jobs when a member is created or vice versa, but I'd imagine this would lead to a lot of unnecessary computation

## Choices Made

**Set up TS project using GTS** [Google Typescript Style](https://github.com/google/gts) is a quick and eaasy TS style guide and formatting config.

**fuse.js for string matching** [Fuse.js](https://www.fusejs.io/) I've used this lib in the past for fuzzy string matching, seems robust and has a simple API.

**Zod for API validation** [Zod](https://zod.dev/) Popular validation lib to make sure the API is returning what we expect.

**Jest for tests** [Jest](https://jestjs.io/) Popular testing framework

**testing the handler** I decided to test only the handler function, rather than the individual functions that comprise the handler. This is to align with a black-box style of testing where we just test inputs/outputs at a high level, meaning that we don't generally have to refactor tests if making changes to functions within the system under test.

## Other Notes

I should've done regular commits really, then you'd be able to see the evolution of this submission
