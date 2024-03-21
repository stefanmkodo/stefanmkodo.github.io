
export interface Draws {
    draws: Draw[]
}

export interface Draw {
    drawID: String
    drawTime: Date
    gameName: string
    winningNumbers: number[]
    winAmounts: number[]
}