import { v4 } from 'uuid';

import utils from "../../utils/utils.js";
import * as user from "../../db/user.js";
import { GetUserByUsernameAndMail, InsertAccount, InsertSession } from '../../db/user.js';

export async function Login(username: string, password: string) {
    return new Promise(function (resolve, reject) {
        user.GetAccount(username, password)
            .then((resp: any) => {
                const user = resp;
                const session = {
                    account_id: user.id,
                    expires_at: utils.createExpireDate(),
                    token: v4(),
                };
                InsertSession(session)
                    .then((resp: any) => {
                        user.session = session.token;
                        resolve(new utils.Response(user, "Success"));
                    }).catch((err: any) => reject(new utils.Response(err, "Failed")))
    })
        .catch((err) => reject(new utils.Response(err, "Failed")));
})
};

export async function Register(user: any) {
    return new Promise(async function (resolve, reject) {
        user.password = await utils.encryptPassword(user.password);
        const account = {
            username: user.username,
            mail: user.mail,
            password: user.password,
            phone: user.phone,
            mail_approved: 0,
            phone_approved: 0,
        };
        GetUserByUsernameAndMail(user.username, user.phone, user.mail,)
            .then((resp: any) => {
                InsertAccount(account)
                    .then((value: any) => {
                        const session = {
                            account_id: user.id,
                            expires_at: utils.createExpireDate(),
                            token: v4(),
                        };
                        delete account.password;
                        user.session = session.token
                        reject(new utils.Response(account, "Succesfully Registered"));
                    })
                    .catch((err: any) => {
                        reject(new utils.Response(err, "Failed"));
                    });
            })
            .catch((err: any) => {
                reject(new utils.Response(err, "Failed"));
            });
    })
}