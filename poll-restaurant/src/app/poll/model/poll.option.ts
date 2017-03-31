export class PollOption {
    constructor( public id: string
        , public description: string
        , public detail: Object
        , public mailVote: string[]) {

    }
}