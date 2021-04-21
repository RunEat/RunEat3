const nodemailer = require('nodemailer');
const { generateActivationTemplate } = require('./mailtemplate.js');
const { generatePasswordRecoveryTemplate } = require('./mailtemplate.js');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASSWORD
    }
});

module.exports.sendActivationEmail = (email, token) => {
    transporter.sendMail({
        from: `RunEat <${process.env.NM_USER}>`,
        to: email,
        subject: '¡Gracias por unirte a RunEat!',
        html: generateActivationTemplate(token)
    });
}

module.exports.sendPasswordRecoveryEmail = (email, token) => {
    transporter.sendMail({
        from: `RunEat <${process.env.NM_USER}>`,
        to: email,
        subject: 'Recupera tu contraseña',
        html: generatePasswordRecoveryTemplate(token)
    });
}

// module.exports.sendDeleteAccountEmail = (email, token) => {
//     transporter.sendMail({
//         from: `HireHack <${process.env.NM_USER}>`,
//         to: email,
//         subject: 'Confirma tu baja en HireHack',
//         html: generateDeleteCandidateTemplate(token)
//     });
// }

