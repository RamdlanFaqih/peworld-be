module.exports = {
    isAdmin: (req, res, next) => {
        if (req.APP_DATA.tokenDecode.level === 0) {
            next();
        }
        else {
            res.json({
                message: "Halaman ini diakses oleh recruiter",
            });
        }
    },

    isCustomer: (req, res, next) => {
        if(req.APP_DATA.tokenDecode === 1) {
            next();
        }
        else{
            res.json({
                message: "Halaman ini diakses oleh worker",
            });
        }
    }
};