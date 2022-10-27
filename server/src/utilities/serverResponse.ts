import {MomentsResponse} from '../interfaces/MomentsResponse';

export default class ServerResponse {
    private data?: object;
    private msg!: string;

    constructor(msg: string, data?: object) {
        this.msg = msg;
        this.data = data;
    }

    getResponse(): MomentsResponse {
        return this.data ? {data: this.data, msg: this.msg} : {msg: this.msg};
    }

    setMsg(msg: string): MomentsResponse {
        this.msg = msg;
        return this.getResponse();
    }

    setData(data: object): MomentsResponse {
        this.data = data;
        return this.getResponse();
    }
}
