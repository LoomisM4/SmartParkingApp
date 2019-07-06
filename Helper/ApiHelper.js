import React from 'react';
import {getRoute} from "../Settings/Application";
import UserHelper from "./UserHelper";

export default class ApiHelper {
    static doLogin(email, password) {
        return fetch(getRoute("login"), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            })
        });
    }

    static doRegister(email, password, street, nr, zip, city) {
        return fetch(getRoute("signup"), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
                address: {
                    street: street,
                    houseNumber: nr,
                    postalCode: zip,
                    city: city,
                    country: "-"
                }
            }),
        })
    }

    static doUpdate(email, password, street, nr, zip, city) {
        return fetch(getRoute("user"), {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
                address: {
                    street: street,
                    houseNumber: nr,
                    postalCode: zip,
                    city: city,
                    country: "-"
                }
            })
        })
    }

    static doValidate() {
        return fetch(getRoute("validate"), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    static doDelete() {
        return fetch(getRoute("user"), {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
            }
        });
    }

    static getOverview() {
        return fetch(getRoute("overview"), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    static getHistory() {
        return fetch(getRoute("history"), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    static getUserInformation() {
        return fetch(getRoute("resolve"), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
}