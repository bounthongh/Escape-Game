import * as Yup from "yup";

export class Schema {

    public static readonly authenticate = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
    }).noUnknown();

}
