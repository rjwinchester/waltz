import _ from "lodash";
import {sameRef} from "../../../../common/entity-utils";


export const FilterKinds = {
    DIRECTION: "DIRECTION",
    DATA_TYPE: "DATA_TYPE",
    ASSESSMENT: "ASSESSMENT",
    PHYSICAL_FLOW_ATTRIBUTE: "PHYSICAL_FLOW_ATTRIBUTE"
}

export const Directions = {
    INBOUND: "INBOUND",
    OUTBOUND: "OUTBOUND",
    ALL: "ALL"
}

function determineDirection(flow, parentEntityRef) {
    if (sameRef(flow.target, parentEntityRef)) {
        return Directions.INBOUND;
    } else {
        return Directions.OUTBOUND;
    }
}

export function mkFlowDetails(flowView, parentEntityRef) {

    const ratingsByFlowId = _.groupBy(flowView.flowRatings, d => d.entityReference.id);
    const ratingSchemeItemsById = _.keyBy(flowView.ratingSchemeItems, d => d.id);
    const decoratorsByFlowId = _.groupBy(flowView.dataTypeDecorators, d => d.dataFlowId);
    const specsById = _.keyBy(flowView.physicalSpecifications, d => d.id);
    const logicalFlowsById = _.keyBy(flowView.flows, d => d.id);
    const physicalFlowsByLogicalFlowId = _.groupBy(flowView.physicalFlows, d => d.logicalFlowId);

    return _
        .chain(flowView.flows)
        .flatMap(d => {
            const physicalFlows = _.get(physicalFlowsByLogicalFlowId, d.id, []);
            return _.isEmpty(physicalFlows)
                ? [{logicalFlow: d, physicalFlow: null}]
                : _.map(physicalFlows, p => ({logicalFlow: d, physicalFlow: p}))
        })
        .map(t => {

            const logicalFlow = t.logicalFlow;
            const physicalFlow = t.physicalFlow;

            const assessmentRatingsForLogicalFlow = _.get(ratingsByFlowId, logicalFlow.id, []);
            const dataTypesForLogicalFlow = _.get(decoratorsByFlowId, logicalFlow.id, []);
            const specification = _.get(specsById, physicalFlow?.specificationId);

            const assessmentRatings = _.map(
                assessmentRatingsForLogicalFlow,
                d => ({definitionId: d.assessmentDefinitionId, ratingId: d.ratingId}));

            const ratingsByDefId = _
                .chain(assessmentRatingsForLogicalFlow)
                .groupBy(r => r.assessmentDefinitionId)
                .mapValues(v => _
                    .chain(v)
                    .map(r => ratingSchemeItemsById[r.ratingId])
                    .filter(d => d != null)
                    .sortBy(r => r.position, r => r.name)
                    .value())
                .value();

            const direction = determineDirection(logicalFlow, parentEntityRef);

            return {
                logicalFlow,
                ratingsByDefId,
                dataTypesForLogicalFlow,
                physicalFlow,
                specification,
                assessmentRatings,
                direction
            };
        })
        .sortBy(d => d.logicalFlow.target.name, d => d.logicalFlow.source.name)
        .value();
}

export function mkAssessmentFilters(flowView) {

    const ratingSchemeItemsById = _.keyBy(flowView.ratingSchemeItems, d => d.id);

    const ratingsByDefinitionId = _
        .chain(flowView.flowRatings)
        .groupBy(r => r.assessmentDefinitionId)
        .mapValues(v => _
            .chain(v)
            .map(r => ratingSchemeItemsById[r.ratingId])
            .filter(d => d != null)
            .uniq()
            .sortBy(r => r.position, r => r.name)
            .value())
        .value();

    return _
        .chain(flowView.primaryAssessmentDefinitions)
        .map(d => Object.assign({}, {definition: d, ratings: _.get(ratingsByDefinitionId, d.id, [])}))
        .filter(d => !_.isEmpty(d.ratings))
        .value();
}

export function mkCriticalityFilterId() {
    return "PHYSICAL_FLOW_CRITICALITY";
}

export function mkFrequencyFilterId() {
    return "PHYSICAL_FLOW_FREQUENCY";
}

export function mkTransportKindFilterId() {
    return "PHYSICAL_FLOW_TRANSPORT_KIND";
}

export function mkDefinitionFilterId(definitionId) {
    return `ASSESSMENT_DEFINITION_${definitionId}`;
}

export function mkDataTypeFilterId() {
    return "DATA_TYPE";
}

export function mkDirectionFilterId() {
    return "FLOW_DIRECTION";
}

export function mkAssessmentFilter(id, ratings) {
    return {
        id,
        kind: FilterKinds.ASSESSMENT,
        ratings,
        test: (r) => _.isEmpty(ratings)
            ? x => true
            : _.some(ratings, x => _.some(r.assessmentRatings, d => _.isEqual(x, d)))
    };
}

export function mkCriticalityFilter(id, criticalities) {
    return {
        id,
        kind: FilterKinds.PHYSICAL_FLOW_ATTRIBUTE,
        criticalities,
        test: (r) => _.isEmpty(criticalities)
            ? x => true
            : _.includes(criticalities, r.physicalFlow?.criticality)
    };
}

export function mkFrequencyFilter(id, frequencies) {
    return {
        id,
        kind: FilterKinds.PHYSICAL_FLOW_ATTRIBUTE,
        frequencies,
        test: (r) => _.isEmpty(frequencies)
            ? x => true
            : _.includes(frequencies, r.physicalFlow?.frequency)
    };
}

export function mkTransportKindFilter(id, transportKinds) {
    return {
        id,
        kind: FilterKinds.PHYSICAL_FLOW_ATTRIBUTE,
        transportKinds,
        test: (r) => _.isEmpty(transportKinds)
            ? x => true
            : _.includes(transportKinds, r.physicalFlow?.transport)
    };
}

export function mkDataTypeFilter(id, dataTypes) {
    return {
        id,
        kind: FilterKinds.DATA_TYPE,
        dataTypes,
        test: (r) => _.isEmpty(dataTypes)
            ? x => true
            : _.some(r.dataTypesForLogicalFlow, x => _.every(dataTypes, d => !_.isEqual(d, x.decoratorEntity.id)))
    };
}

export function mkDirectionFilter(id, direction) {
    return {
        id,
        kind: FilterKinds.DIRECTION,
        direction,
        test: (r) => direction === Directions.ALL
            ? true
            : _.isEqual(r.direction, direction)
    };
}


export function mkLogicalFromFlowDetails(d) {
    return _.pick(d, ["logicalFlow", "ratingsByDefId", "dataTypesForLogicalFlow", "assessmentRatings", "direction", "visible"]);
}
