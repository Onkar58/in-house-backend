const { accountSubmissionsQuery, allDataQuery, userProfileQuery, contestQuery } = require("./queries");
const { getLeetcodeProfileData, getRecentSubmissions, getContestData, getSkillStats } = require("./leetcode")


async function getAllUserData(username) {
    const profileData = await getLeetcodeProfileData(username)
    const recentSubmission = await getRecentSubmissions(username)
    const contestData = await getContestData(username)
    if (profileData instanceof Error)
        return new Error("User not Found")
    else
        return { "profileData": profileData, "recentSubmission": recentSubmission, "getContestData": contestData }
}

async function getSkillsData(username) {
    const skillStats = await getSkillStats(username)
    const recentSubmissions = await getRecentSubmissions(username)
    if (skillStats instanceof Error)
        return new Error("User not Found")
    const dataFormatted = formatSkillsData(skillStats, username)
    return {"skillsData": dataFormatted, "recentSubmissions": recentSubmissions}
}


async function formatHomepageData(data) {
    const formattedData = {
        "username": data.matchedUser.username,
        "realName": data.matchedUser.profile.realName,
        "userAvatar": data.matchedUser.profile.userAvatar,
        "ranking": data.matchedUser.profile.ranking,
        "starRating": data.matchedUser.profile.starRating
    }
    return formattedData
}

function formatSkillsData(data,username) {
    const formattedData = {
        "username": username,
        "advanced": data?.matchedUser.tagProblemCounts.advanced,
        "intermediate": data?.matchedUser.tagProblemCounts.intermediate,
        "fundamental": data?.matchedUser.tagProblemCounts.fundamental,
    }
    return formattedData
}

async function homepageData(username) {
    const query = `
        #graphql
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    realName
                    userAvatar
                    ranking
                    starRating
                }
            }
        }
    `
    try {

        const userData = await fetch("https://leetcode.com/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    username: username
                }
            })
        })
            .then(async result => result.json())
            .then(data => {
                if (data.errors) {
                    return new Error(data.errors[0].message)
                }
                const formattedData = formatHomepageData(data.data)
                return formattedData;
            })
        return userData
    }
    catch (err) {
        return err
    }

}

module.exports = { getAllUserData, homepageData, getSkillsData };