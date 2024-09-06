let host = ''
// host = 'http://localhost:38505'

const getSettings = async () => {
    return fetch(`${host}/api/settings`)
        .then(res => res.json())
}

const updateThemeIndex = async (data) => {
    return fetch(`${host}/api/theme-index`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const updateLanguageIndex = async (data) => {
    return fetch(`${host}/api/language-index`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const updateDisplayTime = async (data) => {
    return fetch(`${host}/api/general/display-time`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const updateTimeFormatIndex = async (data) => {
    return fetch(`${host}/api/general/time-format-index`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const getRepos = async () => {
    return fetch(`${host}/api/repos`)
        .then(res => res.json())
}

const updateRepo = async (data) => {
    return fetch(`${host}/api/repo`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const updateRepoIndex = async (data) => {
    return fetch(`${host}/api/repo-index`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const deleteRepo = async (data) => {
    return fetch(`${host}/api/repo`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

const search = async (data) => {
    return fetch(`${host}/api/search`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

export {
    getSettings,
    updateThemeIndex,
    updateLanguageIndex,
    updateDisplayTime,
    updateTimeFormatIndex,
    getRepos,
    updateRepo,
    updateRepoIndex,
    deleteRepo,
    search,
}