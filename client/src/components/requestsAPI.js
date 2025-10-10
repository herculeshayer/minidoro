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
const postLoginInformation = async (URL, payload) => {
  const fetchUserData = async () => {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  };

  return await fetchUserData();
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
  useEffect(() => {
    const controller = new AbortController();
    const getUserInfo = () => {
      fetch(URL, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserInfo();

    return () => controller.abort();
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
  const [validCookie, setValidCookie] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getResponse = async () => {
      try {
        const res = await fetch(URL, {
          method: "GET",
          signal: controller.signal,
          credentials: "include",
          mode: "cors",
        });

        if (res.status === 200) {
          console.log("Cookie Valid");
          setValidCookie(true);
        } else if (res.status === 403) {
          console.log("Cookie Invalid");
          setValidCookie(false);
        } else {
          console.warn("Unexpected status when validating cookie:", res.status);
          setValidCookie(false);
        }
      } catch (err) {
        console.log(err);
        setValidCookie(false);
      }
    };

    getResponse();

    return () => controller.abort();
  }, [URL]);

  return validCookie;
};

export {
  postLoginInformation,
  postRegistrationInformation,
  getUserDashboardInformation,
  getRedirectUser,
};
