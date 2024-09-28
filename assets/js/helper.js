/**
 * @param {Number} minutes Cooking Time
 * @returnes {Object} {time , timeunite} time : time cooking , time unit : unite time
 **/
import { ACCESS_POINT, API_KEY, APP_ID, TYPE } from "./api";
export const getTime = function (minutes) {
  const /** {Number} */ hour = Math.floor(minutes / 60);
  const /** {Number} */ day = Math.floor(hour / 24);

  const /** {Number} */ time = day || hour || minutes;
  const /** {Number} */ uniteIndex = [day, hour, minutes].lastIndexOf(time);
  const /** {String} */ timeUnit = ["day", "hours", "minutes"][uniteIndex];

  return { time, timeUnit };
};

export const fetchDataJson = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const generateUrl = function (queries, ACCESS_POINT_API = ACCESS_POINT) {
  const query = queries
    ?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");

  const url = `${ACCESS_POINT_API}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${
    query ? `&${query}` : ""
  }`;

  return url;
};
