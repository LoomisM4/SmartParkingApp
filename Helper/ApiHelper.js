import React from 'react';
import {getRoute} from "../Settings/Application";
import UserHelper from "./UserHelper";

export default class ApiHelper {
    doLogin(email, password) {
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

    doUpdate() {
        return fetch(getRoute("resolve/" + ChangeData.details.email), {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: {
                username: ChangeData.details.email,
                password: ChangeData.details.password,
                address: {
                    street: ChangeData.details.street,
                    houseNumber: ChangeData.details.nr,
                    postalCode: ChangeData.details.zip,
                    country: ChangeData.details.city
                }
            }
        })
    }

    doValidate() {
        return fetch(getRoute("validate"), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token
            }
        })
    }

    doDelete() {
        return fetch(getRoute("USERNAME"), {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + UserHelper.token
            }
        });
    }
}