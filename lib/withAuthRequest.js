export const API_BASE_URL =
  'https://7syvuumsg3.execute-api.eu-central-1.amazonaws.com';

const AUTH_SERVICE_TOKEN =
  'NmtwOTBvYzduazh1dGh1bzIzdWJqcDFrMm86ZDRxZWloa3F0cnFxNnZiZ3RtOGhmOW9vZWU1OG5lZmozOGJkZWNrcTA2Z2xlZzYyaDQ2';

export const withAuthRequest = async (fetchCall) => {
  const authResults = await fetch(
    'https://pr411-numa-core.auth.eu-central-1.amazoncognito.com/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${AUTH_SERVICE_TOKEN}`,
      },
      body: 'grant_type=client_credentials',
    },
  );

  if (authResults.status !== 200) {
    throw new Error('API /oauth1/token: endpoint failed');
  }

  const { access_token: accessToken } = await authResults.json();

  if (!accessToken) {
    throw new Error('API /oauth1/token: missing access token value');
  }

  const apiAuthRequest = async (url, params) => {
    const results = await fetch(`${API_BASE_URL}${url}`, {
      ...params,
      headers: { ...params.headers, Authorization: `Bearer ${accessToken}` },
    });

    return { results, accessToken };
  };

  return fetchCall(apiAuthRequest);
};
