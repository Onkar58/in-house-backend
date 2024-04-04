const { getAllUserData, getSkillsData } = require("../libs/getData");
const { getSkillStats } = require("../libs/leetcode");

exports.getStudentData = async (req, res) => {
    try {
        const username = req.params["0"].split("/")[1]
        const studentsData = await getAllUserData(username)
        const formattedData = formatData(studentsData)
        if (studentsData instanceof Error)
            return res.status(200).json({ success: false, message: "Student Not Found" })

        return res.status(200).json({ success: true, message: formattedData })
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Error in getting user data" });
    }
}

exports.getUserSkillStats = async (req, res) => {
    try {
        const {username} = req.body
        const studentsData = await getSkillsData(username)
        if (studentsData instanceof Error)
            return res.status(200).json({ success: false, message: "Student Not Found" })
    
        return res.status(200).json({ success: true, message: studentsData })
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Error in getting user data" });
    }

}

const formatData = (data) => {
    const formattedData = {
        profileData: {
            name: data.profileData?.matchedUser?.profile?.realName,
            username: data.profileData?.matchedUser?.username,
            githubUrl: data.profileData?.matchedUser?.githubUrl,
            linkedinUrl: data.profileData?.matchedUser?.linkedinUrl,
            twitterUrl: data.profileData?.matchedUser?.twitterUrl,
            userAvatar: data.profileData?.matchedUser?.profile?.userAvatar,
            birthday: data.profileData?.matchedUser?.profile?.birthday,
            website: data.profileData?.matchedUser?.profile?.website,
            country: data.profileData?.matchedUser?.profile?.countryName,
        },
        rankRatings: {
            ranking: data.profileData?.matchedUser?.profile?.ranking,
            starRating: data.profileData?.matchedUser?.profile?.starRating,
            badges: data.profileData?.matchedUser?.badges,
            reputation: data.profileData?.matchedUser?.profile?.reputation,
        },
        questions: {
            all: {
                total: data.profileData?.allQuestionsCount[0].count,
                solved: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[0].count,
                submissions: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[0].submissions,
            },
            easy: {
                total: data.profileData?.allQuestionsCount[1].count,
                solved: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[1].count,
                submissions: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[1].submissions,
            },
            medium: {
                total: data.profileData?.allQuestionsCount[2].count,
                solved: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[2].count,
                submissions: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[2].submissions,
            },
            hard: {
                total: data.profileData?.allQuestionsCount[3].count,
                solved: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[3].count,
                submissions: data.profileData?.matchedUser?.submitStats?.acSubmissionNum[3].submissions,
            },
        },
        submissionCalendar: data.profileData?.matchedUser?.submissionCalendar,
        recentSubmissions: data.profileData?.recentSubmissionList
    }
    return formattedData
}