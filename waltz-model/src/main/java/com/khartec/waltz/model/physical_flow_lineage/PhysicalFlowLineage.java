package com.khartec.waltz.model.physical_flow_lineage;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.khartec.waltz.model.DescriptionProvider;
import com.khartec.waltz.model.application.Application;
import com.khartec.waltz.model.physical_flow.PhysicalFlow;
import com.khartec.waltz.model.physical_specification.PhysicalSpecification;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutablePhysicalFlowLineage.class)
@JsonDeserialize(as = ImmutablePhysicalFlowLineage.class)
public abstract class PhysicalFlowLineage implements DescriptionProvider {

    public abstract Application sourceApplication();
    public abstract Application targetApplication();
    public abstract PhysicalFlow flow();
    public abstract PhysicalSpecification specification();

}
