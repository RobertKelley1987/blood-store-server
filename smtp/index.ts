import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });

export async function sendEmail(subject: string, html: string) {
  const params = {
    Destination: {
      ToAddresses: ["robertkelley1987@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "robertkelley1987@gmail.com",
  };

  return await ses.send(new SendEmailCommand(params));
}
