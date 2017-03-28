import { Option } from './option';

export class Poll {
    constructor(public title: string
        , public description: string
        , public start: Date
        , public finish: Date
        , public choices: Option[]) {

    }
}