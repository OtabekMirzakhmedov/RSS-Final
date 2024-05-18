// interface TokenResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// }

// function App() {
//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   const getToken = async () => {
//     try {
//       const projectKey = 'rss-final-commerce';
//       const authUrl = 'https://auth.eu-central-1.aws.commercetools.com';
//       const clientId = 'id5Y0vecpHzZHS5Jhucp9s8r';
//       const clientSecret = '0eGOuGeH0IHgqUEU9BUEErfjb_wT-Lly';
//       const authString = `${clientId}:${clientSecret}`;
//       const encodedAuthString = btoa(authString);

//       const response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(
//         `${authUrl}/oauth/${projectKey}/customers/token`,
//         '',
//         {
//           params: {
//             grant_type: 'password',
//             username: 'johndoe@example.com',
//             password: 'secret123',
//           },
//           headers: {
//             Authorization: `Basic ${encodedAuthString}`,
//           },
//         }
//       );

//       console.log(response.data);
//       setAccessToken(response.data.access_token);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;
//         if (axiosError.response) {
//           const errorResponseData = axiosError.response.data;
//           console.error('Error:', errorResponseData);
//         }
//       } else {
//         console.error('Error:', error);
//         throw error;
//       }
//     }
//   };

//   return (
//     <div className='card'>
//       <button type='button' onClick={getToken}>
//         Get Access Token
//       </button>
//       {accessToken ? (
//         <p>Access Token: {accessToken}</p>
//       ) : (
//         <p>Click the button to get the access token</p>
//       )}
//     </div>
//   );
// }
