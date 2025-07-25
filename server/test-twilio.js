import twilio from 'twilio';
const client = twilio("AC8ef66528297b3d960fc8b6d5c384fa48", "908bf4317aded3fdbf01825d700e921a");

client.verify.services("VA2f1a78304904cf08ffea02be947613c8")
  .verifications.create({ to: "cybersharma073@gmail.com", channel: "mail" })
  .then(result => console.log(result))
  .catch(err => console.error(err));