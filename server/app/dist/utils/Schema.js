"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = require("yup");
class Schema {
}
exports.Schema = Schema;
Schema.authenticate = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
}).noUnknown();
