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
import MeasurableCategoriesAdminView from "./svelte/measurable-categories/MeasurableCategoriesAdminView.svelte";
import {initialiseData} from "../common";


const initialState = {
    MeasurableCategoriesAdminView
};


function controller() {

    const vm = initialiseData(this, initialState);
}


controller.$inject = [];


export default {
    template: `<waltz-svelte-component component="$ctrl.MeasurableCategoriesAdminView"></waltz-svelte-component>`,
    controller,
    controllerAs: "$ctrl",
    bindToController: true,
};