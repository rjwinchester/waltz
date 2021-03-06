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

function store($http, baseUrl) {

    const BASE = `${baseUrl}/survey-question`;

    const create = (q) => {
        return $http.post(`${BASE}`, q)
            .then(result => result.data);
    };

    const update = (q) => {
        return $http.put(`${BASE}`, q)
            .then(result => result.data);
    };

    const deleteQuestion = (id) => {
        return $http.delete(`${BASE}/${id}`)
            .then(result => result.data);
    };


    const findQuestionsForInstance = (id) => {
        return $http.get(`${BASE}/questions/instance/${id}`)
            .then(result => result.data);
    };

    const findDropdownEntriesForInstance = (id) => {
        return $http.get(`${BASE}/dropdown-entries/instance/${id}`)
            .then(result => result.data);
    };

    const findQuestionsForTemplate = (id) => {
        return $http.get(`${BASE}/questions/template/${id}`)
            .then(result => result.data);
    };

    const findDropdownEntriesForTemplate = (id) => {
        return $http.get(`${BASE}/dropdown-entries/template/${id}`)
            .then(result => result.data);
    };

    return {
        create,
        update,
        deleteQuestion,
        findDropdownEntriesForInstance,
        findQuestionsForInstance,
        findDropdownEntriesForTemplate,
        findQuestionsForTemplate
    };
}


store.$inject = [
    "$http",
    "BaseApiUrl"
];


const serviceName = "SurveyQuestionStore";


export const SurveyQuestionStore_API = {
    create: {
        serviceName,
        serviceFnName: "create",
        description: "create a question"
    },
    update: {
        serviceName,
        serviceFnName: "update",
        description: "updates a question"
    },
    deleteQuestion: {
        serviceName,
        serviceFnName: "deleteQuestion",
        description: "delete a question"
    },
    findQuestionsForInstance: {
        serviceName,
        serviceFnName: "findQuestionsForInstance",
        description: "findQuestionsForInstance"
    },
    findDropdownEntriesForInstance: {
        serviceName,
        serviceFnName: "findDropdownEntriesForInstance",
        description: "findDropdownEntriesForInstance"
    },
    findQuestionsForTemplate: {
        serviceName,
        serviceFnName: "findQuestionsForTemplate",
        description: "findQuestionsForTemplate"
    },
    findDropdownEntriesForTemplate: {
        serviceName,
        serviceFnName: "findDropdownEntriesForTemplate",
        description: "findDropdownEntriesForTemplate"
    }
};

export default {
    store,
    serviceName
};
