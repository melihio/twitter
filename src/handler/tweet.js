var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as tweet from "../db/v1/tweet.js";
import utils from "../utils/utils.js";
export function Get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        if (utils.isNullOrEmpty(session)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        tweet.Get(session)
            .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCOde = 400;
            res.send(new utils.Response(null, err));
        });
    });
}
export function Delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        const tweetId = req.query.tweet_id;
        if (utils.isNullOrEmpty(session, tweetId)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        tweet.Delete(session, tweetId)
            .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        });
    });
}