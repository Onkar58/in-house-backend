const { accountSubmissionsQuery, allDataQuery, userProfileQuery, contestQuery } = require("./queries");
const { getLeetcodeProfileData, getRecentSubmissions, getContestData } = require("./leetcode")


async function getAllUserData(username) {
    const profileData = await getLeetcodeProfileData(username)
    const recentSubmission = await getRecentSubmissions(username)
    const contestData = await getContestData(username)
    return { "profileData": profileData, "recentSubmission": recentSubmission, "getContestData": contestData }
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
                console.log(data.data);
                const formattedData = formatHomepageData(data.data)
                return formattedData;
            })
        return userData
    }
    catch (err) {
        console.log("Erro", err);
        return err
    }

}

async function leaderboardData(username) {

}
module.exports = { getAllUserData, homepageData };