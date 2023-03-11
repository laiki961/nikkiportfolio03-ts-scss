export const config = {
  // OpenWeatherApiKey: "91a74aded71384131bb26971504878b8",
  OpenWeatherApiKey: "fabab725cc99de9d9722fd84ecd61a87",
};

export const oktaConfig = {
  clientId: "0oa8oendi6wf67CQg5d7",
  issuer: "https://dev-76597770.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};

// export const devConfig = {
//   backend: { baseUrl: "localhost:8080" },
//   frontend: { baseUrl: "localhost:3000" },
// };
