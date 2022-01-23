const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/imgcompress");

const userSchema = mongoose.Schema({
	img: {
		type: String,
	},
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
