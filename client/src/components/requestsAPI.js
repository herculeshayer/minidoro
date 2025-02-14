import React, { useState, useEffect } from "react";

/**
 *
 * @param {String} URL
 * @param {Object: String, String} payload
 *
 * Object contains username & password
 *
 * Post user information to login API, authenticate user using JWT.verify
 */
const postLoginInformation = (URL, payload) => {
  const fetchUserData = async () => {
    await fetch(URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  fetchUserData();
};
/**
 *
 * @param {String} URL
 * @param {Object: String, String, String} payload
 *
 * POST user information to registration API
 *
 */
const postRegistrationInformation = (URL, payload) => {
  const fetchUserData = async () => {
    await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  fetchUserData();
};

/**
 *
 * @param {String} URL
 * @returns Object: String, String
 *
 * Gets userdata if cookie is present & authentic
 *
 * *** MIGHT BE ABLE TO CONSOLIDATE THIS INTO THE REDIRECT API ***
 * just a consideration, it seems redundant now upon initial view
 */

const getUserDashboardInformation = (URL) => {
  const [userData, setUserData] = useState([]);
  const getUserInfo = () => {
    fetch(URL, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  };
  useEffect(() => {
    getUserInfo();

    return () => getUserInfo();
  }, []);

  return userData;
};

/**
 *
 * @param {String} URL
 * @returns Boolean
 *
 * Checks to see if the cookie is valid, if valid returns true. If false, returns false
 * Purpose of it is to redirect between login & dashboard if user is authenticated or not
 */
const getRedirectUser = (URL) => {
  const [validCookie, setValidCookie] = useState(0);

  let controller = new AbortController();

  const getResponse = () => {
    fetch(URL, {
      method: "GET",
      signal: controller.signal,
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (res.status == 200) {
          console.log("Cookie Valid");
          setValidCookie(true);
        }
        if (res.status == 403) {
          console.log("Cookie Invalid");
          setValidCookie(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getResponse();

    return () => controller.abort();
  }, [validCookie]);

  return validCookie;
};

export {
  postLoginInformation,
  postRegistrationInformation,
  getUserDashboardInformation,
  getRedirectUser,
};
