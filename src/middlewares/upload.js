import multer from "multer";

const storage = multer.memoryStorage();

const ALLOWED_TYPES = ["image/jpeg", "image/webp"];

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
        return cb(
            new Error("Only JPEG (.jpg) and WEBP images are allowed"),
            false
        );
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits: {
        fileSize: 500 * 1024 
    },
    fileFilter
});

export default upload;