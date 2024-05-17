import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const client = new SSMClient();

// STRIPE API KEY
const storeKeyInfo = { Name: "BLOOD_STORE_KEY", WithDecryption: true };
const storeKeyReq = new GetParameterCommand(storeKeyInfo);
const storeKeyResponse = await client.send(storeKeyReq);
export const storeKey = storeKeyResponse.Parameter.Value;

// MAILSENDER API KEY
const mailKeyInfo = { Name: "BLOOD_MAIL_KEY", WithDecryption: true };
const mailKeyReq = new GetParameterCommand(mailKeyInfo);
const mailKeyResponse = await client.send(mailKeyReq);
export const mailKey = mailKeyResponse.Parameter.Value;
