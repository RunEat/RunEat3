module.exports.generateActivationTemplate = (token) => {
  return `
  <a
  href="${process.env.HOST || `http://localhost:${process.env.PORT || 3001}`}/user/activate/${token}" style="display:inline-block;background:#ffffff;color:#276678;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:5px 25px;mso-padding-alt:0px;border-radius:10px;"
  >
  ACTIVAR MI CUENTA
  </a>
    `
}

module.exports.generatePasswordRecoveryTemplate = (token) => {
  return `
  <a
  href="${process.env.HOST || `http://localhost:${process.env.PORT || 3001}`}/user/password_reset/${token}" style="display:inline-block;background:#ffffff;color:#276678;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:5px 25px;mso-padding-alt:0px;border-radius:10px;"
  >
  RECUPERAR MI CONTRASEÑA
  </a>
    `
}