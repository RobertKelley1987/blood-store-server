"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const client_ses_1 = require("@aws-sdk/client-ses");
const ses = new client_ses_1.SESClient({ region: "us-east-1" });
function sendEmail(subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
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
        return yield ses.send(new client_ses_1.SendEmailCommand(params));
    });
}
