const { userProfileQuery, recentSubmissionsQuery, contestQuery, skillStatQuery } = require("./queries");

async function getLeetcodeProfileData(username) {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com'
    },
    body: JSON.stringify({
      query: userProfileQuery,
      variables: {
        username: username,
      },
    })
  })
    .then(result => result.json())
    .then(data => {
      if (data.errors) {
        return new Error(data.errors[0].message);
      }
      return data.data;
    })
    .catch(err => {
      return err;
    });
  return response;
}

async function getRecentSubmissions(username) {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com'
    },
    body: JSON.stringify({
      query: recentSubmissionsQuery,
      variables: {
        username: username,
        limit: 5,
      },
    })
  })
    .then(result => result.json())
    .then(data => {
      if (data.errors) {
        new Error(data.errors[0].message);
      }
      return data.data;
    })
    .catch(err => {
      return err;
    });
  return response;
}

async function getContestData(username) {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com'
    },
    body: JSON.stringify({
      query: contestQuery,
      variables: {
        username: username,
      },
    })
  })
    .then(result => result.json())
    .then(data => {
      if (data.errors) {
        new Error(data.errors[0].message);
      }
      return data.data;
    })
    .catch(err => {
      return err;
    });
  return response;
}

async function getSkillStats(username) {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com'
    },
    body: JSON.stringify({
      query: skillStatQuery,
      variables: {
        username: username,
      },
      operationName: "skillStats"
    })
  })
    .then(result => result.json())
    .then(data => {
      if (data.errors) {
        new Error(data.errors[0].message);
      }
      return data.data;
    })
    .catch(err => {
      return err;
    });
  return response;
}

module.exports = {
  getLeetcodeProfileData,
  getRecentSubmissions,
  getContestData,
  getSkillStats
};