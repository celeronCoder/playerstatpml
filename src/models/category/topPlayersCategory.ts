import { removeDuplicate } from "../../utils";

let topPlayersCategory: Array<string> = [
    "goals",
    "goal_assist",
    "total_pass",
    "clean_sheet",
    "appearances",
    "mins_played",
    "yellow_card",
    "red_card",
    "touches",
    "total_scoring_att",
    "hit_woodwork",
    "big_chance_missed",
    "total_offside",
    "total_tackle",
    "dispossessed",
    "own_goals",
    "clearance_off_line",
    "saves",
    "penalty_save",
    "total_high_claim",
    "punches",
    "outfielder_block",
    "interception",
    "last_man_tackle",
    "total_clearance",
    "head_clearance",
    "aerial_won",
    "penalty_conceded",
    "error_lead_to_goal",
    "fouls",
    "aerial_lost",
    "goals_conceded",
    "total_keeper_sweeper",
    "keeper_throws",
    "goal_kicks",
];

topPlayersCategory = removeDuplicate(topPlayersCategory);

export default topPlayersCategory;
