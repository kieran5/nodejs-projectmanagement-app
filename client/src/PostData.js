// Promise function for Google login
export function PostData(type, userData) {
  //let BaseURL = 'http://api.mailxengine.com/rest/';
  let BaseURL = 'https://apipaypal.9lessons.info/apipaypal/';

  return new Promise((resolve, reject) => {
    fetch(BaseURL+type, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    })
  });
}
