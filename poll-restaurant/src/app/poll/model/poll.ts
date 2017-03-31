import { PollOption } from './poll.option';

export class Poll {
    constructor(public id: string
        , public title: string
        , public description: string
        , public start: Date
        , public finish: Date
        , public options: PollOption[]) {

    }
}