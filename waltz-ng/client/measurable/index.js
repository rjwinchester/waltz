/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016, 2017, 2018, 2019 Waltz open source project
 * See README.md for more information
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific
 *
 */

import angular from "angular";
import MeasurableStore from "./services/measurable-store";
import MeasurableChangeControl from "./components/change-control/measurable-change-control";
import MeasurableInfo from "./components/info/measurable-info";
import MeasurableTree from "./components/tree/measurable-tree";
import MeasurableOverview from "./components/overview/measurable-overview";
import DirectMeasurables from "./components/org-unit-direct-measurable-section/org-unit-direct-measurable-section";
import MeasurableOrgUnitRelationshipTree
    from "./components/org-unit-relationship-tree/measurable-org-unit-relationship-tree";
import Routes from "./routes";
import {registerComponents, registerStores} from "../common/module-utils";


export default () => {
    const module = angular.module("waltz.measurable", []);

    registerStores(module, [
        MeasurableStore ]);

    registerComponents(module, [
        DirectMeasurables,
        MeasurableChangeControl,
        MeasurableInfo,
        MeasurableTree,
        MeasurableOverview,
        MeasurableOrgUnitRelationshipTree]);

    module
        .config(Routes);

    return module.name;
};
