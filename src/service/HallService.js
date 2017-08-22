/**
 * Created by Yanto on 17/08/2017.
 */

const BASE_PATH = "backend/";

export function getHallenFromBackend()
{
    return fetch(BASE_PATH + 'hallen.json')
        .then((res) => {return res.json()})
        .then((resJson) => {return resJson.hallen});
}

export function getHallFromBackend(id)
{
    return fetch(BASE_PATH + 'hal' + id + '.json')
        .then((res) => {return res.json()});
}