const tasks = [
  {
    id: 1,
    title: "Clean the house",
    body: "don't forget the bath tub",
    slug: "clean-the-house",
    category: "Housekeeping"
  },
  {
    id: 2,
    title: "Apply to jobs",
    body: "update resume first",
    slug: "apply-to-jobs",
    category: "Job Search"
  },
  {
    id: 3,
    title: "Run 10 miles",
    body: "in under 60 minutes",
    slug: "run-10-miles",
    category: "Fitness"
  }
];

const categories = [
  { id: 1, name: "Fitness", slug: "fitness" },
  { id: 2, name: "Job Search", slug: "job-search" },
  { id: 3, name: "Housekeeping", slug: "housekeeping" },
  { id: 4, name: "Work", slug: "work" },
  { id: 5, name: "Travel", slug: "travel" },
  { id: 6, name: "Other", slug: "other" }
];

const checklists = [
  {
    id: 1,
    title: "Monday Morning",
    slug: "monday-morning",
    tasks: [
      {
        id: 1,
        title: "Run 15 miles",
        body: "Don't stop for water",
        category: "Fitness",
        completed: true,
        timeOfCompletion: 1565604954897 // "2019-08-12T10:15:54.897Z"
      },
      {
        id: 2,
        title: "Respond to Emails",
        body: "also update calendar for the week",
        category: "Work",
        completed: false,
        timeOfCompletion: null
      },
      {
        id: 3,
        title: "Take Out the Garbage",
        body: "don't forget to put sticker on bin",
        category: "Housekeeping",
        completed: false,
        timeOfCompletion: null
      },
      {
        id: 4,
        title: "Re-organize File Cabinet",
        body: "place everything in alphabetical order",
        category: "Work",
        completed: false,
        timeOfCompletion: null
      }
    ]
  },
  {
    id: 2,
    title: "Travel Checklist",
    slug: "travel-checklist",
    tasks: [
      {
        id: 1,
        title: "Get New Passport",
        body: "it should take about 2 weeks to come in the mail",
        category: "Travel",
        completed: true,
        timeOfCompletion: 1562437418000 // "2019-07-06T18:23:38.000Z"
      },
      {
        id: 2,
        title: "Clean Out the Garage",
        body: "cleaning supplies are in the basement",
        category: "Housekeeping",
        completed: true,
        timeOfCompletion: 1565573664000 // "2019-08-12T01:34:24.000Z"
      },
      {
        id: 3,
        title: "Call an Uber to the Airport",
        body: "departing out of terminal 2",
        category: "Travel",
        completed: false,
        timeOfCompletion: null
      }
    ]
  }
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  tasks,
  categories,
  checklists
};
