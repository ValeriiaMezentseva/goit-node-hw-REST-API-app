const getCurrent = async (req, res) => {
    const { email, subscription, avatarURL, name } = req.user;
    res.json({
        status: "success",
        code: 200,
        user: {
            email,
            subscription,
            avatarURL,
            name,
        },
    });

}; 

module.exports = getCurrent; 