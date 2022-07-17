const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'siuctesterp@gmail.com',
		pass: 'papjmbqkqzucbesd',
	},
});

const sendEmail = async (message) => {

  message.from = 'My Survey form <iuctesterp@gmail.com>';

  let info = await transporter.sendMail(message);

  console.log(`Mail SENT: ${JSON.stringify(info)}`);

  return;
};

module.exports = { sendEmail };