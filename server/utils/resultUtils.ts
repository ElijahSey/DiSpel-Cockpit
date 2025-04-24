import {Result} from "~/server/models/result.model";

export async function getOrCreateResults(simulationID: string) {
    let result = await Result.findOne({simulationID: simulationID});
    if (!result) {
        result = await Result.create({
            simulationID: simulationID,
            simulationUpdateRequired: true,
            searchUpdateRequired: true,
        });
    }
    return result
}

export function updateResilienceScore(result: any) {

    let searchScore = 0;
    let simulationScore = 0;
    if (result.searchResultsTotal !== undefined && result.searchResultsTotal !== null && result.searchResultsTotal > 0 && result.searchResultsScenarioSuccessesTotal != undefined) {
        searchScore = result.searchResultsScenarioSuccessesTotal / result.searchResultsTotal
    }
    if (result.simulationResultsTotal !== undefined && result.simulationResultsTotal !== null && result.simulationResultsTotal > 0 && result.simulationResultsScenarioSuccessesTotal != undefined) {
        simulationScore = result.simulationResultsScenarioSuccessesTotal / result.simulationResultsTotal
    }

    result.resilienceScore = Math.floor(50 * (searchScore + simulationScore))
}

