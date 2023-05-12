// Npm requires ↓

const sgEmail = require("@sendgrid/mail");
const chalk = require("chalk");

// Function ↓

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, body) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
      html: `
          <section>
              <h1>${subject}</h1>
              <p>${body}</p>
          </section>
          `,
    };
    await sgEmail.send(msg);
  } catch (error) {
    console.error(chalk.red("No se ha podido enviar el email"), error);
  }
};

module.exports = { sendMail };
