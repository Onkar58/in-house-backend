const contestQuery = `
query getUserContestRanking ($username: String!) {
  userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
          name
      }
  }
  userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      contest {
          title
          startTime
      }
  }
}
`

const skillStatQuery = `
query skillStats($username: String!) {
    matchedUser(username: $username) {
        tagProblemCounts {
            advanced {
                tagName
                tagSlug
                problemsSolved
            } 
            intermediate {
                tagName
                tagSlug
                problemsSolved
            }
            fundamental {
                tagName
                tagSlug
                problemsSolved
            }
        }
    }
}
`

const accountSubmissionsQuery = `
query getACSubmissions ($username: String!, $limit: Int) {
  recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
  }
}
`
const recentSubmissionsQuery = `
query getRecentSubmissions($username: String!, $limit: Int) {
  recentSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
  }
}
`

const userProfileQuery = `
query getUserProfile($username: String!) {
  allQuestionsCount {
      difficulty
      count
  }
  matchedUser(username: $username) {
      username
      githubUrl
      twitterUrl
      linkedinUrl
      contributions {
          points
          questionCount
          testcaseCount
      }
      profile {
          realName
          userAvatar
          birthday
          ranking
          reputation
          websites
          countryName
          company
          school
          skillTags
          aboutMe
          starRating
      }
      badges {
          id
          displayName
          icon
          creationDate
      }
      upcomingBadges {
          name
          icon
      }
      activeBadge {
          id
          displayName
          icon
          creationDate
      }
      submitStats {
          totalSubmissionNum {
              difficulty
              count
              submissions
          }
          acSubmissionNum {
              difficulty
              count
              submissions
          }
      }
      submissionCalendar
  }
  recentSubmissionList(username: $username, limit: 20) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
  }
}
`

const allDataQuery = `
#graphql
query getRecentSubmissions($username: String!, $limit: Int) {
    recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
  }
query getACSubmissions ($username: String!, $limit: Int) {
    recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
  }
`

module.exports = {
    contestQuery,
    accountSubmissionsQuery,
    userProfileQuery,
    recentSubmissionsQuery,
    allDataQuery,
    skillStatQuery
}
