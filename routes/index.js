const express = require("express");
const router = express.Router();
const userModel = require("./users");
const multer = require("multer");
const passport = require("passport");
const localStrategy = require("passport-local");
const Jimp = require("jimp");
var fileName;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/images/uploads");
	},
	filename: function (req, file, cb) {
		// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
	res.render("index");
});

router.post("/upload", upload.single("img"), function (req, res) {
	fileName = req.file.filename;
	// filewidth = req.file.bitmap.width;
	// fileheight = req.file.bitmap.height;
	// res.send(req.file);
	res.redirect("/compress");
});

router.get("/compress", function (req, res) {
	Jimp.read(`./public/images/uploads/${fileName}`, (err, file) => {
		if (err) throw err;
		file
			// .resize(file.bitmap.width * 0.5, filee.bitmap.height * 0.5) // resize
			.quality(50) // set JPEG quality
			.write(`./public/images/uploads/${fileName}`); // save
	});
	res.render("image", { fileName });
});

router.get("/download", function (req, res) {
	var fullPath = "C:/Users/HP/Desktop/github/image-compressor/public/images/uploads/" + fileName;
	res.download(fullPath, function (err) {
		if (err) console.log(err);
	});
});

module.exports = router;
