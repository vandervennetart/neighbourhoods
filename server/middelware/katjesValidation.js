export const katjesValidator = (req, res, next) => {
    // check req.body for validation errors
    // body.name?.length ?; body.message?.length ?; etc. etc.
    const errors = [];
    
    if(!req.body.name?.length){
        errors.push({
            name: "name",
            message: "name is een verplicht veld en werd niet ingevuld"
        })
    }

    if (!req.body.location?.length) {
        errors.push({
            name: "location",
            message: "location is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!req.body.sex?.length) {
        errors.push({
            name: "sex",
            message: "sex is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!req.body.age?.length) {
        errors.push({
            name: "age",
            message: "age is een verplicht veld en werd niet ingevuld",
        });
    }

    if (isNaN(req.body.age)) {
        errors.push({
            name: "age",
            message:"age moet een nummer zijn en er werd geen nummer meegegeven",
        });
    }

    const imageExtensionsPattern = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    
    if (!imageExtensionsPattern.test(req.body.img_url)) {
        errors.push({
            name: "img_url",
            message: "URL van de afbeelding moet een geldige afbeelding zijn",
        });
    }

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
