export const postValidator = (req, res, next) => {
    // check req.body for validation errors
    // body.name?.length ?; body.message?.length ?; etc. etc.
    const errors = [];

    

    // if errors ?
    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    // else: always next!
    next();
};
