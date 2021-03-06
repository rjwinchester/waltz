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

import {remote} from "./remote";

export function mkFlowDiagramStore() {

    const getById = (id, force = false) => {
        return remote
            .fetchViewData("GET", `api/flow-diagram/id/${id}`, null, {}, {force: force});
    };

    const updateName = (id, cmd) => remote
        .execute("POST", `api/flow-diagram/update-name/${id}`, cmd)
        .then(r => getById(id));

    const updateDescription = (id, cmd) => remote
        .execute("POST",`api/flow-diagram/update-description/${id}`, cmd)
        .then(r => getById(id));

    const save = (saveCmd) => remote.execute("POST", "api/flow-diagram", saveCmd);

    const clone = (diagramId, newName) => {
        return remote
            .execute("POST", `api/flow-diagram/id/${diagramId}/clone`, newName)
            .then(r => getById(r.data, true));
    }

    const deleteForId = (id) => remote
        .execute("DELETE", `api/flow-diagram/id/${id}`);
        // .then(r => r.data);


    return {
        getById,
        updateName,
        updateDescription,
        save,
        clone,
        deleteForId
    };
}

export const flowDiagramStore = mkFlowDiagramStore();
